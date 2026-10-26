---
title: "Beta.4 RC-05 and RC-06 execution receipt"
type: "rc-evidence-receipt"
status: "partial-pass-hold"
classification: "public"
target_candidate_sha: "671cf67c02c1c68c555fbc2af8d04b9b2ad7c298"
date: 2026-09-26
tags:
  - gitmoney/beta4
  - gitmoney/rc-trial
  - authority-revocation
---

# Beta.4 RC-05 and RC-06 execution receipt

## Candidate and boundary

| Field | Result |
|---|---|
| Exact candidate under test | `671cf67c02c1c68c555fbc2af8d04b9b2ad7c298` |
| Original beta.4 architecture commit | `a0d6c38887418d9821310403b6ca9e2980f9f8e4` |
| Gate execution commit | `671cf67c02c1c68c555fbc2af8d04b9b2ad7c298` |
| Branch | `codex/autonomy-readiness-phase2` |
| Runtime | Node.js `v24.18.0` |
| Test data | Synthetic only |
| Release | **HOLD** |

This receipt records local conformance and an isolated local adapter test double. No external provider, agent platform, production credential, customer data, deployment, or public release was involved.

## RC-05: Autonomy Readiness Gate

**Disposition: PARTIAL PASS.** The evaluator and candidate boundaries passed the executed local checks. The required independent content-review record and separate owner release decision are not present, so RC-05 is not a release PASS.

- `node tests/conformance.mjs`: **75 passed, 0 failed**. Added assertions cover the supported 4/4/4 Level 2 ceiling, independent S1/S2/S3 threshold failures, `UNVERIFIED`/`STALE`/`CONFLICTED`/absent evidence, the authority separation fields, missing and blank action scopes, conflicting allow/deny scopes, owner mismatch, human-approval boundaries, spend and production limits, escalation, and scoring-rule provenance.
- All three fictional examples and all eleven negative fixtures were evaluated. Per-fixture schema status, result, blockers, authority fields, and SHA-256 are in [`evidence/RC05-fixture-results.json`](evidence/RC05-fixture-results.json). Schema-rejected cases fail closed; supported candidate scores leave authority `NOT_GRANTED`, evidence verification `NO`, execution authorization separately required, and production authorization `NO`.
- Synthetic worksheet arithmetic: two current supported checks, one `NO`, one `UNVERIFIED`, and one missing/stale check yields **2/5**. This is a manual worksheet calculation. The CLI consumes the aggregate and does not independently validate the five check-to-evidence mapping.
- The capability-without-authority negative fixture reaches candidate level 3 while keeping `authority_status: NOT_GRANTED` and `production_authorized: NO`.
- The cold-founder test remains excluded as prescribed by RC-05. No usability result is claimed.
- The owner stated that they reviewed the beta.4 candidate before its architecture commit. No scoped independent human content-review receipt for the guide, scoring ruling, worksheet, examples, and RC-05 copy is recorded here. Fresh-context AI review is also not recorded.

## RC-06: Authority Revocation and Circuit Breaker

**Disposition: PASS for the reference evaluator and isolated local test double; provider/runtime adapter gate NOT RUN.**

The isolated file-backed test double records action A, enforces a cumulative spend ceiling, persists the frozen state and receipt, then denies action B before writing its effect record. A separate Node process reloads the state and denies an old-epoch attempt. Same-process stale caller attempts are denied. The receipt validates against the schema, its digest recomputes, and its in-flight action disposition is retained without claiming the action was undone.

- Runner: [`rc06-isolated-adapter.mjs`](rc06-isolated-adapter.mjs), with child-process check [`rc06-restart-probe.mjs`](rc06-restart-probe.mjs).
- Evidence: [`evidence/RC06-isolated-adapter.json`](evidence/RC06-isolated-adapter.json).
- Receipt ID: `ARR-RC06-SYNTHETIC-TRIGGER-01`.
- Receipt digest: `2ca2c786e3288f981c88b37677622a40674ffb2d528cb6ad86be5c402744041a`.
- Transition: `ACTIVE → ANOMALY_DETECTED → HOLD → FROZEN`; epoch `7 → 8`; action B denied with no side-effect record; human review remains `PENDING`; automatic restoration is false.

This is **isolated-runner evidence only**, not `LIVE_VERIFIED`. The repo contains no named provider adapter. The local runner does not establish cross-process atomicity at an external side-effect boundary, provider tool interception, queue cancellation, or absence of alternate credentials and bypass paths in an adopter environment.

## Local verification

| Check | Result | Evidence boundary |
|---|---|---|
| Conformance suite | 75/75 passed | Includes initialized starter doctor and ICM contract/receipt validation |
| Framework doctor | PASS | Exact candidate; no warnings on the clean candidate worktree |
| Copy rails | PASS | No prohibited phrases or em dashes |
| Relative links | PASS | 226 links resolved |
| Tracked-file security scan | PASS | 0 private-source, configured-secret, or restricted-classification findings |
| RC-06 local adapter | PASS, isolated only | File-backed local side-effect test double; no provider connection |

## Release decision

**HOLD.** Beta.4 can claim **revocation protocol support** and local reference/test-double evidence. It cannot claim **verified live revocation enforcement**. Promotion requires a scoped independent content review, a named real runtime adapter, RC-06 at that adapter's actual side-effect boundary (including bypass and queued/in-flight disposition checks), and a separate owner release decision. RC-05's cold-founder usability evidence remains absent and must be included in that decision.
