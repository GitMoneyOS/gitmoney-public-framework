---
title: "founder-dependency-map"
type: "buyer-path"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/buyer-path
  - founder-dependency
---

# Founder Dependency Map

## Purpose

Map the buyer's operating wound to the public proof object and the paid path.

GitMoney OS should not make a serious buyer think, "Interesting repo."

It should make them think, "This is the shape of a problem I already have, and the public layer is only the visible skeleton."

## The core diagnosis

Founder dependency is not only a time-management problem.

It is usually a record, authority, context, handoff, and proof problem.

A founder becomes middleware when the business cannot reliably answer:

- where the source material lives;
- who owns the decision;
- what context is allowed;
- what stage the work is in;
- what evidence proves completion;
- who approves the next change;
- what breaks if the founder leaves the room.

GitMoney OS gives the buyer a public way to inspect those failure modes before paying for a private diagnosis.

## Founder as Middleware

Before GitMoney, the founder often becomes the toll booth every decision has to pass through:

```text
Client request
     |
     v
Contractor question -> Founder -> Delivery decision
Sales exception  ----> Founder -> Pricing decision
AI output        ----> Founder -> Approval decision
Ops issue        ----> Founder -> Priority decision
```

That is not leadership. That is a nervous system pretending to be infrastructure.

A governed record changes the shape of the work:

```text
Client request
     |
     v
Issue / PR / Receipt
     |
     +--> Owner reviews
     +--> Agent works inside bounds
     +--> Checks run
     +--> Decision recorded
     +--> Handoff survives the founder leaving the room
```

The founder still owns judgment.

The record stops making the founder carry every handoff in their skull.

## Pain to proof map

| If your business has this wound | Inspect this public proof | What the proof shows | Paid implication |
|---|---|---|---|
| The founder still carries too much judgment in their head. | Source Memory pattern in [`README.md`](../../README.md) and [`three-layer-glass-house.md`](../proof-package/three-layer-glass-house.md). | Knowledge needs a place to be captured before it becomes official. | The Audit finds where founder judgment must become architecture. |
| AI work is moving faster than approval. | [`AGENTS.md`](../../AGENTS.md), ICM templates, and PR approval packet rules. | Agent work needs bounded authority, allowed context, verification, and human review. | The Audit defines where AI can act, where it must wait, and what proof is required. |
| Nobody can prove what changed or why. | [`proof-of-work.md`](../proof-package/proof-of-work.md), public PRs, commits, and receipts. | GitHub can turn work into an inspectable business record. | The paid system installs receipt discipline around the client's actual workflows. |
| Handoffs break when a key person disappears. | [`exit-ready-score-self-assessment.md`](../exit-ready-score-self-assessment.md) and [`founder-verification-checklist.md`](../proof-package/founder-verification-checklist.md). | Handoff readiness depends on owners, evidence, access, lifecycle, and repeatable records. | The Audit identifies which handoffs are operationally fragile and why. |
| Approvals are implied instead of recorded. | [`proof-of-quality.md`](../proof-package/proof-of-quality.md) and pull request truth tests. | A decision is not official just because work exists. Approval needs a packet, owner, evidence, and next step. | Paid work creates the review and authority model for the real company. |
| The team has tools but no operating memory. | Three-room model: private notebook, agent workbench, company record. | Tools are rooms, not strategy. Each room needs a job and a boundary. | The Audit maps the client's tool sprawl into an operating architecture. |
| The company is creating more assets than it can govern. | Proof package, proof index, issue templates, and claim boundaries. | Output needs lifecycle, classification, review, and promotion rules. | Reconstruction installs the private machinery once the evidence supports the build. |
| The business wants AI leverage without AI fog. | ICM execution contract, receipt, and conformance checklist. | Every bounded job needs authority, context, handoff, check, and receipt. | The Sprint can answer one immediate architecture question; the Audit maps the larger system. |

## The buyer path

```text
1. Recognize the wound.
2. Inspect the matching proof artifact.
3. Ask whether the same discipline exists inside your company.
4. If the answer is no and the problem is expensive, apply for the Audit.
5. If the question is narrow, ask about the Architecture Sprint.
6. If the evidence warrants a build, scope Sovereign Reconstruction.
```

## What not to do

Do not treat GitMoney OS as a DIY checklist that automatically fixes the company.

Do not treat the Exit-Ready worksheet as a qualification engine.

Do not treat public GitHub mechanics as a substitute for access control, security review, client-specific governance, or owner decisions.

Do not copy the folder tree and pretend the operating system moved in. That is how people build a haunted filing cabinet and call it transformation.

## Commercial close

The free framework helps the buyer see the operating logic.

The paid Audit investigates whether their company can actually operate that way.

The public proof object shows the skeleton.

The paid work installs the private nervous system.