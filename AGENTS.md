---
title: "agents"
type: "public-framework"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
---

# AGENTS.md

## Purpose

Define how AI agents may contribute to this repository.

## Plain-English Job

Set hard boundaries on autonomous agent execution. Agents may propose drafts and run local checks, but cannot self-approve, merge, deploy, or expose private client data.

## Agents May

- Draft documentation.
- Propose templates, checklists, and issues.
- Refactor non-sensitive text for clarity.
- Summarize evidence from approved files.
- Run read-only lint and verification scripts.

## Agents Must Not

- Add secrets, tokens, private client data, or credentials.
- Change billing, permissions, repository visibility, or branch rules.
- Make legal, financial, security, investor, or acquisition claims without evidence and human approval.
- Merge their own work without a human owner decision.
- Deploy to any runtime environment.
- Expose private Mothership doctrine or CAC engine internals.

## Required Before Submitting

- Explain the business reason.
- Name the owner.
- Provide an ICM execution receipt.
- Report all checks run and their results.

## Conflict Resolution

- Evidence beats opinion.
- A verified check beats an unverified claim.
- When two proposals collide, preserve the state with higher verified evidence.

```text
ENTITY: AGENTS.md
ROLE: Agent operational governance and hard constraints
OWNER: Hitsuyo Aku
STATUS: active-public
CLASSIFICATION: public
APPROVAL_PATH: issue-and-pull-request
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
MACHINE_WRITE_LANE: Bounded branch pull requests only
```
