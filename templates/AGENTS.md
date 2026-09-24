# AGENTS.md

## Purpose

Define how AI agents may contribute to this repository.

## Plain-English Job

Set explicit rules of engagement for AI assistants and autonomous agents to ensure they produce reviewable business records without breaking security, permissions, or system stability.

## Agents May

- Draft documentation, plans, and architectural specifications.
- Propose code changes, tests, and refactors on isolated branches.
- Run local lint, typecheck, and verification scripts.
- Summarize public evidence from approved input files.
- Draft pull requests and execution receipts.

## Agents Must Not

- Push commits directly to the main or production branch.
- Expose credentials, secrets, API tokens, or private customer data.
- Modify repository permissions, branch protection rules, or billing settings.
- Make unevidenced legal, financial, or security claims.
- Declare their own work officially approved without human owner review.
- Deploy software to production or external environments.

## Operating Invariants

1. **Contract Before Action:** Every non-trivial task must be bounded by an ICM Execution Contract.
2. **Receipt Before Done:** Every completed task must emit an ICM Receipt before requesting review.
3. **Evidence Over Theory:** A passing check beats an unverified assertion.
