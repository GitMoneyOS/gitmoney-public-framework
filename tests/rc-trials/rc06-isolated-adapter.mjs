#!/usr/bin/env node
/**
 * Isolated local adapter exercise for RC-06. This file-backed test double
 * demonstrates process-restart persistence and same-process action ordering.
 * It is not a provider adapter and does not claim cross-process atomicity.
 */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  appendFileSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  writeFileSync
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  evaluateAuthorityAction,
  tripAuthorityCircuitBreaker
} from "../../scripts/authority-control.mjs";
import {
  validateAuthorityRevocationReceipt
} from "../../scripts/schema-validator.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const candidateSha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
const runRoot = mkdtempSync(path.join(os.tmpdir(), "gitmoney-rc06-"));
const authorityPath = path.join(runRoot, "authority-store.json");
const effectsPath = path.join(runRoot, "isolated-side-effects.jsonl");
const grantPath = path.join(runRoot, "synthetic-grant.json");
const restartActionPath = path.join(runRoot, "restart-stale-action.json");
const now = new Date().toISOString();
const grant = {
  schema_version: "0.1.0",
  grant_id: "AGR-RC06-SYNTHETIC-01",
  grant_version: 1,
  principal_id: "synthetic-agent-01",
  process_id: "synthetic-process-01",
  status: "ACTIVE",
  authority_source: {
    owner: "Synthetic Test Owner",
    decision_reference: "SYNTHETIC-DECISION-01",
    source_hash: "a".repeat(64),
    validated_at: now
  },
  issued_at: new Date(Date.now() - 60_000).toISOString(),
  expires_at: new Date(Date.now() + 3_600_000).toISOString(),
  hard_ceiling: {
    allowed_actions: ["WRITE_SYNTHETIC_FIXTURE"],
    forbidden_actions: ["WRITE_OUTSIDE_FIXTURE"],
    human_approval_required_actions: [],
    allowed_resources: ["local://rc06/synthetic-fixture"],
    allowed_read_resources: [],
    allowed_write_resources: ["local://rc06/synthetic-fixture"],
    allowed_environments: ["LOCAL"],
    allowed_data_classes: ["PUBLIC"],
    maximum_consequence: "LOW",
    maximum_spend_amount: 1.5,
    spend_currency: "USD"
  },
  trigger_policy: {
    policy_id: "SYNTHETIC-RC06-POLICY-V1",
    triggers: [
      { trigger_type: "HARD_INVARIANT_VIOLATION", predicate_id: "synthetic-invariant-failed", threshold: 1, window_seconds: 0, response: "FREEZE" },
      { trigger_type: "UNAUTHORIZED_ACTION_ATTEMPT", predicate_id: "outside-grant", threshold: 1, window_seconds: 0, response: "FREEZE" },
      { trigger_type: "VERIFICATION_FAILURE", predicate_id: "verification-failed", threshold: 1, window_seconds: 0, response: "FREEZE" },
      { trigger_type: "ANOMALY_THRESHOLD", predicate_id: "anomaly-threshold", threshold: 2, window_seconds: 60, response: "FREEZE" },
      { trigger_type: "RISK_THRESHOLD", predicate_id: "risk-threshold", threshold: 2, window_seconds: 60, response: "FREEZE" }
    ],
    default_effect: "FREEZE"
  },
  reauthorization_policy: {
    human_decision_required: true,
    new_grant_version_required: true,
    automatic_restoration_from_trust_allowed: false
  }
};
const initialState = {
  schema_version: "0.1.0",
  grant_id: grant.grant_id,
  grant_version: grant.grant_version,
  principal_id: grant.principal_id,
  authority_epoch: 7,
  status: "ACTIVE",
  effective_actions: ["WRITE_SYNTHETIC_FIXTURE"],
  spent_amount: 0,
  spend_currency: "USD",
  last_transition_at: now,
  last_revocation_receipt_id: "NONE"
};

