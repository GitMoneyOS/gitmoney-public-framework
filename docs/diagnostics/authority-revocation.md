---
title: "authority-revocation"
type: "public-framework"
owner: "Hitsuyo Aku"
status: "draft"
classification: "public"
approval_path: "issue-and-pull-request"
promotion_target: "owner-review"
tags:
  - gitmoney/public-framework
  - authority-revocation
  - execution-boundary
---

# Authority Revocation and Circuit Breaker

## Purpose

The Autonomy Readiness Gate asks whether one process is a candidate for delegated work. An execution contract states the scope of a particular run. Neither is a runtime control that can stop an already-authorized actor after new evidence makes continued execution unsafe.

The **Execution Boundary** answers a different question from the Promotion Boundary:

- **Promotion Boundary:** Can this result become official company record?
- **Execution Boundary:** Can this actor still perform the next consequential action?

The Promotion Boundary can hold a result after the work was attempted. The Execution Boundary must deny the next action while the work is still running.

## Required invariant

> Authority must be revocable faster than it is expandable.

Capability is not authority. Historical trust may inform human review for a later grant, but it never overrides a hard ceiling and never automatically restores revoked authority.

## State machine

```text
ACTIVE
  -> ANOMALY_DETECTED
  -> HOLD
  -> FROZEN | DOWNGRADED
  -> HUMAN_REVIEW
  -> EXPLICIT_REAUTHORIZATION
  -> ACTIVE (new grant version only)
```

`ANOMALY_DETECTED` and `HOLD` are fail-closed. A runtime must durably record HOLD and deny new consequential actions before attempting review, notification, cleanup, or recovery. The freeze/downgrade must not wait for a human to acknowledge the alert.

The current beta.4 reference evaluator resolves an active trigger to `FROZEN`. A runtime adapter may implement `DOWNGRADED` only when the grant defines an exact residual action allowlist. That allowlist must be a strict subset of the grant's hard ceiling. If the adapter cannot prove that relation, it freezes.

Reauthorization creates a new grant ID or version and a new authority epoch. It is a human decision with a named owner, source decision reference, timestamp, scope, and expiry. Historical trust scores are not reauthorization evidence.

## Machine-readable triggers

Every consequential execution contract must bind a versioned trigger policy. It must include, at minimum:

| Trigger | Default response | Meaning |
|---|---|---|
| `HARD_INVARIANT_VIOLATION` | Freeze | A declared must-remain-true condition was violated. |
| `UNAUTHORIZED_ACTION_ATTEMPT` | Freeze | An actor attempted an action outside its current grant. |
| `VERIFICATION_FAILURE` | Freeze | A required independent verification failed or could not run. |
| `ANOMALY_THRESHOLD` | Freeze | A declared deterministic count, sequence, or rate threshold was met. |
| `RISK_THRESHOLD` | Freeze | A declared risk limit was met or exceeded. |

Each trigger definition records its ID, scope, deterministic predicate or threshold, evaluation window where relevant, severity, action (`HOLD`, `FREEZE`, or bounded `DOWNGRADE`), and evidence required. An undefined threshold is not a trigger rule. A model confidence score alone cannot silently widen authority.

## Enforcement contract

The adapter that performs a consequential action must:

1. Read the current durable authority state and grant version at the enforcement point.
2. Check actor identity, action, resource, data scope, environment, consequence ceiling, expiry, approval reference, and current authority epoch.
3. Deny on missing, stale, conflicting, unreadable, or unverifiable state.
4. On a trigger, atomically move authority to `HOLD` or a stricter state, advance the epoch, invalidate outstanding execution leases, and cancel queued actions.
5. Check the current epoch again at the side-effect boundary so an earlier authorization cannot race with revocation.
6. Reserve and reconcile cumulative spend in the durable authority transaction; a per-action check alone does not enforce a grant-wide spend ceiling.
7. Emit a revocation receipt and preserve the triggering evidence and in-flight action state.
8. Require an explicit human decision and a new grant before resuming.

