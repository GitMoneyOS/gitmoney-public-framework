// scripts/schema-validator.mjs
// Schema-driven Draft-07 validation engine for GitMoney OS.
// SCHEMA = CANON; VALIDATOR = EXECUTOR.

import { readFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Lightweight, zero-dependency YAML parser for GitMoney manifests.
 */
export function parseSimpleYaml(yamlText) {
  const result = {};
  const lines = yamlText.split("\n");
  let currentKey = null;
  let inList = false;

  for (let rawLine of lines) {
    const line = rawLine.replace(/#.*$/, "").trimEnd();
    if (!line.trim()) continue;

    const listMatch = line.match(/^(\s*)-\s+(.+)$/);
    if (listMatch && currentKey) {
      let val = listMatch[2].trim();
      if ((val.startsWith("\"") && val.endsWith("\"")) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!Array.isArray(result[currentKey])) {
        result[currentKey] = [];
      }
      result[currentKey].push(val);
      continue;
    }

    const kvMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kvMatch) {
      currentKey = kvMatch[1].trim();
      let rawVal = kvMatch[2].trim();
      if (rawVal === "" || rawVal === "[]") {
        result[currentKey] = rawVal === "[]" ? [] : null;
        inList = true;
      } else {
        if ((rawVal.startsWith("\"") && rawVal.endsWith("\"")) || (rawVal.startsWith("'") && rawVal.endsWith("'"))) {
          rawVal = rawVal.slice(1, -1);
        }
        result[currentKey] = rawVal;
        inList = false;
      }
    }
  }
  return result;
}

/**
 * Core schema-driven evaluator interpreting Draft-07 keywords used across GitMoney schemas:
 * type, required, properties, enum, pattern, minLength, maxLength, minItems, maxItems, items, format, additionalProperties
 */
export function validateAgainstSchema(data, schema, pointer = "") {
  const errors = [];
  if (!schema || typeof schema !== "object") return { valid: true, errors };

  // 1. Type check
  if (schema.type) {
    const actualType = Array.isArray(data)
      ? "array"
      : data === null
      ? "null"
      : typeof data;

    if (schema.type === "integer") {
      if (typeof data !== "number" || !Number.isInteger(data)) {
        errors.push(`${pointer || "root"}: expected integer, got ${actualType}`);
        return { valid: false, errors };
      }
    } else if (actualType !== schema.type) {
      errors.push(`${pointer || "root"}: expected ${schema.type}, got ${actualType}`);
      return { valid: false, errors };
    }
  }

  if (data === undefined || data === null) {
    return { valid: errors.length === 0, errors };
  }

  // 2. String constraints
  if (typeof data === "string") {
    if (schema.minLength !== undefined && data.length < schema.minLength) {
      errors.push(`${pointer || "root"}: string length ${data.length} is less than minLength ${schema.minLength}`);
    }
    if (schema.maxLength !== undefined && data.length > schema.maxLength) {
      errors.push(`${pointer || "root"}: string length ${data.length} exceeds maxLength ${schema.maxLength}`);
    }
    if (schema.pattern !== undefined) {
      const rx = new RegExp(schema.pattern);
      if (!rx.test(data)) {
        errors.push(`${pointer || "root"}: "${data}" does not match pattern ${schema.pattern}`);
      }
    }
    if (schema.format === "date") {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
        errors.push(`${pointer || "root"}: "${data}" is not a valid date format (YYYY-MM-DD)`);
      }
    }
  }

  // 3. Enum check
  if (schema.enum !== undefined) {
    if (!schema.enum.includes(data)) {
      errors.push(`${pointer || "root"}: value ${JSON.stringify(data)} not in enum: [${schema.enum.map(v => JSON.stringify(v)).join(", ")}]`);
    }
  }

  // 4. Array constraints
  if (Array.isArray(data)) {
    if (schema.minItems !== undefined && data.length < schema.minItems) {
      errors.push(`${pointer || "root"}: array contains ${data.length} item(s), expected at least ${schema.minItems}`);
    }
    if (schema.maxItems !== undefined && data.length > schema.maxItems) {
      errors.push(`${pointer || "root"}: array contains ${data.length} item(s), exceeds maxItems ${schema.maxItems}`);
    }
    if (schema.items) {
      data.forEach((item, idx) => {
        const itemRes = validateAgainstSchema(item, schema.items, `${pointer || "root"}[${idx}]`);
        if (!itemRes.valid) {
          errors.push(...itemRes.errors);
        }
      });
    }
  }

  // 5. Object constraints
  if (typeof data === "object" && !Array.isArray(data) && data !== null) {
    if (schema.required && Array.isArray(schema.required)) {
      for (const req of schema.required) {
        if (data[req] === undefined || data[req] === null || data[req] === "") {
          errors.push(`${pointer ? pointer + "." : ""}${req}: missing required field`);
        }
      }
    }

    if (schema.additionalProperties === false && schema.properties) {
      const allowedKeys = new Set(Object.keys(schema.properties));
      for (const key of Object.keys(data)) {
        if (!allowedKeys.has(key)) {
          errors.push(`${pointer ? pointer + "." : ""}${key}: additional property not allowed`);
        }
      }
    }

    if (schema.properties) {
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        if (data[propName] !== undefined && data[propName] !== null) {
          const propRes = validateAgainstSchema(data[propName], propSchema, `${pointer ? pointer + "." : ""}${propName}`);
          if (!propRes.valid) {
            errors.push(...propRes.errors);
          }
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Helper to locate and load canonical JSON Schema files from candidate directory paths.
 */
export function loadSchema(schemaName, customDir = null) {
  const candidateDirs = [];
  if (customDir) {
    candidateDirs.push(customDir);
    candidateDirs.push(path.join(customDir, "schemas"));
  }
  candidateDirs.push(path.join(process.cwd(), "schemas"));
  candidateDirs.push(path.resolve(__dirname, "..", "schemas"));
  candidateDirs.push(path.resolve(__dirname, "schemas"));

  for (const dir of candidateDirs) {
    const fullPath = path.join(dir, schemaName);
    if (existsSync(fullPath)) {
      try {
        return JSON.parse(readFileSync(fullPath, "utf8"));
      } catch (err) {
        throw new Error(`Failed to parse schema file ${fullPath}: ${err.message}`);
      }
    }
  }
  throw new Error(`Schema file "${schemaName}" not found in candidate paths: ${candidateDirs.join(", ")}`);
}

export function validateManifest(data, searchDir = null) {
  const schema = loadSchema("gitmoney-manifest.schema.json", searchDir);
  return validateAgainstSchema(data, schema, "gitmoney.yaml");
}

export function validateIcmContract(data, searchDir = null) {
  const schema = loadSchema("icm-contract.schema.json", searchDir);
  return validateAgainstSchema(data, schema, "icm-contract");
}

export function validateIcmReceipt(data, searchDir = null) {
  const schema = loadSchema("icm-receipt.schema.json", searchDir);
  return validateAgainstSchema(data, schema, "icm-receipt");
}
