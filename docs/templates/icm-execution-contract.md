---
title: "icm-execution-contract"
type: "public-template"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
  - icm
  - execution-contract
  - public/template
---

# ICM Execution Contract

## Plain-English Job

This contract tells a person or AI agent exactly what it is allowed to touch before any work begins.

If a task lacks an execution contract, delegation rapidly degrades into unreviewed guessing.

## When to use this

Use this contract before delegating any multi-step task, architectural change, documentation update, or automated code modification to an AI agent or human contributor.

Interpretable Context Methodology (ICM) organizes context, stage contracts, artifacts, and handoffs for a bounded job. This template is a public-safe implementation pattern. It does not grant system access, override technical permissions, or replace human executive approval.

## Contract fields

| Field | Purpose | Example |
|---|---|---|
| Job to be Done | Clear, plain-English objective | Update README navigation links |
| Business Reason | Why this matters to operations | Reduce cold-reader bounce rate |
| Designated Owner | Accountable human executive | Hitsuyo Aku |
| Acting Party | Who executes the change | Codex / Subagent |
| Allowed Context | Explicit source documents permitted | `README.md`, `START-HERE.md` |
| Forbidden Boundaries | Strict non-goals and off-limit files | No credential changes, no edits outside docs |
| Expected Output | Deliverable format | Pull request with verified links |
| Verification Criteria | Checks required before handoff | 0 broken links, 0 em dashes |

## Authorized changes

Fill in the permitted actions:

```text
ALLOWED_OPERATIONS:
- Propose documentation updates via branch pull requests.
- Run local lint, check, and verification commands.
- Summarize public evidence from approved source files.
- Add machine-readable extraction blocks.
```

## Forbidden changes

```text
FORBIDDEN_OPERATIONS:
- No commits directly to the main protected branch.
- No inclusion of credentials, tokens, or private keys.
- No publication of confidential client data.
- No unilateral claim expansion or license alteration.
- No deployment or external webhook execution.
```

## Inputs

List the approved context files:

```text
APPROVED_CONTEXT_INPUTS:
- File 1: [path to input file]
- File 2: [path to input file]
- Constraints: [owner-defined limits]
```

## Outputs

```text
EXPECTED_OUTPUT_ARTIFACTS:
- Pull Request: [Branch name]
- Changed Files: [List of target files]
- Execution Receipt: [Link or text of completed ICM receipt]
```

## Handoff

```text
NEXT_REVIEWER: [Owner / Executive Reviewer]
NEXT_STAGE: [Verification -> Owner Decision]
ROLLBACK_PLAN: [Git revert / branch deletion command]
```

## Verification

Run the following checks before requesting owner review:

- [ ] Content claim review: claims match evidence.
- [ ] Data boundary review: no private or confidential data exposed.
- [ ] Link integrity check: all relative links resolve.
- [ ] Classification review: frontmatter classification is `public`.
- [ ] Copy rails check: zero em dashes and zero marketing fluff.
- [ ] Automated CI checks: passing locally.

```text
ENTITY: icm-execution-contract.md
ROLE: Pre-work execution boundary and delegation contract
OWNER: Hitsuyo Aku
STATUS: active-public
CLASSIFICATION: public
APPROVAL_PATH: issue-and-pull-request
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
```
