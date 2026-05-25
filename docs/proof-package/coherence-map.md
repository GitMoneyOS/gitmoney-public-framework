# Coherence Map

## Purpose

Show how the recent GitMoneyOS work folds into one coherent public presentation without creating unnecessary repo sprawl.

Plain-English translation: this map explains where the proof lives and why it lives there.

## Minimal Repo Principle

GitMoneyOS uses six repos because each repo has a different business job.

Do not create a new repo unless the work needs a new owner, approval path, risk boundary, or audience.

| Business Job | Repo | Why It Belongs There |
| --- | --- | --- |
| Public thesis and proof | `gitmoney-public-framework` | This is the public front door founders can inspect. |
| Source doctrine and operating system | `gitmoney-os` | This is the private control room for strategy, skill, and governance. |
| Audit system | `gitmoney-audit-system` | This owns intake, scoring, reports, and self-audit artifacts. |
| Client delivery | `gitmoney-client-delivery` | This owns setup sprint, onboarding, handoff, and monthly review. |
| Content engine | `gitmoney-content-engine` | This owns public-safe lessons, posts, scripts, and case files. |
| SaaS/product layer | `gitmoney-saas` | This owns dashboard, Exit-Ready Score, data contracts, and product specs. |

## Recent Work Folded In

| Work Completed | Official Home | Public-Safe Surface |
| --- | --- | --- |
| Owner evidence: `redpillar75` active/admin and in `owners` | `gitmoney-os#2` | summarized as two active owner-level collaborators |
| First audit-kit review checklist | `gitmoney-audit-system#2` | summarized as founder-review checkpoint |
| Labels across all six repos | live GitHub repo settings | summarized as proof of governance taxonomy |
| Public framework topics | live public repo metadata | summarized as public discoverability |
| Public demo issue | `gitmoney-public-framework#2` | linked as public proof of issue-to-PR workflow |
| Founder readiness packet | `gitmoney-os#3` | summarized in proof package and presentation runbook |
| SaaS MVP brief | `gitmoney-saas#1` | summarized as product-layer proof, not shipped SaaS |
| Public founder walkthrough | `gitmoney-public-framework#3` | linked directly as public demo |
| Screen-checkpoint cleanup | `gitmoney-public-framework#4` | folded into founder presentation quality |
| Remediated master-standard audit | `gitmoney-os#5` | summarized as proof of quality and self-healing |
| GitMoneyOS self-audit | `gitmoney-audit-system#3` | summarized as public-safe self-audit |
| Monthly governor review | `gitmoney-os#6` | summarized as next governance action |

## Public Package Role

The public proof package does not duplicate private docs.

It translates the official work into five public-safe proofs:

- concept: the model makes sense
- work: the GitHub evidence exists
- quality: the system can audit and remediate itself
- curriculum: a founder can learn the operating path
- boundary: private doctrine stays private until approved

## Presentation Flow

Use this order:

1. Brand narrative: why this exists.
2. Proof of concept: what GitHub becomes for founders.
3. Proof of work: what has been built.
4. Proof of quality: how the work was audited and improved.
5. Self-audit summary: what GitMoneyOS found in itself.
6. Founder verification checklist: how an outsider can inspect the claim.

## Sprawl Check

Before adding future artifacts, ask:

- Is this public-facing or private doctrine?
- Which repo already owns this job?
- Does this need a new issue, PR, or just a link from an existing page?
- Is the artifact duplicating source material or summarizing it safely?
- Can a founder understand why it exists in under one minute?

If the answer is unclear, create an issue first instead of a new repo or folder.

## Current Coherence Verdict

The presentation surface is coherent:

- public proof lives in `gitmoney-public-framework`
- private doctrine stays in `gitmoney-os`
- audit proof lives in `gitmoney-audit-system`
- SaaS proof lives in `gitmoney-saas`
- delivery and content systems remain private until public-safe extraction is needed

The package is intentionally a doorway, not a mirror of every private room.