function atomicWrite(filePath, value) {
  const tempPath = `${filePath}.${process.pid}.tmp`;
  writeFileSync(tempPath, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  renameSync(tempPath, filePath);
}

function currentState() {
  return JSON.parse(readFileSync(authorityPath, "utf8")).state;
}

function appendEffect(action, decision) {
  appendFileSync(effectsPath, `${JSON.stringify({ action_id: action.action_id, resource: action.resource, requested_spend_amount: action.requested_spend_amount, authority_epoch: decision.authority_epoch })}\n`, { mode: 0o600 });
  const state = currentState();
  atomicWrite(authorityPath, {
    state: { ...state, spent_amount: state.spent_amount + action.requested_spend_amount },
    receipt: JSON.parse(readFileSync(authorityPath, "utf8")).receipt
  });
  return { decision: "ALLOW", side_effect_recorded: true };
}

function performConsequentialAction(action) {
  const state = currentState();
  const decision = evaluateAuthorityAction(grant, state, action, new Date().toISOString(), repoRoot);
  if (decision.decision !== "ALLOW") return { decision: "DENY", side_effect_recorded: false, reasons: decision.reasons };
  return appendEffect(action, decision);
}

function action(actionId, epoch, requestedSpend) {
  return {
    action_id: actionId,
    grant_id: grant.grant_id,
    grant_version: grant.grant_version,
    principal_id: grant.principal_id,
    authority_epoch: epoch,
    operation: "WRITE",
    action: "WRITE_SYNTHETIC_FIXTURE",
    resource: "local://rc06/synthetic-fixture",
    environment: "LOCAL",
    data_classification: "PUBLIC",
    consequence: "LOW",
    requested_spend_amount: requestedSpend,
    spend_currency: "USD",
    requested_at: new Date().toISOString()
  };
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

atomicWrite(authorityPath, { state: initialState, receipt: null });
const actionA = action("RC06-ACTION-A", initialState.authority_epoch, 1.0);
const actionAResult = performConsequentialAction(actionA);
assert.equal(actionAResult.decision, "ALLOW");
assert.equal(actionAResult.side_effect_recorded, true);

const overCeiling = action("RC06-SPEND-OVER-CAP", initialState.authority_epoch, 0.51);
const spendResult = performConsequentialAction(overCeiling);
assert.equal(spendResult.decision, "DENY", "cumulative spend above the grant ceiling must fail closed");
assert.equal(spendResult.side_effect_recorded, false);

const actionB = action("RC06-ACTION-B", initialState.authority_epoch, 0.5);
const trigger = {
  trigger_id: "RC06-SYNTHETIC-TRIGGER-01",
  grant_id: grant.grant_id,
  principal_id: grant.principal_id,
  run_id: "synthetic-run-01",
  trigger_type: "HARD_INVARIANT_VIOLATION",
  triggered_at: new Date().toISOString(),
  invariant_refs: ["SYNTHETIC-INVARIANT-01"],
  evidence_refs: ["synthetic-evidence://rc06/invariant-failure-01"],
  blocked_action_ids: [actionB.action_id],
  in_flight_action_ids: [actionA.action_id]
};
const transition = tripAuthorityCircuitBreaker(grant, currentState(), trigger, repoRoot);
assert.equal(transition.applied, true, `reference transition failed: ${JSON.stringify(transition.errors ?? [])}`);
const referenceNextDecision = evaluateAuthorityAction(grant, transition.state, actionB, new Date().toISOString(), repoRoot);
assert.equal(referenceNextDecision.decision, "DENY");
assert(referenceNextDecision.reasons.includes("AUTHORITY_NOT_ACTIVE"));
assert(referenceNextDecision.reasons.includes("STALE_AUTHORITY_EPOCH"));
const incompletePolicyGrant = {
  ...grant,
  trigger_policy: {
    ...grant.trigger_policy,
    triggers: grant.trigger_policy.triggers.filter(rule => rule.trigger_type !== "RISK_THRESHOLD")
  }
};
const incompletePolicyTransition = tripAuthorityCircuitBreaker(incompletePolicyGrant, initialState, trigger, repoRoot);
assert.equal(incompletePolicyTransition.applied, false, "an incomplete trigger policy cannot trip or expand authority");
atomicWrite(authorityPath, { state: transition.state, receipt: transition.receipt });

// This adapter's effect-boundary function reloads durable state immediately
// before its side-effect sink. The trigger is persisted before action B.
const actionBResult = performConsequentialAction(actionB);
assert.equal(actionBResult.decision, "DENY");
assert.equal(actionBResult.side_effect_recorded, false);

// Start a separate Node process after the transition; it reloads the file-backed
// state and attempts the old epoch through a fresh evaluator instance.
writeFileSync(grantPath, `${JSON.stringify(grant)}\n`, { mode: 0o600 });
writeFileSync(restartActionPath, `${JSON.stringify(action("RC06-RESTART-STALE", initialState.authority_epoch, 0))}\n`, { mode: 0o600 });
const restartProbe = JSON.parse(execFileSync(process.execPath, [
  path.join(path.dirname(fileURLToPath(import.meta.url)), "rc06-restart-probe.mjs"),
  authorityPath,
  grantPath,
  restartActionPath,
  repoRoot
], { encoding: "utf8" }));
assert.equal(restartProbe.decision, "DENY");
assert.equal(restartProbe.state.status, "FROZEN");
assert.equal(restartProbe.state.authority_epoch, initialState.authority_epoch + 1);

// Same-process concurrent stale callers meet the synchronous effect boundary.
const concurrent = [
  performConsequentialAction(action("RC06-CONCURRENT-1", initialState.authority_epoch + 1, 0)),
  performConsequentialAction(action("RC06-CONCURRENT-2", initialState.authority_epoch + 1, 0))
];
assert(concurrent.every(result => result.decision === "DENY" && !result.side_effect_recorded));

const persisted = JSON.parse(readFileSync(authorityPath, "utf8"));
const receipt = persisted.receipt;
assert.equal(persisted.state.status, "FROZEN");
assert.equal(persisted.state.authority_epoch, initialState.authority_epoch + 1);
assert.equal(persisted.state.effective_actions.length, 0);
assert.deepEqual(receipt.blocked_action_ids, [actionB.action_id]);
assert.deepEqual(receipt.in_flight_action_ids, [actionA.action_id]);
assert.equal(receipt.human_review_status, "PENDING");
assert.equal(receipt.automatic_restoration, false);
assert.equal(validateAuthorityRevocationReceipt(receipt, repoRoot).valid, true);
const receiptPayload = { ...receipt };
delete receiptPayload.receipt_digest;
assert.equal(receipt.receipt_digest, createHash("sha256").update(canonicalJson(receiptPayload)).digest("hex"));
const effects = readFileSync(effectsPath, "utf8").trim().split("\n").map(line => JSON.parse(line));
assert.deepEqual(effects.map(effect => effect.action_id), [actionA.action_id]);

const output = {
  trial: "RC-06",
  evidence_class: "ISOLATED_LOCAL_ADAPTER_TEST_DOUBLE",
  target_candidate_sha: candidateSha,
  node: process.version,
  operator: "local deterministic test runner",
  result: "PASS_ISOLATED_RUNNER_ONLY",
  fixture_hashes: {
    grant_sha256: createHash("sha256").update(canonicalJson(grant)).digest("hex"),
    initial_state_sha256: createHash("sha256").update(canonicalJson(initialState)).digest("hex"),
    action_a_sha256: createHash("sha256").update(canonicalJson(actionA)).digest("hex"),
    action_b_sha256: createHash("sha256").update(canonicalJson(actionB)).digest("hex"),
    trigger_sha256: createHash("sha256").update(canonicalJson(trigger)).digest("hex")
  },
  assertions: {
    action_a_allowed_and_effect_recorded: actionAResult.decision === "ALLOW",
    cumulative_spend_ceiling_denied: spendResult.decision === "DENY",
    trigger_froze_grant_before_action_b: persisted.state.status === "FROZEN" && actionBResult.decision === "DENY",
    stale_epoch_denied_after_process_restart: restartProbe.decision === "DENY",
    same_process_stale_caller_burst_denied: concurrent.every(result => result.decision === "DENY"),
    receipt_schema_valid: validateAuthorityRevocationReceipt(receipt, repoRoot).valid,
    receipt_digest_recomputed: receipt.receipt_digest === createHash("sha256").update(canonicalJson(receiptPayload)).digest("hex"),
    in_flight_action_disposition_recorded: receipt.in_flight_action_ids.includes(actionA.action_id),
    no_effect_for_blocked_actions: effects.length === 1 && effects[0].action_id === actionA.action_id
  },
  receipt,
  limitations: [
    "No external provider, agent platform, production system, or credential was connected.",
    "The local test double exercises same-process serialized calls and process-restart state reload only.",
    "It does not prove cross-process atomicity, provider interception, queue cancellation, or absence of bypass paths in an adopter environment.",
    "The recorded in-flight action is not claimed to have been undone."
  ]
};
console.log(JSON.stringify(output, null, 2));
