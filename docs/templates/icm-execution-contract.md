---
title: "icm-execution-contract"
type: "template"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - icm
  - execution-contract
  - public/template
---

# ICM Execution Contract

## Plain-English Job

This contract tells a person or AI agent what it is allowed to touch before the work starts.

If the job has no contract, delegation turns into guessing with better typography.

## Purpose

Create a bounded execution contract before a person or agent acts.

Interpretable Context Methodology organizes context, stage contracts, artifacts, and handoffs for a bounded job. This template is a public-safe implementation pattern. It does not grant access, override technical permissions, or replace human approval.

## 1. Job to be done

**Plain-English job:**

```text
What needs to happen?
```

**Business reason:**

```text
Why does this matter now?
```

**Not the job:**

```text
What is explicitly out of scope?
```

## 2. Authority

**Requester:**

**Owner:**

**Approver:**

**Who may act:**

**Who may not act:**

**Decision required before promotion:**

```text
No change becomes official just because it was generated.
```

## 3. Allowed context

Use only:

- approved source files;
- linked issues or PRs;
- named evidence packets;
- public-safe examples;
- owner-provided constraints;
- repo-local instructions.

Do not use:

- secrets;
- client data;
- private source doctrine;
- unapproved claims;
- unstated assumptions;
- inaccessible memory;
- screenshots or documents not included in the task.

## 4. Stage contract

| Stage | Input | Work allowed | Output | Reviewer |
|---|---|---|---|---|
| Source | observed problem, request, evidence | clarify scope and authority | execution contract | owner |
| Architecture | approved context | propose smallest safe plan | plan/spec | owner or reviewer |
| Build | approved plan | make bounded change | draft artifact or branch | reviewer |
| Verification | changed artifact | run checks and inspect claims | receipt | System 3* / reviewer |
| Promotion | verified artifact | request decision | owner ruling | System 5 / owner |

## 5. Constraints

**Must preserve:**

- claim boundaries;
- source attribution;
- data boundaries;
- license/reuse boundaries;
- owner decision rights;
- rollback path.

**Must not:**

- invent evidence;
- expose private material;
- convert draft to official without approval;
- merge, deploy, or publish without explicit authorization;
- treat a tool result as a business decision.

## 6. Expected output

Output format:

```text
What artifact should exist when the job is complete?
```

Acceptance criteria:

```text
What must be true before this is accepted?
```

Evidence required:

```text
What will prove the work was done?
```

## 7. Verification

Checks to run:

- content claim review;
- data boundary review;
- link/path review;
- classification/frontmatter review;
- test or lint checks where applicable;
- owner-decision boundary review.

Verification must state what the checks cover and what they do not cover.

## 8. Receipt

The final receipt must include:

- artifact name;
- version or commit;
- changed files;
- evidence used;
- checks run;
- exceptions;
- remaining risk;
- next decision;
- rollback or reversal path.

## Done-when

- Authority is explicit.
- Context is bounded.
- Handoffs are named.
- Verification is recorded.
- Unknowns remain visible.
- Promotion requires a separate owner decision.