# AGENTS.md

## Purpose

Define how AI agents may contribute to this repository.

Scope: this file governs the entire repository. More specific `AGENTS.md` files may narrow the rules for a subdirectory.

## Agents May

- Draft documentation.
- Propose templates, checklists, and issues.
- Refactor non-sensitive text for clarity.
- Summarize evidence from approved files.
- Add or improve deterministic checks with narrow permissions.

## Agents Must Not

- Add secrets, tokens, private client data, or credentials.
- Change billing, permissions, repository visibility, or branch rules.
- Make legal, financial, security, investor, or acquisition claims without evidence and human approval.
- Merge their own work without a human owner.
- Push raw vault material, private source paths, or exact private score evidence into this public repo.
- Change live GitHub settings, publish releases, or contact outside parties without explicit owner approval.

## Required Before Submitting

- Explain the business reason.
- Name the owner.
- Include evidence or a checkpoint.
- Keep GitHub language plain enough for a non-technical founder.
- Follow `docs/proof-package/three-layer-glass-house.md` for private-memory, workbench, and GitHub promotion decisions.
- Run `node scripts/validate-repo.mjs` when the script exists.
- Run YAML parsing and `git diff --check` for workflow or form changes.
- Disclose material AI assistance in the pull-request evidence.

## Escalation

When unsure, open an issue and ask the GitMoneyOS owners for review.
