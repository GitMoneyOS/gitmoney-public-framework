---
title: "RC-01: Cold Human / New Project Trial Kit"
type: "rc-evidence-kit"
trial_id: "RC-01"
status: "prepared-unverified"
classification: "public"
target_tag: "v0.9.0-beta.2"
target_sha: "0d25a7b17b44c2f725ac49bccd409f6b59e3390d"
---

# RC-01: Cold Human / New Project Trial Kit

## TRIAL_BRIEF

Evaluate whether an external software engineer or technical founder with zero prior exposure to GitMoney OS can independently scaffold a fresh AI Office using Path A (`node scripts/gitmoney.mjs init <dir> --with-vault`), establish boundaries, author an ICM execution contract, execute a bounded task, produce a valid receipt, and achieve a passing `doctor` verdict without author assistance.

## START_STATE

- Clean operating environment (macOS, Linux, or Windows).
- Node.js (v18, v20, or v22) installed.
- Git installed.
- Zero prior GitMoney OS clone or private skill exposure.
- Working directory: empty temporary workspace.

## ALLOWED_INPUTS

- Public GitMoney OS repository at tag `v0.9.0-beta.2` (`0d25a7b17b44c2f725ac49bccd409f6b59e3390d`).
- `docs/quickstart.md`.
- `START-HERE.md` and `README.md`.
- CLI help: `node scripts/gitmoney.mjs --help`.
- Any standard commercial AI coding assistant (Codex, Claude Code, Antigravity, Cursor).

## FORBIDDEN_ASSISTANCE

- Zero intervention by framework authors or maintainers.
- Zero private skills or doctrine provided.
- Zero verbal explanations or debugging hints.
- The observer must remain silent unless the trial is aborted.

## JTBD

Establish a fully functioning, self-contained AI Office from scratch:
1. Clone the framework at tag `v0.9.0-beta.2`.
2. Run `node scripts/gitmoney.mjs init ../my-office --with-vault`.
3. Verify the generated downstream directory is self-contained.
4. Customize `AGENTS.md` boundaries and `00_COCKPIT.md` active priorities.
5. Create an execution contract `02_architecture/contracts/TASK-001.json` (or .md).
6. Execute the bounded job using an AI agent.
7. Emit an inspectable audit receipt in `03_build/receipts/RECEIPT-001.json`.
8. Run downstream `node scripts/gitmoney.mjs doctor` and verify `[DOCTOR PASSED]`.

## PASS_CONDITIONS

- Downstream `node scripts/gitmoney.mjs doctor` passes with 0 failures.
- Zero author interventions required.
- Downstream project operates without symlinks or references back to framework clone.
- `CONFIGURED_SECRET_PATTERN_MATCHES = 0`.
- Execution contract and receipt conform to Draft-07 schemas.
- Human tester demonstrates comprehension of the three layers (Source Memory, Agent Workbench, GitHub Record).

## FAIL_CONDITIONS

- Tester cannot complete setup without author intervention.
- Downstream `doctor` fails.
- Private skills or upstream paths required for downstream execution.
- Accidental secret commit or boundary violation.
- Ambiguity in documentation halts execution for >15 minutes.

## EVIDENCE_ENVELOPE

Record verbatim terminal logs, created contract file, created receipt file, git commit history, and the populated trial receipt below.

## OBSERVER_PROTOCOL

1. Record start timestamp.
2. Note every failed command and doc lookup.
3. Note any moment of confusion or hesitation.
4. Record finish timestamp.
5. Verify downstream doctor output independently.

## RECEIPT_TEMPLATE

```json
{
  "trial_id": "RC-01",
  "tester_type": "COLD_HUMAN",
  "prior_exposure": "NONE",
  "tag": "v0.9.0-beta.2",
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
