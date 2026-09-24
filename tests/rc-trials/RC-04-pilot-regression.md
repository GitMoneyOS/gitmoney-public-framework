---
title: "RC-04: Pilot Regression Trial Kit"
type: "rc-evidence-kit"
trial_id: "RC-04"
status: "prepared-unverified"
classification: "public"
target_tag: "v0.9.0-beta.2"
target_sha: "0d25a7b17b44c2f725ac49bccd409f6b59e3390d"
---

# RC-04: Pilot Regression Trial Kit

## TRIAL_BRIEF

Evaluate whether the hardened `v0.9.0-beta.2` build preserves 100% of pilot value and operational utility established during early pilot deployments (e.g. Fictional Studio Co. and pilot student packs) while resolving all identified structural and verification defects.

## START_STATE

- Reference pilot project repository representing pre-beta.2 adoption (e.g. `examples/fictional-studio-co/` or pilot workspace).
- Pilot notes, contracts, and existing receipts intact.

## ALLOWED_INPUTS

- Hardened `v0.9.0-beta.2` framework scripts, schemas, and public operator.
- Pre-existing pilot assets and documentation.

## FORBIDDEN_ASSISTANCE

- Re-authoring pilot notes to force compliance with new checks.

## JTBD

1. Update or audit the pilot workspace using `v0.9.0-beta.2` tooling.
2. Run `node scripts/gitmoney.mjs doctor` in pilot workspace.
3. Verify all pilot workflows (briefing, bounded work, receipt generation) remain operable.
4. Verify no regression in readability, plain-language comprehension, or founder utility.

## PASS_CONDITIONS

- `PILOT_VALUE_BASELINE = PROVEN`.
- `HARDENED_BUILD_REGRESSION = PASS`.
- Downstream `doctor` passes cleanly on pilot workspace.
- Pre-existing pilot receipts remain valid and inspectable.
- Zero functional regression in pilot operating capabilities.

## FAIL_CONDITIONS

- Pilot workspace broken by hardened schemas or validator logic.
- Loss of backward compatibility with pilot-era contracts.
- Regressions in pilot utility.

## EVIDENCE_ENVELOPE

Pilot workspace audit log, doctor output, diff comparison against pilot baseline, and completed trial receipt.

## OBSERVER_PROTOCOL

1. Check out reference pilot workspace.
2. Execute `doctor` and record checks.
3. Verify each pilot claim against current behavior.
4. Record verdict and any compatibility exceptions.

## RECEIPT_TEMPLATE

```json
{
  "trial_id": "RC-04",
  "tester_type": "PILOT_COHORT_HUMAN",
  "prior_exposure": "PILOT_ADOPTER",
  "tag": "v0.9.0-beta.2",
  "tag_sha": "0d25a7b17b44c2f725ac49bccd409f6b59e3390d",
  "start_time": "UNVERIFIED",
  "end_time": "UNVERIFIED",
  "completed": false,
  "author_interventions": 0,
  "failed_commands": 0,
  "doc_ambiguities": 0,
  "boundary_violations": 0,
  "three_layer_comprehension": "YES",
  "valid_contract": false,
  "valid_receipt": false,
  "owner_authority_understood": true,
  "private_skill_required": false,
  "data_loss": false,
  "silent_overwrite": false,
  "regression_found": false,
  "tester_notes": "Awaiting pilot cohort re-evaluation.",
  "observer_notes": "Kit prepared.",
  "status": "UNVERIFIED"
}
```
