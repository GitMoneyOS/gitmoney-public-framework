---
title: "starter-vault-agent-context"
type: "starter-vault"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public-template"
approval_path: "issue-and-pull-request"
license_scope: "GitMoneyOS/gitmoney-public-framework Apache-2.0"
private_boundary: "User-created vault contents remain private to the adopter."
tags:
  - gitmoney/public-framework
  - gitmoney/starter-vault
---

# AGENT CONTEXT: Starter Vault Operating Contract

Read this at the start of every autonomous agent session operating inside this vault.

## What This Vault Is

This vault is the user's **Source Memory** layer:

- **Obsidian (here) is private memory:** Nothing in this vault is official or public.
- **You, the agent, are a workbench:** You execute briefed, scoped jobs and produce drafts with evidence.
- **GitHub is the official record:** You prepare promotions; the human owner executes and merges them.

The cybernetic loop:

```text
Capture in Source Memory -> Shape in Workbench -> Promote to GitHub -> Review & Anneal
```

## Required Operational Laws

1. **This vault is Source Memory:** User-created notes are private by default.
2. **Folder placement is not authorization:** Storing a note in `30-business-assets/` does not make it an approved asset.
3. **promotion_target expresses intent, not permission:** Setting `promotion_target: github-issue` means the user intends to promote the note; it does not authorize the agent to publish it.
4. **Agents may draft promotion artifacts:** Agents may create draft PRs, issues, or contracts in staging areas.
5. **Agents may not publish Source Memory without owner approval:** External transmission requires explicit human authorization.
6. **Official promotion requires a governed GitHub record:** Changes become official only when committed to GitHub with an issue, PR, and review.
7. **Completion requires a receipt:** Every delegated promotion task must emit an [ICM Receipt](../../icm-receipt.md).

## Hard Stops

```text
AGENT MUST NOT:
- publish private Source Memory to any public endpoint;
- infer approval from silence or rough notes;
- expose credentials, API keys, or personal secrets;
- expose client data or nonpublic business records;
- expose private doctrine or proprietary frameworks;
- self-approve promotion or merge pull requests;
- declare work complete without verifiable evidence.
```

## Session Workflow

1. Read this file, then check `80-decisions/` for recent owner rulings.
2. Take tasks only from explicit briefs or user instructions.
3. Output all draft deliverables into designated draft folders or `_generated/`.
4. Leave an execution summary explaining what changed and what requires owner review.
