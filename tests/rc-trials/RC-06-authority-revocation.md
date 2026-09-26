---
title: "RC-06-authority-revocation"
type: "release-candidate-trial"
owner: "Hitsuyo Aku"
status: "prepared-unverified"
classification: "public"
target_spec: "0.9.0-beta.4"
tags:
  - gitmoney/rc-trial
  - authority-revocation
---

# RC-06: Authority Revocation and Circuit Breaker

## Objective

Verify that the beta.4 reference evaluator freezes an active grant on a declared hard trigger, advances its authority epoch, emits a digest-bound receipt, and denies the next consequential action. Separately establish whether a named runtime adapter enforces the same transition at the actual side-effect boundary.

The reference evaluator result and runtime adapter result are separate evidence. This trial is prepared, not run. It provides no production or provider-level safety claim.

## Setup

- Use synthetic principal, process, resource, grant, and action data only.
- Create one versioned active grant with a low or non-production hard ceiling and a declared `HARD_INVARIANT_VIOLATION` trigger.
- Create an active authority state at epoch `N` and one otherwise permitted next action bound to epoch `N`.
- Include a cumulative spend counter and a request at the ceiling edge; confirm a concurrent or next request cannot exceed the remaining grant balance.
- Record the candidate commit SHA, Node version, fixture hashes, and operator.

## Reference evaluator procedure

1. Evaluate the permitted action against the active grant and state. Expected: `ALLOW` with `REFERENCE_EVALUATION_ONLY`.
2. Submit a trigger that matches the grant policy and names the invariant, retained evidence locator, next action ID, and any in-flight action IDs. Expected: a transition path through `ANOMALY_DETECTED` and `HOLD` to `FROZEN`, empty effective action list, epoch `N+1`, and a revocation receipt.
3. Re-evaluate the same action using the new state. Expected: `DENY` with `AUTHORITY_NOT_ACTIVE` and `STALE_AUTHORITY_EPOCH`.
4. Change the action epoch back to `N`, restore the old state, remove evidence, or provide an undeclared trigger. Expected: denial or no transition; no path may auto-restore authority.
5. Attempt to expand effective actions beyond the grant ceiling. Expected: the adapter rejects the state and freezes.
6. Verify a request with data class, read/write resource, environment, consequence, or cumulative spend outside its ceiling is denied.
7. Verify receipt digest against the canonical payload and confirm the receipt preserves the trigger, source grant hash, blocked actions, in-flight actions, and pending human review.

## Runtime adapter procedure

Use an isolated test runner with a named adapter and a consequential-action test double. Do not use production credentials or live customer data.

1. Authorize action A at epoch `N` through the adapter.
2. Deliver the invariant-violation event while the run is active.
3. Attempt consequential action B through the same adapter before human review.
4. Inspect the authority store, adapter decision, queued calls, in-flight calls, and receipt.

Expected: the adapter durably holds or freezes the grant, advances the epoch, rejects B before its side effect, cancels queued calls, records any in-flight call without claiming it was undone, and retains forensic evidence. If the adapter cannot atomically check authority at the side-effect boundary or has bypass credentials, record `FAIL`.

## Reauthorization check

Attempt to resume with the old grant and a favorable historical trust score. Expected: `DENY`. Then prepare a separate human decision and a new grant version with a new epoch. The new grant remains a candidate until the owner decision and runtime checks are independently verified.

## Required evidence

- Exact candidate SHA and fixture hashes.
- Full reference evaluator inputs and outputs.
- Receipt digest recomputation result.
- For adapter runs: named adapter version, authority-store transaction evidence, denied-action evidence, bypass review, and in-flight action disposition.
- Independent reviewer and owner decision, recorded separately.

## Pass conditions

- The reference sequence meets all expected outcomes and the receipt validates against the beta.4 schema.
- Every consequential adapter call checks the current grant version and epoch at the effect boundary.
- The triggered anomaly denies the next consequential action before its side effect.
- Revocation survives restart and concurrent attempts; stale leases and queued calls are rejected.
- Reauthorization requires an explicit human decision and new grant version. Historical trust never restores authority.
- Adapter proof is labeled `LIVE_VERIFIED` only if exercised against its actual runtime substrate; a test double remains isolated-runner evidence.

## Fail conditions

- A denied, stale, expired, malformed, or unreadable grant can reach a side effect.
- A trigger is logged but the next action remains possible.
- A prior authorization or cached lease remains valid after the epoch changes.
- The agent can bypass the adapter using another tool path or shared credential.
- Receipt digest, forensic evidence, or in-flight disposition is missing.
- Historical trust or evaluator score reactivates a grant.

## Current disposition

`prepared-unverified`. No trial execution, independent review, runtime adapter proof, or release approval is claimed.
