---
name: gitmoney-public-operator
version: "0.1.0"
description: Operate the GitMoney OS open-source skeleton using Source Memory, bounded agent work, owner approval, GitHub records, and verification receipts.
type: public-skill
status: active-public
classification: public
license_scope: GitMoneyOS/gitmoney-public-framework
---

# GitMoney Public Operator

## Purpose

Help any competent agent operate the public GitMoney OS skeleton safely without requiring access to the private GitMoney skill system.

## The Three Layers

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

## When More Architecture Is Needed

The public operator is intentionally incomplete.

Client-specific diagnosis, skill authoring, orchestration, implementation, and governance belong to the private GitMoney machine.
