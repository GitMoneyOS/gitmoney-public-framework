---
title: "beta4-authority-revocation-change-receipt"
type: "candidate-proof"
owner: "Hitsuyo Aku"
status: "candidate-unreleased"
classification: "public"
approval_path: "independent-review-and-owner-release-decision"
promotion_target: "beta.4-release-review"
tags:
  - gitmoney/beta4
  - authority-revocation
  - execution-boundary
---

# ICM Execution Receipt: GitMoney beta.4 Authority Revocation

| Field | Value |
|---|---|
| Task | Add the Authority Revocation / Circuit Breaker primitive to the beta.4 candidate |
| Executor | Codex |
| Accountable owner | Hitsuyo Aku |
| Date | 2026-09-26 |
| Branch | `codex/autonomy-readiness-phase2` |
| Base commit | `2f0007f7736aebf46f3ffbdb49dd620c475b82d7` |
| Result | Local candidate prepared; release remains held |

## Purpose

Record the local candidate change that adds the Execution Boundary and Authority Revocation reference mechanism to GitMoney beta.4. This is evidence of local files and checks only. It is not proof of a running provider adapter, live authority revocation, or release approval.

## Change

- Added owner-issued grant, current runtime state, action request, trigger event, and revocation receipt schemas.
- Added a deterministic reference evaluator and trigger transition that emits a frozen next state, advances the authority epoch, and binds a SHA-256 digest to the receipt payload.
- Added action, resource, environment, data-class, consequence, spend, and human-approval checks against explicit ceilings.
- Added execution-contract and work-receipt fields, adopter guidance, starter parity, and the prepared RC-06 procedure.
- Preserved the three rooms and two core work artifacts. Added the fourth law: `Revocation outruns escalation`.

## Local verification performed

| Check | Result | Boundary |
|---|---|---|
| `node scripts/gitmoney.mjs doctor` | PASS | Candidate manifests, required files, classifications, links, source exposure, schema-version declarations, and configured secret patterns. One expected warning: candidate worktree has uncommitted changes before final commit. |
| `node scripts/copy-rail-checker.mjs` | PASS | Zero prohibited terms and zero em dashes in scanned Markdown. |
| `node scripts/link-checker.mjs` | PASS | 227 relative links resolved. |
| `git diff --check` | PASS | No whitespace errors. |
| `node --check` on changed JavaScript entry points | PASS | Syntax parsing only. |
| JSON parse of schema and template files | PASS | Syntax parsing only; not behavioral conformance. |

## Not established

- The reference evaluator does not intercept agent-platform tools, persist authority state, invalidate provider credentials, or atomically bind a decision to an external side effect.
- The post-commit RC-05 conformance and RC-06 isolated-runner checks are recorded in [`RC-05-RC-06-execution-receipt.md`](../../tests/rc-trials/RC-05-RC-06-execution-receipt.md). They do not establish provider-level enforcement.
- No scoped independent human content-review receipt, owner release ruling, publication, deployment, or live runtime verification is recorded.
- A receipt digest detects payload changes only when compared with a separately retained trusted digest; it is not a signature or proof that a trigger was correctly classified.

## Candidate disposition

`CANDIDATE / UNRELEASED / HOLD FOR REVIEW`. beta.3 remains the active public baseline. The beta.4 candidate must receive an independent review and fresh RC-05/RC-06 evidence before a separate owner release decision.

## Next owner action

Assign a reviewer for the required RC-05 content set, name the adopter runtime/provider for RC-06, and make a separate release ruling only after provider-boundary evidence and the remaining usability gap are dispositioned.
