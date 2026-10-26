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
 * Core evaluator for the supported Draft-07 keyword subset used by GitMoney schemas.
 * Supported keywords include type, required, properties, enum, pattern, minLength,
 * maxLength, minItems, maxItems, items, format, minimum, maximum, and additionalProperties.
 * Local JSON Pointer $ref targets resolve against the original root schema; remote refs fail closed.
 */
function resolveLocalSchemaReference(reference, rootSchema) {
  if (typeof reference !== "string" || !reference.startsWith("#/")) {
    throw new Error(`Only local JSON Pointer references are supported: ${String(reference)}`);
  }

  return reference.slice(2).split("/").reduce((current, rawPart) => {
    const part = rawPart.replace(/~1/g, "/").replace(/~0/g, "~");
    if (!current || typeof current !== "object" || !Object.prototype.hasOwnProperty.call(current, part)) {
      throw new Error(`Unresolved schema reference: ${reference}`);
    }
    return current[part];
  }, rootSchema);
}

function isValidCalendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function validateAgainstSchema(data, schema, pointer = "", rootSchema = schema, refStack = []) {
  const errors = [];
  if (!schema || typeof schema !== "object") return { valid: true, errors };

  if (schema.$ref) {
    if (refStack.includes(schema.$ref)) {
      errors.push(`${pointer || "root"}: circular schema reference ${schema.$ref}`);
    } else {
      try {
        const referencedSchema = resolveLocalSchemaReference(schema.$ref, rootSchema);
        const referencedResult = validateAgainstSchema(data, referencedSchema, pointer, rootSchema, [...refStack, schema.$ref]);
        errors.push(...referencedResult.errors);
      } catch (error) {
        errors.push(`${pointer || "root"}: ${error.message}`);
      }
    }
  }

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
      if (!isValidCalendarDate(data)) {
        errors.push(`${pointer || "root"}: "${data}" is not a valid date format (YYYY-MM-DD)`);
      }
    }
    if (schema.format === "date-time" && (Number.isNaN(Date.parse(data)) || !/^\d{4}-\d{2}-\d{2}T/.test(data))) {
      errors.push(`${pointer || "root"}: "${data}" is not a valid ISO date-time`);
    }
  }

  // 2a. Numeric bounds
  if (typeof data === "number") {
    if (schema.minimum !== undefined && data < schema.minimum) {
      errors.push(`${pointer || "root"}: value ${data} is less than minimum ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && data > schema.maximum) {
      errors.push(`${pointer || "root"}: value ${data} exceeds maximum ${schema.maximum}`);
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
        const itemRes = validateAgainstSchema(item, schema.items, `${pointer || "root"}[${idx}]`, rootSchema, refStack);
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

    if (schema.additionalProperties && typeof schema.additionalProperties === "object" && schema.properties) {
      const allowedKeys = new Set(Object.keys(schema.properties));
      for (const [key, value] of Object.entries(data)) {
        if (!allowedKeys.has(key)) {
          const additionalResult = validateAgainstSchema(value, schema.additionalProperties, `${pointer ? pointer + "." : ""}${key}`, rootSchema, refStack);
          if (!additionalResult.valid) errors.push(...additionalResult.errors);
        }
      }
    }

    if (schema.properties) {
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        if (data[propName] !== undefined && data[propName] !== null) {
          const propRes = validateAgainstSchema(data[propName], propSchema, `${pointer ? pointer + "." : ""}${propName}`, rootSchema, refStack);
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

export function validateRcTrialReceipt(data, searchDir = null) {
  const schema = loadSchema("rc-trial-receipt.schema.json", searchDir);
  return validateAgainstSchema(data, schema, "rc-trial-receipt");
}

export function validateAutonomyReadinessCandidate(data, searchDir = null) {
  const schema = loadSchema("autonomy-readiness.schema.json", searchDir);
  return validateAgainstSchema(data, schema, "autonomy-readiness");
}

export function validateAuthorityGrant(data, searchDir = null) {
  return validateAgainstSchema(data, loadSchema("authority-grant.schema.json", searchDir), "authority-grant");
}

export function validateAuthorityState(data, searchDir = null) {
  return validateAgainstSchema(data, loadSchema("authority-state.schema.json", searchDir), "authority-state");
}

export function validateAuthorityAction(data, searchDir = null) {
  return validateAgainstSchema(data, loadSchema("authority-action.schema.json", searchDir), "authority-action");
}

export function validateAuthorityTrigger(data, searchDir = null) {
  return validateAgainstSchema(data, loadSchema("authority-trigger.schema.json", searchDir), "authority-trigger");
}

export function validateAuthorityRevocationReceipt(data, searchDir = null) {
  return validateAgainstSchema(data, loadSchema("authority-revocation-receipt.schema.json", searchDir), "authority-revocation-receipt");
}

const AUTONOMY_SYSTEMS = [
  "S1_OPERATIONS",
  "S2_COORDINATION",
  "S3_OPERATIONAL_CONTROL",
  "S3_STAR_INDEPENDENT_VERIFICATION",
  "S4_ENVIRONMENT_ADAPTATION",
  "S5_POLICY_AUTHORITY"
];

const LEVEL_2_SYSTEMS = ["S1_OPERATIONS", "S2_COORDINATION", "S3_OPERATIONAL_CONTROL"];
const USABLE_EVIDENCE_STATES = new Set(["OBSERVED", "OWNER_CONFIRMED", "SUPPORTED_INTERPRETATION"]);

function addBlocker(blockers, code, level, description, system = null) {
  blockers.push({ code, level, description, ...(system ? { system } : {}) });
}

function hasUsableEvidence(assessment) {
  return assessment?.evidence_status === "SUPPORTED"
    && Array.isArray(assessment.evidence_refs)
    && assessment.evidence_refs.length > 0
    && assessment.evidence_refs.every(ref => USABLE_EVIDENCE_STATES.has(ref.evidence_state));
}

function checkSystemThreshold(profile, system, threshold) {
  const assessment = profile[system];
  const evidenceSupported = hasUsableEvidence(assessment);
  return {
    system,
    score: assessment.score,
    evidence_status: assessment.evidence_status,
    evidence_supported: evidenceSupported,
    threshold,
    eligible: assessment.score >= threshold && evidenceSupported
  };
}

function checkEvidenceGate(gate, label, level, blockers) {
  if (!gate) {
    addBlocker(blockers, `${label}_EVIDENCE_NOT_PROVIDED`, level, `Explicit ${label.toLowerCase().replace(/_/g, " ")} evidence is required.`);
    return false;
  }
  const valid = gate.status === "SUPPORTED"
    && gate.evidence_refs.length > 0
    && gate.evidence_refs.every(ref => USABLE_EVIDENCE_STATES.has(ref.evidence_state));
  if (!valid) {
    addBlocker(blockers, `${label}_EVIDENCE_UNSUPPORTED`, level, `${label.toLowerCase().replace(/_/g, " ")} must be marked SUPPORTED and cite current evidence.`);
  }
  return valid;
}

function evaluateRuleDecision(decision, expectedRuleId, prefix, description) {
  const decisionRecorded = decision.decision_reference.trim() !== "NOT_RECORDED"
    && decision.decision_reference.trim() !== "PENDING"
    && Boolean(decision.decision_date);
  const ruleMatches = decision.rule_id === expectedRuleId;
  const confirmed = decision.status === "OWNER_CONFIRMED" && decisionRecorded && ruleMatches;
  let code = null;
  let resultDescription = description;
  if (!confirmed) {
    if (!ruleMatches) {
      code = `${prefix}_RULE_ID_MISMATCH`;
      resultDescription = "The selected rule does not match the rule supported by this evaluator.";
    } else if (decision.status === "REJECTED") {
      code = `${prefix}_RULE_REJECTED`;
      resultDescription = "The proposed rule was rejected; revise it and record a new owner decision before higher-level evaluation.";
    } else if (decision.status === "OWNER_CONFIRMED" && !decisionRecorded) {
      code = `${prefix}_OWNER_DECISION_INCOMPLETE`;
      resultDescription = "The owner confirmation needs a non-placeholder reference and decision date.";
    } else {
      code = `${prefix}_OWNER_DECISION_PENDING`;
    }
  }
  return {
    code,
    status: decision.status,
    rule_id: decision.rule_id,
    confirmed,
    description: confirmed ? `${description} Owner decision is recorded.` : resultDescription
  };
}

function uniqueBlockers(blockers) {
  const seen = new Set();
  return blockers.filter(blocker => {
    const key = `${blocker.code}:${blocker.system || ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function checkActionLimits(boundary, level, blockers, { requireHumanApproval = true } = {}) {
  let valid = true;
  const requireNonEmptyScope = (values, code, description) => {
    if (!Array.isArray(values) || values.length === 0 || values.some(value => typeof value !== "string" || !value.trim())) {
      addBlocker(blockers, code, level, description);
      valid = false;
    }
  };
  if (boundary.actions.length === 0) {
    addBlocker(blockers, "ACTION_BOUNDARY_NOT_DEFINED", level, "List the process actions and their boundaries.");
    valid = false;
  }
  requireNonEmptyScope(
    boundary.forbidden_tools_actions,
    "FORBIDDEN_ACTIONS_NOT_DEFINED",
    "List at least one forbidden tool or action."
  );
  requireNonEmptyScope(
    boundary.permitted_tools_actions,
    "PERMITTED_TOOLS_NOT_DEFINED",
    "Name the tools or tool actions permitted for this process."
  );
  requireNonEmptyScope(
    boundary.read_permissions,
    "READ_SCOPE_NOT_DEFINED",
    "Define the data or resources the process may read; use an explicit no-read statement when applicable."
  );
  requireNonEmptyScope(
    boundary.write_permissions,
    "WRITE_SCOPE_NOT_DEFINED",
    "Define the data or resources the process may write; use an explicit no-write statement when applicable."
  );
  requireNonEmptyScope(
    boundary.data_boundary?.allowed_data,
    "ALLOWED_DATA_SCOPE_NOT_DEFINED",
    "Define the data allowed for this process."
  );
  requireNonEmptyScope(
    boundary.data_boundary?.forbidden_data,
    "FORBIDDEN_DATA_SCOPE_NOT_DEFINED",
    "Define the data forbidden for this process."
  );
  const sharesScopeEntry = (left, right) => Array.isArray(left) && Array.isArray(right)
    && left.some(value => typeof value === "string" && right.some(other => (
      typeof other === "string" && value.trim().toLowerCase() === other.trim().toLowerCase()
    )));
  if (sharesScopeEntry(boundary.permitted_tools_actions, boundary.forbidden_tools_actions)
    || sharesScopeEntry(boundary.data_boundary?.allowed_data, boundary.data_boundary?.forbidden_data)) {
    addBlocker(blockers, "ACTION_OR_DATA_SCOPE_CONFLICTED", level, "A tool/action or data item cannot be listed as both permitted and forbidden.");
    valid = false;
  }
  if (requireHumanApproval && boundary.actions.some(action => (
    ["AUTOMATE", "AGENT_CONTROL", "HUMAN_SUPERVISE"].includes(action.boundary)
      && action.approval_required !== true
  ))) {
    addBlocker(blockers, "HUMAN_APPROVAL_BOUNDARY_INCOMPLETE", level, "Delegated or supervised actions must retain human approval for a Level 2 candidate.");
    valid = false;
  }
  if (boundary.spend_limit.status === "UNKNOWN"
    || (boundary.spend_limit.status === "DEFINED" && !/^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$/.test(boundary.spend_limit.maximum_amount))) {
    addBlocker(blockers, "SPEND_LIMIT_UNDEFINED", level, "Set a numeric spend limit or explicitly set NO_SPEND.");
    valid = false;
  }
  if (boundary.spend_limit.status === "NO_SPEND" && Number(boundary.spend_limit.maximum_amount) !== 0) {
    addBlocker(blockers, "SPEND_LIMIT_CONFLICT", level, "A NO_SPEND status must use a maximum amount of zero.");
    valid = false;
  }
  if (boundary.production_limit.status === "UNKNOWN"
    || (boundary.production_limit.status === "NONE" && boundary.production_limit.allowed_environments.length > 0)
    || (boundary.production_limit.status === "SANDBOX_ONLY" && boundary.production_limit.allowed_environments.includes("PRODUCTION"))) {
    addBlocker(blockers, "PRODUCTION_LIMIT_UNDEFINED_OR_CONFLICTED", level, "Define a consistent production status and environment allowlist.");
    valid = false;
  }
  if (boundary.escalation_path.length === 0) {
    addBlocker(blockers, "ESCALATION_PATH_NOT_DEFINED", level, "Name an escalation trigger, owner, and response.");
    valid = false;
  }
  if (!boundary.safe_state.trim()) {
    addBlocker(blockers, "SAFE_STATE_NOT_DEFINED", level, "Define the state the process enters when a check fails.");
    valid = false;
  }
  if (!boundary.customer_reputation_limit.trim() || !boundary.strategic_identity_limit.trim()) {
    addBlocker(blockers, "HARD_INVARIANTS_INCOMPLETE", level, "State customer-facing and strategic or identity boundaries.");
    valid = false;
  }
  return valid;
}

/**
 * Deterministic candidate evaluator. It calculates from supplied scores and never
 * verifies evidence truth or grants runtime/production authority.
 */
export function evaluateAutonomyReadinessCandidate(manifest) {
  const profile = manifest.readiness_profile;
  const systemChecks = Object.fromEntries(AUTONOMY_SYSTEMS.map(system => [
    system,
    checkSystemThreshold(profile, system, 4)
  ]));
  const lowestEffectiveScore = Math.min(...AUTONOMY_SYSTEMS.map(system => (
    systemChecks[system].evidence_supported ? systemChecks[system].score : 0
  )));
  const lowestSystems = AUTONOMY_SYSTEMS.filter(system => (
    (systemChecks[system].evidence_supported ? systemChecks[system].score : 0) === lowestEffectiveScore
  ));
  const lowestSystem = lowestSystems[0];

  const baseBlockers = [];
  const level2Blockers = [];
  const level3Blockers = [];
  const level4Blockers = [];

  const processOwner = manifest.process.owner.trim() && manifest.authority.process_owner.trim();
  if (!processOwner) addBlocker(baseBlockers, "PROCESS_OWNER_NOT_DEFINED", 1, "Name the accountable process owner.");
  else if (manifest.process.owner.trim() !== manifest.authority.process_owner.trim()) {
    addBlocker(baseBlockers, "PROCESS_OWNER_AUTHORITY_MISMATCH", 1, "The process owner and authority record must identify the same accountable owner.");
  }
  if (manifest.action_boundary.forbidden_tools_actions.length === 0) {
    addBlocker(baseBlockers, "FORBIDDEN_ACTIONS_NOT_DEFINED", 1, "List at least one forbidden tool or action.");
  }
  const level1Eligible = baseBlockers.length === 0;

  for (const system of LEVEL_2_SYSTEMS) {
    if (!systemChecks[system].eligible) {
      const code = systemChecks[system].evidence_supported ? "SYSTEM_THRESHOLD_NOT_MET" : "SYSTEM_EVIDENCE_UNSUPPORTED";
      addBlocker(level2Blockers, code, 2, `${system} must have a supported score of at least 4.`, system);
    }
  }
  checkActionLimits(manifest.action_boundary, 2, level2Blockers);
  const level2Eligible = level1Eligible && level2Blockers.length === 0;

  for (const system of AUTONOMY_SYSTEMS) {
    if (!systemChecks[system].eligible) {
      const code = systemChecks[system].evidence_supported ? "SYSTEM_THRESHOLD_NOT_MET" : "SYSTEM_EVIDENCE_UNSUPPORTED";
      addBlocker(level3Blockers, code, 3, `${system} must have a supported score of at least 4.`, system);
    }
  }
  const levelGateEvidence = manifest.level_gate_evidence;
  checkEvidenceGate(levelGateEvidence?.telemetry, "TELEMETRY", 3, level3Blockers);
  checkEvidenceGate(levelGateEvidence?.independent_evaluation, "INDEPENDENT_EVALUATION", 3, level3Blockers);
  checkActionLimits(manifest.action_boundary, 3, level3Blockers, { requireHumanApproval: false });
  const level3Eligible = level1Eligible && level3Blockers.length === 0;

  if (!level3Eligible) {
    addBlocker(level4Blockers, "LEVEL_3_REQUIREMENTS_NOT_MET", 4, "Level 4 requires every Level 3 threshold and operating control.");
  }
  checkEvidenceGate(levelGateEvidence?.bounded_live_operation, "BOUNDED_LIVE_OPERATION", 4, level4Blockers);
  if (manifest.authority.owner_decision_status !== "ACCEPTED" || !manifest.authority.decision_date) {
    addBlocker(level4Blockers, "LEVEL_4_OWNER_DECISION_REQUIRED", 4, "Level 4 candidacy requires an accepted, dated owner decision for this candidate.");
  }
  const level4Eligible = level3Eligible && level4Blockers.length === 0;

  const provisionalMaximumCandidateLevel = level4Eligible ? 4 : level3Eligible ? 3 : level2Eligible ? 2 : level1Eligible ? 1 : 0;
  const policyDecisions = [
    evaluateRuleDecision(
      manifest.rule_decisions.score_mapping,
      "COUNT_EVIDENCE_SUPPORTED_CHECKS",
      "SCORE_MAPPING",
      "Each of the five checks contributes one point only when current relevant evidence supports that item. The CLI consumes the supplied total and does not verify item-level evidence or recalculate it."
    ),
    evaluateRuleDecision(
      manifest.rule_decisions.level_2_threshold,
      "S1_S2_S3_EACH_AT_LEAST_4",
      "LEVEL_2_THRESHOLD",
      "Level 2 requires S1, S2, and S3 each at 4 or higher with supported evidence, plus explicit authority and action limits."
    )
  ];
  const unresolvedPolicyDecisions = policyDecisions.filter(decision => !decision.confirmed);
  const hasPendingReadinessPolicy = provisionalMaximumCandidateLevel >= 2 && unresolvedPolicyDecisions.length > 0;
  const maximumCandidateLevel = hasPendingReadinessPolicy ? 1 : provisionalMaximumCandidateLevel;
  const requestedLevel = manifest.candidate_decision.requested_level;
  const blockers = [];

  if (requestedLevel > maximumCandidateLevel) {
    if (requestedLevel > 1 && hasPendingReadinessPolicy) {
      for (const policy of unresolvedPolicyDecisions) {
        addBlocker(blockers, policy.code, requestedLevel, policy.description);
      }
    }
    if (requestedLevel >= 1 && !level1Eligible) blockers.push(...baseBlockers);
    if (requestedLevel >= 2) blockers.push(...level2Blockers);
    if (requestedLevel >= 3) blockers.push(...level3Blockers);
    if (requestedLevel >= 4) blockers.push(...level4Blockers);
  }

  const candidateVerdict = requestedLevel <= 1 && requestedLevel <= maximumCandidateLevel
    ? "HUMAN CONTROLLED"
    : requestedLevel <= maximumCandidateLevel && requestedLevel >= 2 && !hasPendingReadinessPolicy
      ? "OWNER REVIEW REQUIRED"
      : "FIX FIRST";
  const declaredDecision = manifest.candidate_decision;
  const consistencyWarnings = [];
  if (declaredDecision.maximum_candidate_level !== maximumCandidateLevel) {
    consistencyWarnings.push("Declared maximum_candidate_level differs from the deterministic result.");
  }
  if (declaredDecision.verdict !== candidateVerdict) {
    consistencyWarnings.push("Declared verdict differs from the deterministic result.");
  }

  return {
    schema_valid: true,
    assessment_id: manifest.assessment_id,
    process_name: manifest.process.name,
    requested_level: requestedLevel,
    lowest_system: {
      system: lowestSystem,
      tied_systems: lowestSystems,
      supplied_score: systemChecks[lowestSystem].score,
      effective_score: lowestEffectiveScore,
      evidence_status: systemChecks[lowestSystem].evidence_status,
      evidence_supported: systemChecks[lowestSystem].evidence_supported
    },
    system_checks: systemChecks,
    level_eligibility: {
      level_1: { eligible: level1Eligible, blockers: baseBlockers },
      level_2_provisional: { eligible: level2Eligible, blockers: level2Blockers },
      level_3_provisional: { eligible: level3Eligible, blockers: level3Blockers },
      level_4_provisional: { eligible: level4Eligible, blockers: level4Blockers }
    },
    maximum_candidate_level: maximumCandidateLevel,
    provisional_maximum_candidate_level: provisionalMaximumCandidateLevel,
    candidate_verdict: candidateVerdict,
    blockers: uniqueBlockers(blockers),
    rule_decisions: policyDecisions,
    unresolved_policy_decisions: unresolvedPolicyDecisions,
    consistency_warnings: consistencyWarnings,
    authority: {
      authority_status: manifest.authority.authority_status,
      evidence_verified: manifest.evidence_verified,
      production_authorized: manifest.production_authorized,
      separate_execution_authorization_required: manifest.authority.separate_execution_authorization_required
    }
  };
}
