---
title: "icm-receipt"
type: "public-template"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
  - icm
  - receipt
  - public/template
---

# ICM Receipt

## Plain-English Job

This receipt proves what actually changed after an AI agent or contributor finishes a task.

If work produces no receipt, "complete" is merely an assumption without evidence.

## When to use this

File an ICM receipt upon completing any pull request, code refactor, documentation architecture pass, or automated task before submitting it to the human owner for review.

A receipt is not a casual status update. It is an immutable business record documenting what changed, which checks passed, which failed, and what decision comes next.

## Receipt fields

```text
RECEIPT_HEADER:
  Artifact: [Name of artifact or feature]
  Job: [Summary of bounded task]
  Owner: [Accountable human executive]
  Executor: [Acting agent or developer]
  Date: [YYYY-MM-DD]
  Commit_SHA: [Git commit hash]
  Pull_Request: [PR URL or number]
  Status: [DRAFT | VERIFIED | OWNER_APPROVED | PROMOTED | HELD]
```

## What changed

| File / Surface | Modification Summary | Business Reason | Reviewer Impact |
|---|---|---|---|
| [Target File 1] | [What was added, modified, or removed] | [Operational justification] | [What to inspect] |
| [Target File 2] | [What was added, modified, or removed] | [Operational justification] | [What to inspect] |

## What passed

Document all verification gates that succeeded:

- [ ] Classification Guard: All modified files declare `classification: "public"`.
- [ ] Copy Rails: Zero em dashes and zero prohibited AI buzzwords.
- [ ] Link Integrity: 100% of relative markdown links resolve correctly.
- [ ] Frontmatter Schema: Valid YAML frontmatter present on all docs.
- [ ] Machine Extraction: Structured entity blocks present in all major files.

## What failed

Record any skipped checks, warnings, or failed assertions:

```text
FAILURES_AND_WARNINGS:
- None. (If any, record exact error message and rationale)
```

## What remains uncertain

Document any unresolved questions, assumptions, or items requiring human judgment:

```text
REMAINING_UNCERTAINTIES:
- Owner acceptance of the proposed copy framing.
- Confirmation of downstream repository compatibility.
```

## Next decision

Select the required human owner action:

```text
NEXT_OWNER_DECISION:
[ ] APPROVE_AND_MERGE
[ ] REQUEST_REVISIONS
[ ] HOLD_FOR_DUE_DILIGENCE
[ ] REVERT_AND_CLOSE

ROLLBACK_FIELD:
Command: git revert [COMMIT_SHA] -m 1
```

```text
ENTITY: icm-receipt.md
ROLE: Post-work verification and audit receipt template
OWNER: Hitsuyo Aku
STATUS: active-public
CLASSIFICATION: public
APPROVAL_PATH: issue-and-pull-request
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
```
