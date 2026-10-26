---
title: "authority-revocation"
type: "public-template"
owner: "Project Owner"
status: "starter"
classification: "public"
approval_path: "owner-decision"
tags:
  - gitmoney/authority-revocation
---

# Execution Boundary: Authority Revocation

The Autonomy Readiness Gate is a process assessment. It does not grant access. An execution contract bounds a run. It does not revoke authority after new evidence appears.

The **Execution Boundary** answers: *May this actor perform the next consequential action now?* The **Promotion Boundary** answers: *May this result become official?* Promotion review cannot substitute for runtime revocation.

## Required transition

```text
ACTIVE -> ANOMALY_DETECTED -> HOLD -> FROZEN or DOWNGRADED
       -> HUMAN_REVIEW -> EXPLICIT_REAUTHORIZATION
```

On a declared hard trigger, the adapter must durably hold or freeze the current grant, advance its authority epoch, invalidate stale leases, deny queued actions, and retain a revocation receipt before another consequential effect. An unavailable or stale authority store means deny. Preserve in-flight action status; do not claim completed external effects were undone. Reserve and reconcile cumulative spend in the same durable authority boundary; a per-action check alone cannot enforce a grant-wide ceiling.

The grant's hard ceiling cannot be expanded by a score, role, credential scope, or historical trust. Reauthorization is a separate human decision with a new grant version. Historical trust never restores authority automatically.

## Runtime binding

Every consequential call must pass through an adapter that checks the current grant and epoch at the side-effect boundary. A prompt, log, branch rule, or check that an agent can bypass is not an Execution Boundary. Remove alternate credentials and bypass paths before claiming enforcement.

The included reference evaluator returns a deterministic allow/deny result and can produce a frozen next-state proposal plus a digest-bound receipt. It does not persist state or intercept provider tools. The adapter must atomically persist state and receipt before proceeding. A provider integration is `SPECIFIED` until separately exercised and verified in that runtime.

## Files

- `../schemas/authority-grant.schema.json`: owner-issued ceiling and trigger policy.
- `../schemas/authority-state.schema.json`: current status, effective actions, and epoch.
- `../schemas/authority-action.schema.json`: one action request.
- `../schemas/authority-trigger.schema.json`: one declared anomaly event.
- `../schemas/authority-revocation-receipt.schema.json`: forensic transition record.
- `../templates/authority-grant.json`, `authority-state.json`, `authority-action.json`, `authority-trigger.json`, and `authority-revocation-receipt.json`: starter records.

Use the root framework's `tests/rc-trials/RC-06-authority-revocation.md` as the acceptance procedure when available. Do not report a live revocation result from schema validation or the reference evaluator alone.
