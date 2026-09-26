---
title: "autonomy-readiness-examples"
type: "public-framework"
owner: "Hitsuyo Aku"
status: "draft"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
  - autonomy-readiness
  - examples
---

# Autonomy Readiness Examples

These files use Fictional Studio Co. and invented scenario data. They are teaching examples only. Their scores, evidence identifiers, process owners, and locators do not describe real people or a real process. Do not reuse them as evidence or as an owner decision.

Run one candidate from the GitMoney repository root:

```bash
node scripts/gitmoney.mjs readiness validate examples/autonomy-readiness/fictional-studio-ready.json --json
```

The CLI checks the manifest shape and calculates a candidate result from supplied fields. It does not inspect whether an evidence locator is real or whether its contents support a score. A successful command is not proof that the fictional or any real process is safe.

## Examples

| File | Scenario | Expected candidate result |
|---|---|---|
| `fictional-studio-ready.json` | The request stays at Level 1: a person reviews, edits, and manually shares every output. The fictional scores and action limits support considering a Level 2 candidate. | `HUMAN CONTROLLED`; maximum candidate level `2`; `authority_status` remains `NOT_GRANTED`. |
| `fictional-studio-fix-first.json` | The requested Level 2 remains blocked because S1, S2, and S3 lack usable evidence or miss threshold; S2 is the primary repair focus because handoff ownership and queue capacity are unresolved. | `FIX FIRST`; maximum candidate level `1`; S2 is the repair focus. |
| `fictional-studio-human-controlled.json` | People make and execute an expense-exception decision. | `HUMAN CONTROLLED`; requested level `0`. |

“Ready” here means only that the fictional evidence and action limits meet the Gate's Level 2 candidate threshold. The assessment requests Level 1, and the evaluator grants no execution authority. The CLI consumes aggregate scores; it does not verify the evidence or recompute each checklist item.

## The three boundaries

- **Context is not canon.** Inputs and scenario notes are context for one run. They do not establish policy or override the named owner.
- **Capability is not authority.** A system that can prepare a draft has no permission to send it, change a system of record, spend money, or make a reserved human decision.
- **Completion is not proof.** A completed draft, a passing schema check, and a candidate score do not verify evidence truth or business outcomes. Every manifest keeps `evidence_verified: NO`, `authority_status: NOT_GRANTED`, and `production_authorized: NO`.

## Negative fixtures

The JSON files in `negative/` are deliberate counterexamples. Some must fail schema validation; others are structurally valid but remain blocked by the evaluator. `capability-without-authority.json` is an authority-separation case: its fully synthetic inputs reach a provisional Level 3 candidate ceiling while `authority_status` remains `NOT_GRANTED`, execution authorization remains required, and production authorization remains `NO`. This demonstrates that a candidate score does not grant authority. The CLI exits `1` for invalid manifests. A schema-valid candidate can exit `0` while returning `FIX FIRST`; inspect the JSON result and authority fields, not just the exit code.

| Fixture | Expected behavior |
|---|---|
| `score-out-of-range.json` | Schema rejects a score above `5`. |
| `missing-process-owner.json` | Schema rejects an empty accountable owner. |
| `supported-score-without-evidence.json` | Evaluator does not count a supported label without evidence references. |
| `s3star-below-threshold-for-level3.json` | Evaluator identifies S3* as below the Level 3 threshold. |
| `level4-without-bounded-live-evidence.json` | Level 4 remains blocked without bounded-live evidence and an accepted dated owner decision. |
| `capability-without-authority.json` | Synthetic scores and controls reach a provisional Level 3 candidate ceiling, but authority stays `NOT_GRANTED`, separate execution authorization remains required, and production authorization stays `NO`. |
| `production-authorization-attempt.json` | Schema rejects an attempt to set `production_authorized` to `YES`. |
| `agent-claims-verified-evidence.json` | Schema rejects an agent's claim that evidence is verified. |
| `no-forbidden-action.json` | Evaluator fails closed at Level `0` when forbidden actions are absent. |
| `missing-escalation-safe-state.json` | Schema rejects a missing safe state. |
| `missing-escalation-path.json` | Evaluator blocks Level 2 because no escalation owner and response are defined. |

All evidence in these fixtures is synthetic and labeled as such. No credentials, customer records, or real evidence are included. The current validator is not a secret-scanning tool; keep secrets out of candidate manifests before validation.

```text
ENTITY: examples/autonomy-readiness/
ROLE: Public-safe fictional examples and negative candidate fixtures
OWNER: Hitsuyo Aku
STATUS: draft
CLASSIFICATION: public
APPROVAL_PATH: issue-and-pull-request
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
```
