import { createHash } from "node:crypto";
import {
  validateAuthorityAction,
  validateAuthorityGrant,
  validateAuthorityRevocationReceipt,
  validateAuthorityState,
  validateAuthorityTrigger
} from "./schema-validator.mjs";

const CONSEQUENCE_RANK = { LOW: 0, MEDIUM: 1, HIGH: 2 };
const REQUIRED_TRIGGERS = new Set([
  "HARD_INVARIANT_VIOLATION",
  "UNAUTHORIZED_ACTION_ATTEMPT",
  "VERIFICATION_FAILURE",
  "ANOMALY_THRESHOLD",
  "RISK_THRESHOLD"
]);

function validTriggerPolicy(policy) {
  if (!policy || policy.default_effect !== "FREEZE" || !Array.isArray(policy.triggers)) return false;
  const rules = new Map(policy.triggers.map(rule => [rule.trigger_type, rule]));
  if (rules.size !== policy.triggers.length || [...REQUIRED_TRIGGERS].some(type => !rules.has(type))) return false;
  for (const type of ["HARD_INVARIANT_VIOLATION", "UNAUTHORIZED_ACTION_ATTEMPT", "VERIFICATION_FAILURE"]) {
    const rule = rules.get(type);
    if (rule.threshold !== 1 || rule.window_seconds !== 0 || rule.response !== "FREEZE") return false;
  }
  for (const type of ["ANOMALY_THRESHOLD", "RISK_THRESHOLD"]) {
    const rule = rules.get(type);
    if (rule.threshold < 1 || rule.window_seconds < 1 || rule.response !== "FREEZE") return false;
  }
  return true;
}

function validationResult(validators, searchDir) {
  for (const [validate, value, label] of validators) {
    const result = validate(value, searchDir);
    if (!result.valid) {
      return { valid: false, errors: result.errors.map(error => `${label}: ${error}`) };
    }
  }
  return { valid: true, errors: [] };
}

/**
 * Deterministic reference decision. A production adapter must call this at the
 * side-effect boundary and bind the result to the same durable authority epoch.
 */
