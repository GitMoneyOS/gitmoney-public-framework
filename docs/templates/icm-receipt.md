---
title: "icm-receipt"
type: "template"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - icm
  - receipt
  - public/template
---

# ICM Receipt

## Purpose

Record what happened after a bounded job completes.

A receipt is not a vibe, a status update, or an agent saying "done" because it got tired. A receipt is the business record of the change, the evidence, the checks, the exceptions, and the next decision.

## Receipt header

**Artifact:**

**Job:**

**Owner:**

**Approver:**

**Date:**

**Version / commit / PR:**

**Status:** draft / verified / owner-approved / promoted / held

## 1. Original job

```text
What was the bounded job?
```

## 2. Source context used

List the approved inputs:

- files;
- issues;
- PRs;
- owner notes;
- evidence packets;
- constraints;
- public-safe references.

## 3. What changed

| Surface | Change | Reason | Owner impact |
|---|---|---|---|
|  |  |  |  |

## 4. What did not change

Record important boundaries:

- deployment not authorized;
- merge not authorized;
- client data not touched;
- private source not exposed;
- claims not expanded;
- license/reuse rights not changed;
- owner decision not self-adopted.

## 5. Verification performed

| Check | Result | What it covers | What it does not cover |
|---|---|---|---|
|  |  |  |  |

## 6. Evidence

Include exact evidence:

- commit SHA;
- patch SHA;
- PR URL;
- test results;
- file hashes;
- screenshots where safe;
- link checks;
- claim review notes;
- owner ruling.

## 7. Exceptions and unresolved questions

| Item | Status | Decision needed |
|---|---|---|
|  |  |  |

## 8. Risk boundary

Safe claims:

```text
What the artifact can now claim.
```

Unsafe claims:

```text
What the artifact still cannot claim.
```

## 9. Next decision

One of:

```text
OWNER_REVIEW
REVISE
PROMOTE
MERGE
DEPLOYMENT_PREP
HOLD
```

## 10. Rollback or reversal path

```text
How do we undo or supersede this if needed?
```

## Done-when

A receipt is complete when a future operator can answer:

- what changed;
- why it changed;
- who approved it;
- what proof exists;
- what remains uncertain;
- what decision comes next;
- what must not be inferred from the change.