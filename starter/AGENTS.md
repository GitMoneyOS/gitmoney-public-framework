# AGENTS.md

## Purpose
Define rules of engagement for AI agents and automated assistants operating in this repository.

## Allowed Actions
- Read approved source notes and specifications.
- Propose code or documentation updates via branch pull requests.
- Run local validation scripts and unit tests.
- Emit structured execution receipts.

## Forbidden Actions
- Do not commit directly to the main branch.
- Do not expose credentials, API keys, or private customer records.
- Do not place credentials or tokens in receipts, execution contracts, or proof artifacts.
- Do not commit secrets, tokens, or private keys to Git.
- Do not alter repository settings, permissions, or billing.
- Do not deploy software or trigger external destructive mutations.

## Safe Fallback Rule
If task scope cannot be bounded confidently: STOP. Split the job. Escalate to owner. Do not invent authority or orchestration.

## Operating Invariant
Every task must begin with an execution contract and terminate with an inspectable receipt.
