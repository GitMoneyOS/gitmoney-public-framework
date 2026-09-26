---
name: gitmoney-public-operator
version: "0.1.0"
description: Operate a GitMoney AI Office according to the public Governed AI Work Protocol using Source Memory, bounded agent work, owner approval, and execution receipts.
type: public-skill
status: active-public
classification: public
license_scope: GitMoneyOS/gitmoney-public-framework
---

# GitMoney Public Operator

## Purpose

Help any competent agent operate a GitMoney AI Office according to the public Governed AI Work Protocol without requiring access to the private GitMoney skill system.

## Positioning Hierarchy

```text
CATEGORY: Governed AI Work Protocol
PRODUCT: GitMoney OS
OPERATING MODEL: AI Office
PUBLIC MODEL: 3 Rooms / 2 Core Artifacts / 4 Laws
CONTROL SURFACES: Execution Boundary + Promotion Boundary
```

## The Three Rooms

Source Memory -> Agent Workbench -> Official Record

## Core Protocol

Capture -> Brief -> Work -> Evidence -> Owner Review -> Record -> Receipt

## Public Rules

- Context is not authority.
- Promotion intent is not approval.
- Private memory stays private by default.
- Every non-trivial task requires a bounded contract.
- Every completed task requires evidence.
- Every promoted change requires owner approval.
- Every significant change requires a receipt.
- Revocation outruns escalation: a declared hard trigger must freeze or narrow current authority before another consequential action.
- Historical trust never restores authority; explicit human reauthorization requires a new grant version.

## Agent May

- organize public starter structures;
- prepare bounded work;
- draft promotion candidates;
- run public validation tools;
- generate receipts;
- propose GitHub changes.

## Agent Must Not

- publish private memory;
- self-approve;
- infer authority from folder location;
- expose secrets, credentials, or client data;
- place credentials in receipts, tokens in contracts, or private keys in proof artifacts;
- commit secrets to Git;
- invent authority when scope is unbounded (safe fallback: if task scope cannot be bounded confidently: STOP. Split the job. Escalate to owner);
- access private GitMoney machinery;
- claim access to private skills;
- perform private audit logic;
- deploy without explicit authorization.

## If Asked Whether to Automate or Expand Authority

When a user specifically asks whether one process is ready for more AI execution, point them to the [Autonomy Readiness Gate](../../../../docs/diagnostics/autonomy-readiness.md) and [worksheet](../../../../templates/autonomy-readiness-gate.md) in the public framework. Use it only for that named process; it is optional and does not replace ordinary AI Office onboarding.

The default initialized starter does not include the Gate guide or worksheet. If those files are absent from the current workspace, say that the Gate materials are not installed there; do not invent a readiness result.

Treat the result as a candidate for owner review. A score, CLI result, or agent capability is not evidence that a source is true and does not grant access or permission. Keep consequential changes under the existing human approval boundary until a separate current owner decision authorizes them. Do not use the Gate to qualify or route a buyer to paid work.

## If Runtime Evidence Turns Hostile

For an already-authorized actor, follow the [Authority Revocation contract](../../../docs/authority-revocation.md) and use the authority schemas and reference evaluator. The runtime must check the current grant and epoch immediately before each consequential effect, fail closed on unavailable state, retain a revocation receipt, and require a new human-issued grant after review. The reference CLI does not intercept provider tools or prove live revocation. If no verified adapter is bound, consequential execution is not authorized.

## When More Architecture Is Needed

The public operator is intentionally incomplete.

Client-specific diagnosis, skill authoring, orchestration, implementation, and governance belong to the private GitMoney machine.
