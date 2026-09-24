---
title: "promotion-rules"
type: "public-framework"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "Hitsuyo Aku"
tags:
  - vault/memory
---

# Promotion Rules

## Purpose

Define the rules and workflow for promoting work from Source Memory to the official GitHub record.

## Owner

Red Pillar and Hitsuyo Aku, under KnowTheLedge.

How work leaves private memory and enters the official record. This is the most consequential move in the system; it is deliberately slow.

## Preconditions

A note may be prepared for promotion only when all conditions are met:

1. `status: ready-to-promote`: It passed the asset test (owner, approval path, evidence, reuse path, lifecycle).
2. Its `promotion_target` names a real destination, not `none`.
3. Its `classification` has been deliberately set to `student-safe` or `public` by the owner. Notes marked `private` never promote.

## Promotion Targets

| Target | Becomes | Format |
|---|---|---|
| `github-issue` | A trackable task in the organization | Title, summary, why it matters, done-when, evidence field |
| `repo-doc` | A document in a repository | Clean Markdown, no vault-only syntax |
| `decision-log` | An official decision record | Decision, context, options considered, evidence, date, owner |
| `content` | A content asset for publishing | Per the content idea specification |
| `sop` | An official procedure | Numbered steps another person could run cold |
| `agent-brief` | A reusable brief in the official record | The brief, generalized, with usage notes |

## The Public Safety Check

Before any artifact is queued, scan it and strip or flag:

- Secrets, credentials, API keys, tokens, including realistic-looking examples.
- Private file paths, machine names, personal directory structures.
- Client names, client data, or anything identifying a third party without consent.
- Internal doctrine or notes classified `private` that the artifact quotes.
- Unsupported claims: revenue promises, tool-superiority claims, legal, security, investment, or acquisition claims.
- Wikilinks and vault-only syntax that would break outside Obsidian.

Anything flagged goes to the owner with the artifact: never silently removed, never silently shipped.

## The Hand-Off

1. Agent produces the artifact in the promotion candidate note.
2. Agent adds an entry to `_agent-context/OWNER_DECISION_QUEUE.md`: what, target, safety-check result, link.
3. Owner approves, revises, or rejects. **The owner executes the live GitHub action, or explicitly tells the agent to.** Default is owner-executes.
4. On promotion: note gets `status: promoted` and the official URL; a stub lands in `90-promoted-to-github/`; significant promotions get a decision entry in `80-decisions/`.

## What Never Promotes

Raw inbox captures, private doctrine notes, anything failing the asset test, anything classified `private`, and anything whose safety check found unresolved flags. No exceptions for enthusiasm.

## Private Machine Boundary

Advanced promotion scoring algorithms, automated cryptographic receipts, multi-repo release orchestration, and production deployment pipelines belong exclusively to the private GitMoney machine.
