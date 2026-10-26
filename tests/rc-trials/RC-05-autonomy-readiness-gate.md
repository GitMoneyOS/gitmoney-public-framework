---
title: "RC-05: Autonomy Readiness Gate Candidate Trial"
type: "rc-evidence-kit"
trial_id: "RC-05"
status: "partially-executed"
classification: "public"
target_version: "0.9.0-beta.4"
target_tag: "NOT_CREATED"
target_sha: "UNBOUND_UNTIL_REVIEWED_COMMIT"
---

# RC-05: Autonomy Readiness Gate Candidate Trial

## TRIAL_BRIEF

Verify that the beta.4 Autonomy Readiness Gate applies its owner-confirmed scoring rules consistently, exposes its evidence limits in plain language, and never turns a candidate score into execution or production authority.

This kit defines the candidate trial. Local results are recorded in [the RC-05/RC-06 execution receipt](RC-05-RC-06-execution-receipt.md) and its synthetic evidence files. It contains no independent content-review receipt, tag, or release approval.

## START_STATE

- Review and test the exact beta.4 candidate commit. Bind `target_sha` to that commit before recording results; do not use the branch name or version string as a substitute for a commit SHA.
- Use a clean downstream workspace initialized from that exact candidate where starter behavior is tested.
- Keep all evidence synthetic or public. Do not add customer data, process records, credentials, or private evidence locators to this repo.

## ALLOWED_INPUTS

- `docs/diagnostics/autonomy-readiness.md`
- `docs/diagnostics/autonomy-readiness-scoring-ruling.md`
- `templates/autonomy-readiness-gate.md`
- `schemas/autonomy-readiness.schema.json`
- `scripts/schema-validator.mjs` and `scripts/gitmoney.mjs`
- `examples/autonomy-readiness/`
- `starter/` and `tests/conformance.mjs`
- This RC-05 kit and the current `CHANGELOG.md`

## REQUIRED EVIDENCE

### A. Scoring-rule application

Record a five-check scoring worksheet case with these states: two checks have current supporting evidence; one is `NO`; one is `UNVERIFIED`; and one is missing or stale. Expected system score: `2/5`. Preserve the check IDs and evidence references in the private test record; publish only synthetic values.

The CLI accepts an aggregate score and system-level evidence status. It does not inspect per-check evidence truth. The test must compare the recorded aggregate against the worksheet calculation; it must not claim the CLI independently verified that mapping.

### B. Level 2 boundary matrix

The beta.4 conformance suite must include:

1. S1/S2/S3 scores `4/4/4` with usable evidence and all required action limits: Level 2 may be the maximum candidate level.
2. Each S1, S2, and S3 tested independently at `3` while the other two remain `4`: Level 2 is blocked in each case.
3. Unsupported, stale, conflicted, or absent evidence for any required system: its effective score is zero and Level 2 is blocked.
4. Missing/mismatched process owner, forbidden action, approval rule, spend or production limit, escalation path, safe state, or customer/identity boundary: Level 2 is blocked.
5. Pending, rejected, incomplete, or mismatched scoring-rule provenance: higher-level candidacy stays fail-closed.
6. For `permitted_tools_actions`, test an omitted field and an empty array; both must block Level 2 with `PERMITTED_TOOLS_NOT_DEFINED`. Independently set each of `read_permissions`, `write_permissions`, `data_boundary.allowed_data`, and `data_boundary.forbidden_data` to an empty array; each must block with its corresponding scope code. Blank-only strings must also fail schema or candidate evaluation. Also test a tool/action listed as both permitted and forbidden, and data listed as both allowed and forbidden; both conflicts must block with `ACTION_OR_DATA_SCOPE_CONFLICTED`. Restore a precise bounded scope and confirm the otherwise conformant `4/4/4` case can again reach a Level 2 candidate ceiling.

### C. Authority separation

Positive and negative CLI/schema cases must show all of these remain true regardless of score:

- `evidence_verified` stays `NO`;
- `authority_status` stays `NOT_GRANTED`;
- `separate_execution_authorization_required` stays `YES`;
- `production_authorized` stays `NO`.

A candidate result cannot approve the process owner, live access, or a production action.

The synthetic `capability-without-authority.json` fixture may return a provisional higher candidate ceiling while `authority_status` remains `NOT_GRANTED`; verify the explanation and authority fields do not imply permission.

### D. Package and regression checks

- Run the complete conformance suite after it contains the cases in sections A–C.
- Validate all three documented fictional examples and every negative fixture; record schema validity, maximum candidate level, verdict, blockers, and authority fields.
- Run `node scripts/gitmoney.mjs doctor` on the repo and on a clean initialized starter workspace.
- Confirm the existing ICM contract/receipt path and public onboarding routes still work after starter/CLI changes.
- Capture fresh relative-link, classification, private-source, and secret-scan results on the exact candidate commit.

### E. Content review

- Obtain a read-only review from a reviewer who did not author the Gate. Review the guide, scoring ruling, worksheet, examples, and RC-05 copy for clarity, accuracy, scope, privacy, and authority boundaries.
- Record AI fresh-context review separately from independent human content review. Neither one substitutes for owner release approval.
- The cold-founder usability test is declined for this candidate. Do not run it or claim usability findings. Record the missing usability evidence in any release decision.

## PASS_CONDITIONS

- Every required check in A–E has an inspectable result bound to the exact candidate commit.
- No Level 2 result appears when a required score, evidence status, owner, permitted tool scope, read/write scope, data boundary, or other action limit is missing.
- Scores never grant authority or change production state.
- Existing beta.3 RC-01 through RC-04 files remain unchanged and are not counted as beta.4 results; their current status is `prepared-unverified` and their target is beta.3.
- Any remaining review or usability gap is stated in the owner release decision.

## FAIL_CONDITIONS

- A missing/unverified item is counted as a point.
- A Level 2 case passes with any S1/S2/S3 below `4`, unsupported evidence, or incomplete tool, read/write, data, or other action limits.
- A score or validator result is represented as proof, authorization, or production readiness.
- Review findings are hidden, same-context self-review is presented as independent, or results cannot be tied to a commit.
- Beta.3 trial materials are rewritten to imply beta.4 coverage.

## EVIDENCE_ENVELOPE

Store the eventual internal receipt with the exact candidate SHA, test command outputs, fixture results, reviewer report and dispositions, doctor/scan results, exceptions, and owner release decision. Keep private worksheet evidence out of public repo artifacts.

## CURRENT_STATE

```text
PLAN_STATUS: PARTIALLY_EXECUTED
TARGET_SHA: 671cf67c02c1c68c555fbc2af8d04b9b2ad7c298
RULE_DECISIONS: OWNER_CONFIRMED (AR-SCORING-RULING-2026-09-24)
FRESH_CONTEXT_AI_REVIEW: NOT_RECORDED
HUMAN_INDEPENDENT_REVIEW: NOT_RECORDED_FOR_REQUIRED_ARTIFACT_SET
COLD_FOUNDER_TEST: NOT_IN_SCOPE; NO_RESULT_CLAIMED
RC_EVIDENCE: LOCAL_CHECKS_PASS; REVIEW_AND_OWNER_RELEASE_GATES_OPEN
RELEASE: HOLD
```
