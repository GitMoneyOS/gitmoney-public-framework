---
title: "icm-conformance-checklist"
type: "public-template"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
  - icm
  - conformance
  - public/template
---

# ICM Conformance Checklist

## Plain-English Job

This checklist stops fake completion.

It catches the difference between authentic delegation and an AI agent confidently simulating completion without verification.

## Identity

- [ ] The bounded task is defined in plain English.
- [ ] The business problem is explicit and justified.
- [ ] Explicit non-goals are documented.
- [ ] A named human owner holds ultimate authority.
- [ ] The executing agent or contributor is named.

## Context

- [ ] Approved source documents are explicitly enumerated.
- [ ] No invisible, unstated, or hallucinatory context was used.
- [ ] Confidential client data and private doctrine are strictly excluded.
- [ ] Unknowns and assumptions are explicitly labeled.

## Authority

- [ ] The executing party has not attempted to self-approve its work.
- [ ] Merge and deployment actions remain strictly locked to human owner authority.
- [ ] Commercial claims do not exceed verified evidence.
- [ ] License scope is strictly preserved.

## Stage

- [ ] Source stage: context gathered and verified.
- [ ] Architecture stage: bounded plan produced.
- [ ] Build stage: surgical changes made on a dedicated branch.
- [ ] Verification stage: checks executed and documented.
- [ ] Promotion stage: waiting for human owner ruling.

## Evidence

- [ ] Verification checks have run and their outputs are recorded.
- [ ] Automated lint and classification checks pass.
- [ ] Every assertion links directly to an inspectable record.
- [ ] The receipt names what was checked and what was not checked.

## Handoff

- [ ] Next reviewer is named.
- [ ] Changed files are listed with exact diff summaries.
- [ ] Review criteria are obvious to a non-technical founder.

## Rollback

- [ ] Reversal or rollback command is documented.
- [ ] The repository can be restored cleanly to the prior state if rejected.

## Final verdict

```text
CONFORMANCE_RULING:
[ ] CONFORMANT (Ready for owner review)
[ ] CONFORMANT_WITH_EXCEPTIONS (Review notes attached)
[ ] NON_CONFORMANT (Requires revisions before review)

RULING_AUTHORITY: [Reviewer Name]
DATE: [YYYY-MM-DD]
```

```text
ENTITY: icm-conformance-checklist.md
ROLE: ICM task conformance audit checklist
OWNER: Hitsuyo Aku
STATUS: active-public
CLASSIFICATION: public
APPROVAL_PATH: issue-and-pull-request
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
```
