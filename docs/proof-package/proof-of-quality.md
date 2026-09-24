---
title: "proof-of-quality"
type: "public-proof"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
  - gitmoney/proof
---

# Proof Of Quality

## Purpose

Define how GitMoney OS judges the operational and architectural quality of its own work.

## Plain-English Job

State the objective quality standards that every GitMoney OS artifact must satisfy before it can be merged into official company records, and show the audit trail proving that standard is enforced.

## Owner

Red Pillar and Hitsuyo Aku, under KnowTheLedge.

The quality bar is not "more documents." The quality bar is governed evidence that a founder or auditor can inspect.

## Quality Standard

Every meaningful GitMoney artifact must answer:

- What is the business reason?
- What layer does this belong to: memory, agent workbench, or company record?
- Who owns it?
- What is the explicit approval path?
- What evidence backs the claims?
- What remains uncertain?
- What is the next checkpoint?

## Approval Packet Truth Test

A pull request functions as an authentic approval packet only if a founder or reviewer can answer:

- What changed?
- Why did it change now?
- Who reviewed the work?
- What checks were executed?
- What is the rollback path if this fails?
- What decision is required next?

If any of those answers are missing, the work is not ready for promotion.

## Remediation Trail & Governance

GitMoney OS enforces continuous self-healing:

1. **Detection:** Operational gaps and copy drift are flagged in issues or audit reports.
2. **Quarantine:** Unverified claims are quarantined until evidence is provided.
3. **Remediation:** Surgical pull requests close the gap and introduce regression fixtures.
4. **Verification:** Machine checks (classification guard, copy linter) verify compliance.
5. **Receipt:** An ICM receipt is recorded before merge.

See [`HEALING-DASHBOARD.md`](../../HEALING-DASHBOARD.md) for the active remediation record.

```text
ENTITY: proof-of-quality.md
ROLE: Quality standard and approval packet truth test specification
OWNER: Hitsuyo Aku
STATUS: active-public
CLASSIFICATION: public
APPROVAL_PATH: issue-and-pull-request
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
```