export function evaluateAuthorityAction(grant, state, action, now = new Date().toISOString(), searchDir = null) {
  const validation = validationResult([
    [validateAuthorityGrant, grant, "grant"],
    [validateAuthorityState, state, "state"],
    [validateAuthorityAction, action, "action"]
  ], searchDir);
  if (!validation.valid) return { decision: "DENY", reasons: ["INVALID_AUTHORITY_INPUT", ...validation.errors] };

  const deny = [];
  if (grant.status !== "ACTIVE") deny.push("GRANT_NOT_ACTIVE");
  if (!validTriggerPolicy(grant.trigger_policy)) deny.push("TRIGGER_POLICY_INCOMPLETE");
  if (state.status !== "ACTIVE" && state.status !== "DOWNGRADED") deny.push("AUTHORITY_NOT_ACTIVE");
  if (action.grant_id !== grant.grant_id || state.grant_id !== grant.grant_id) deny.push("GRANT_ID_MISMATCH");
  if (action.grant_version !== grant.grant_version || state.grant_version !== grant.grant_version) deny.push("STALE_GRANT_VERSION");
  if (action.principal_id !== grant.principal_id || state.principal_id !== grant.principal_id) deny.push("PRINCIPAL_MISMATCH");
  if (action.authority_epoch !== state.authority_epoch) deny.push("STALE_AUTHORITY_EPOCH");
  const nowMs = Date.parse(now);
  const issuedMs = Date.parse(grant.issued_at);
  const expiresMs = Date.parse(grant.expires_at);
  const requestedMs = Date.parse(action.requested_at);
  if (expiresMs <= issuedMs) deny.push("INVALID_GRANT_WINDOW");
  if (nowMs < issuedMs) deny.push("GRANT_NOT_YET_VALID");
  if (nowMs >= expiresMs) deny.push("GRANT_EXPIRED");
  if (requestedMs < issuedMs || requestedMs > nowMs) deny.push("ACTION_TIME_OUTSIDE_VALID_WINDOW");
  if (grant.hard_ceiling.forbidden_actions.includes(action.action)) deny.push("ACTION_FORBIDDEN_BY_HARD_CEILING");
  if (!grant.hard_ceiling.allowed_actions.includes(action.action)) deny.push("ACTION_OUTSIDE_HARD_CEILING");
  if (!state.effective_actions.includes(action.action)) deny.push("ACTION_OUTSIDE_EFFECTIVE_AUTHORITY");
  if (!grant.hard_ceiling.allowed_resources.includes(action.resource)) deny.push("RESOURCE_OUTSIDE_HARD_CEILING");
  if (action.operation === "READ" && !grant.hard_ceiling.allowed_read_resources.includes(action.resource)) deny.push("READ_RESOURCE_OUTSIDE_HARD_CEILING");
  if (action.operation !== "READ" && !grant.hard_ceiling.allowed_write_resources.includes(action.resource)) deny.push("WRITE_RESOURCE_OUTSIDE_HARD_CEILING");
  if (!grant.hard_ceiling.allowed_environments.includes(action.environment)) deny.push("ENVIRONMENT_OUTSIDE_HARD_CEILING");
  if (!grant.hard_ceiling.allowed_data_classes.includes(action.data_classification)) deny.push("DATA_CLASS_OUTSIDE_HARD_CEILING");
  if (CONSEQUENCE_RANK[action.consequence] > CONSEQUENCE_RANK[grant.hard_ceiling.maximum_consequence]) deny.push("CONSEQUENCE_EXCEEDS_HARD_CEILING");
  if (state.spent_amount > 0 && state.spend_currency !== grant.hard_ceiling.spend_currency) deny.push("SPEND_STATE_CURRENCY_MISMATCH");
  if (state.spent_amount + action.requested_spend_amount > grant.hard_ceiling.maximum_spend_amount) deny.push("SPEND_EXCEEDS_HARD_CEILING");
  if (action.requested_spend_amount > 0 && action.spend_currency !== grant.hard_ceiling.spend_currency) deny.push("SPEND_CURRENCY_MISMATCH");
  if ((action.consequence === "HIGH" || grant.hard_ceiling.human_approval_required_actions.includes(action.action))
    && !action.human_approval_reference?.trim()) deny.push("HUMAN_APPROVAL_REQUIRED");

  return {
    decision: deny.length === 0 ? "ALLOW" : "DENY",
    reasons: deny.length === 0 ? ["CURRENT_GRANT_AND_EPOCH_MATCH"] : [...new Set(deny)],
    grant_id: grant.grant_id,
    grant_version: grant.grant_version,
    authority_epoch: state.authority_epoch,
    action_id: action.action_id,
    enforcement_claim: "REFERENCE_EVALUATION_ONLY"
  };
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

/**
 * Produces the next frozen state and receipt. The caller must atomically persist
 * both through the authority store before any further consequential action.
 */
export function tripAuthorityCircuitBreaker(grant, state, trigger, searchDir = null) {
  const validation = validationResult([
    [validateAuthorityGrant, grant, "grant"],
    [validateAuthorityState, state, "state"],
    [validateAuthorityTrigger, trigger, "trigger"]
  ], searchDir);
  if (!validation.valid) return { applied: false, errors: validation.errors };

  const blockers = [];
  if (grant.status !== "ACTIVE") blockers.push("GRANT_NOT_ACTIVE");
  if (state.status !== "ACTIVE" && state.status !== "DOWNGRADED") blockers.push("AUTHORITY_NOT_ACTIVE");
  if (state.grant_id !== grant.grant_id || trigger.grant_id !== grant.grant_id) blockers.push("GRANT_ID_MISMATCH");
  if (state.grant_version !== grant.grant_version) blockers.push("STALE_GRANT_VERSION");
  if (state.principal_id !== grant.principal_id || trigger.principal_id !== grant.principal_id) blockers.push("PRINCIPAL_MISMATCH");
  if (!validTriggerPolicy(grant.trigger_policy)) blockers.push("TRIGGER_POLICY_INCOMPLETE");
  if (!grant.trigger_policy.triggers.some(rule => rule.trigger_type === trigger.trigger_type)) blockers.push("TRIGGER_NOT_DECLARED");
  if (blockers.length) return { applied: false, errors: blockers };

  const resultingEpoch = state.authority_epoch + 1;
  const receiptId = `ARR-${trigger.trigger_id.replace(/[^A-Z0-9-]/gi, "-").toUpperCase().slice(0, 48)}`;
  const nextState = {
    ...state,
    authority_epoch: resultingEpoch,
    status: "FROZEN",
    effective_actions: [],
    last_transition_at: trigger.triggered_at,
    last_revocation_receipt_id: receiptId
  };
  const receipt = {
    schema_version: "0.1.0",
    receipt_id: receiptId,
    grant_id: grant.grant_id,
    grant_version: grant.grant_version,
    principal_id: grant.principal_id,
    run_id: trigger.run_id,
    trigger_policy_id: grant.trigger_policy.policy_id,
    trigger_type: trigger.trigger_type,
    triggered_at: trigger.triggered_at,
    invariant_refs: trigger.invariant_refs,
    evidence_refs: trigger.evidence_refs,
    prior_status: state.status,
    transition_path: [state.status, "ANOMALY_DETECTED", "HOLD", "FROZEN"],
    resulting_status: "FROZEN",
    prior_epoch: state.authority_epoch,
    resulting_epoch: resultingEpoch,
    blocked_action_ids: trigger.blocked_action_ids,
    in_flight_action_ids: trigger.in_flight_action_ids,
    human_review_status: "PENDING",
    automatic_restoration: false,
    authority_source_hash: grant.authority_source.source_hash
  };
  receipt.receipt_digest = createHash("sha256").update(canonicalJson(receipt)).digest("hex");
  const receiptValidation = validateAuthorityRevocationReceipt(receipt, searchDir);
  if (!receiptValidation.valid) return { applied: false, errors: receiptValidation.errors };
  return { applied: true, state: nextState, receipt, persistence_required: true };
}