All consequential calls must pass through the enforcement adapter. A sidecar check that an agent can bypass, a prompt instruction, a log entry, or a post-action review is not an Execution Boundary. Shared or alternate credentials outside the adapter invalidate the enforcement claim.

For high-consequence work, use a gateway or broker that can bind the authority check to the actual side effect. A local file or CLI check is useful for contract validation but cannot prove atomic control over an external API, database, deployment, or payment provider.

## Hard ceilings

The grant defines a maximum envelope across actor, actions, resources, data, environment, spend, and consequence. A process-specific effective scope may only be equal to or narrower than that ceiling. Readiness score, historical trust, team role, credential scope, or tool availability cannot expand it.

Money movement, credentials, production infrastructure, deployment, destructive operations, external commitments, and irreversible state changes default to human-controlled unless the owner has established a narrower, current policy and the runtime binding can enforce it. This beta.4 specification does not authorize those actions.

## State and evidence records

- [`authority-grant.schema.json`](../../schemas/authority-grant.schema.json) describes a bounded, versioned human-issued grant.
- [`authority-state.schema.json`](../../schemas/authority-state.schema.json) describes the current fail-closed runtime state and epoch.
- [`authority-action.schema.json`](../../schemas/authority-action.schema.json) describes one action request, including operation, data class, and requested spend.
- [`authority-trigger.schema.json`](../../schemas/authority-trigger.schema.json) describes one machine-readable trigger event.
- [`authority-revocation-receipt.schema.json`](../../schemas/authority-revocation-receipt.schema.json) describes the trigger, state change, blocked actions, and evidence binding.
- [`authority-control.mjs`](../../scripts/authority-control.mjs) contains the deterministic reference evaluator and freeze transition.
- The `authority-*.json` files in [`templates/`](../../templates/) are starter records.

Receipts bind the grant source hash and a digest of the canonical receipt payload. The runtime must retain the underlying evidence at its approved source; the receipt digest is not the evidence itself and does not prove that the trigger was correctly classified.

For a `HIGH` consequence or action explicitly marked as requiring approval, the reference evaluator requires a non-empty approval reference. The runtime adapter must resolve that reference to a current decision by the authorized human; a string alone is not approval evidence. Spend amount, data classification, operation type, and resource identity must be bound to trusted request data at the actual effect boundary, not supplied only by the agent.

## Beta.4 capability boundary

GitMoney beta.4 supplies the public contract, schemas, deterministic reference evaluator, and acceptance procedure. The CLI reference evaluator can validate proposed state and decide whether a supplied action is allowed by that state. It does not intercept an agent's platform tools or revoke provider credentials. An adopter must implement and independently verify the runtime adapter before claiming live revocation capability.

The Autonomy Readiness Gate remains an optional, one-process candidate assessment. It does not issue grants. Execution authorization remains a separate owner decision, and runtime enforcement remains a separate implementation proof.

## Acceptance procedure

Run the bounded scenario in [RC-06](../../tests/rc-trials/RC-06-authority-revocation.md) against the candidate reference evaluator and, separately, each adopter runtime adapter. The reference evaluation and runtime proof must be reported as distinct evidence. Passing the reference scenario does not establish provider-level or production revocation.

## First implementation boundary

Use the following order for an adopter implementation:

1. Establish the authority store and owner-issued grant format.
2. Route every consequential action through one adapter and remove bypass credentials.
3. Add atomic hold/freeze, epoch invalidation, queue cancellation, and action-boundary checks.
4. Prove the denied-next-action behavior in an isolated non-production test runner.
5. Run a bounded owner-approved live pilot only after adapter-specific review, rollback planning, and explicit authorization.

Until steps 1-4 have evidence, the state is `SPECIFIED`, not `LIVE_VERIFIED`.
