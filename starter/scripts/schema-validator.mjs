// scripts/schema-validator.mjs
// Lightweight, dependency-free Draft-07 schema and YAML validation engine.

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

export function validateManifest(data) {
  const errors = [];
  const required = [
    "spec_version",
    "installed_spec_version",
    "owner",
    "profile",
    "source_memory",
    "operator_version",
    "schema_version",
    "required_artifacts"
  ];

  for (const req of required) {
    if (data[req] === undefined || data[req] === null || data[req] === "") {
      errors.push(`Missing required field: ${req}`);
    }
  }

  const semverRegex = /^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?$/;
  if (data.spec_version && !semverRegex.test(data.spec_version)) {
    errors.push(`Invalid spec_version "${data.spec_version}". Must match semver pattern ^[0-9]+\.[0-9]+\.[0-9]+$`);
  }
  if (data.installed_spec_version && !semverRegex.test(data.installed_spec_version)) {
    errors.push(`Invalid installed_spec_version "${data.installed_spec_version}". Must match semver pattern ^[0-9]+\.[0-9]+\.[0-9]+$`);
  }

  const validProfiles = ["public-framework", "ai-office", "custom"];
  if (data.profile && !validProfiles.includes(data.profile)) {
    errors.push(`Invalid profile "${data.profile}". Must be one of: ${validProfiles.join(", ")}`);
  }

  if (data.required_artifacts !== undefined) {
    if (!Array.isArray(data.required_artifacts) || data.required_artifacts.length === 0) {
      errors.push("required_artifacts must be a non-empty array of file paths.");
    }
  }

  return { valid: errors.length === 0, errors };
}

export function validateIcmContract(data) {
  const errors = [];
  const required = [
    "task_id",
    "title",
    "job_to_be_done",
    "business_reason",
    "owner",
    "executor",
    "allowed_inputs",
    "expected_outputs"
  ];

  for (const req of required) {
    if (data[req] === undefined || data[req] === null || data[req] === "") {
      errors.push(`Missing required field: ${req}`);
    }
  }

  const taskIdRegex = /^[A-Z0-9]+-[0-9]+$/;
  if (data.task_id && !taskIdRegex.test(data.task_id)) {
    errors.push(`Invalid task_id "${data.task_id}". Must match pattern ^[A-Z0-9]+-[0-9]+$`);
  }

  if (data.title && typeof data.title === "string" && data.title.length < 5) {
    errors.push("title must have at least 5 characters.");
  }
  if (data.job_to_be_done && typeof data.job_to_be_done === "string" && data.job_to_be_done.length < 10) {
    errors.push("job_to_be_done must have at least 10 characters.");
  }
  if (data.business_reason && typeof data.business_reason === "string" && data.business_reason.length < 10) {
    errors.push("business_reason must have at least 10 characters.");
  }

  if (data.allowed_inputs && (!Array.isArray(data.allowed_inputs) || data.allowed_inputs.length < 1)) {
    errors.push("allowed_inputs must be an array with at least 1 item.");
  }
  if (data.expected_outputs && (!Array.isArray(data.expected_outputs) || data.expected_outputs.length < 1)) {
    errors.push("expected_outputs must be an array with at least 1 item.");
  }

  return { valid: errors.length === 0, errors };
}

export function validateIcmReceipt(data) {
  const errors = [];
  const required = [
    "task_id",
    "owner",
    "executor",
    "date",
    "commit_sha",
    "status",
    "modifications",
    "verification_gates"
  ];

  for (const req of required) {
    if (data[req] === undefined || data[req] === null || data[req] === "") {
      errors.push(`Missing required field: ${req}`);
    }
  }

  const commitRegex = /^[0-9a-f]{7,40}$/i;
  if (data.commit_sha && !commitRegex.test(data.commit_sha)) {
    errors.push(`Invalid commit_sha "${data.commit_sha}". Must match pattern ^[0-9a-f]{7,40}$`);
  }

  const validStatuses = ["DRAFT", "VERIFIED", "OWNER_APPROVED", "PROMOTED", "HELD"];
  if (data.status && !validStatuses.includes(data.status)) {
    errors.push(`Invalid status "${data.status}". Must be one of: ${validStatuses.join(", ")}`);
  }

  if (data.modifications) {
    if (!Array.isArray(data.modifications)) {
      errors.push("modifications must be an array.");
    } else {
      data.modifications.forEach((mod, idx) => {
        if (!mod.file || !mod.action || !mod.summary) {
          errors.push(`modifications[${idx}] missing required property (file, action, or summary).`);
        }
        const validActions = ["created", "modified", "deleted"];
        if (mod.action && !validActions.includes(mod.action)) {
          errors.push(`modifications[${idx}].action "${mod.action}" invalid. Must be created, modified, or deleted.`);
        }
      });
    }
  }

  if (data.verification_gates) {
    const requiredGates = ["classification_guard", "copy_rails", "link_integrity"];
    const validGateValues = ["PASSED", "FAILED", "SKIPPED"];
    for (const g of requiredGates) {
      if (!data.verification_gates[g]) {
        errors.push(`verification_gates missing "${g}".`);
      } else if (!validGateValues.includes(data.verification_gates[g])) {
        errors.push(`verification_gates.${g} invalid value "${data.verification_gates[g]}". Must be PASSED, FAILED, or SKIPPED.`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
