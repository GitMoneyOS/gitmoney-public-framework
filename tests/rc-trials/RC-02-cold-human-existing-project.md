---
title: "RC-02: Cold Human / Existing Project Trial Kit"
type: "rc-evidence-kit"
trial_id: "RC-02"
status: "prepared-unverified"
classification: "public"
target_tag: "v0.9.0-beta.3"
target_sha: "0d25a7b17b44c2f725ac49bccd409f6b59e3390d"
---

# RC-02: Cold Human / Existing Project Trial Kit

## TRIAL_BRIEF

Evaluate whether an external developer adopting GitMoney OS into a pre-existing codebase using Path B (`init --here`) can integrate the operating skeleton non-destructively, preserve existing code and git history, pass downstream `doctor`, and execute an agent task without data loss or unintended overwrite.

## START_STATE

- An existing, active code repository (e.g. Node.js, Python, or Go project) with pre-existing commits, `package.json`, existing tests, and git history.
- Pre-existing files must include at least one potentially colliding file (e.g. existing `AGENTS.md` or custom instructions).

## ALLOWED_INPUTS

- Public GitMoney OS framework at tag `v0.9.0-beta.3`.
- `docs/quickstart.md` (Path B section).
- Downstream CLI command: `node path/to/scripts/gitmoney.mjs init --here`.

## FORBIDDEN_ASSISTANCE

- Zero author coaching or intervention.
- Zero modification of tester's pre-existing repository code by authors.

## JTBD

1. Adopt the framework using `init --here`.
2. Verify preflight collision detection aborts cleanly if an existing `AGENTS.md` is present, preserving bytes without silent overwrite.
3. Successfully complete adoption (using `--force` or non-colliding layout).
4. Run pre-existing tests to verify zero regressions in the host application.
5. Run `node scripts/gitmoney.mjs doctor` to verify the integrated governance layer.

## PASS_CONDITIONS

- Pre-existing files and git history preserved 100%.
- Collision guard protects existing files unless `--force` is explicitly passed.
- Pre-existing application test suite passes without defect.
- Integrated `doctor` passes with 0 errors.
- `CONFIGURED_SECRET_PATTERN_MATCHES = 0`.

## FAIL_CONDITIONS

- Host code breaks or files are silently overwritten.
- Downstream `doctor` reports missing schemas or broken paths.
- Tester requires author intervention to resolve path or version conflicts.

## EVIDENCE_ENVELOPE

Git diff of host repo before and after adoption, terminal output of collision preflight check, test suite execution logs, and completed trial receipt.

## OBSERVER_PROTOCOL

1. Document pre-existing repo layout and git commit hash before test.
2. Observe `init --here` execution and record stdout/stderr.
3. Verify no unexpected files were placed in host repo.
4. Record duration and friction points.

## RECEIPT_TEMPLATE

```json
{
  "trial_id": "RC-02",
  "tester_type": "COLD_HUMAN",
  "prior_exposure": "NONE",
  "tag": "v0.9.0-beta.3",
  "tag_sha": "0d25a7b17b44c2f725ac49bccd409f6b59e3390d",
  "start_time": "UNVERIFIED",
  "end_time": "UNVERIFIED",
  "completed": false,
  "author_interventions": 0,
  "failed_commands": 0,
  "doc_ambiguities": 0,
  "boundary_violations": 0,
  "three_layer_comprehension": "PARTIAL",
  "valid_contract": false,
  "valid_receipt": false,
  "owner_authority_understood": false,
  "private_skill_required": false,
  "data_loss": false,
  "silent_overwrite": false,
  "regression_found": false,
  "tester_notes": "Awaiting external trial execution.",
  "observer_notes": "Kit prepared.",
  "status": "UNVERIFIED"
}
```
