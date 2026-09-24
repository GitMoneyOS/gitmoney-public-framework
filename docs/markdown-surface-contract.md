---
title: "markdown-surface-contract"
type: "public-framework"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
  - documentation-architecture
---

# GitMoney OS Markdown Surface Contract

## Purpose

Declare how each public GitMoney OS Markdown surface must be structured for human comprehension, agent extraction, and GitHub-native rendering.

Documentation in GitMoney OS is not passive prose. It is version-controlled business infrastructure. Every file operates as a cognitive surface that must orient the reader, answer an explicit job to be done, provide machine-extractable parameters, and protect private machinery.

## Plain-English Job

Specify the exact design rules, reading layers, table structures, and machine extraction formats for every public Markdown file in this repository.

## The Eight Surface Invariants

Every public Markdown surface must answer these eight questions:

1. **Who is this for?** Explicit primary reader (cold buyer, operator, executive, contributor, or agent).
2. **What job does this page perform?** Singular, unambiguous job to be done.
3. **What should the reader understand in 30 seconds?** Immediate cognitive anchor.
4. **What decision does this page support?** Actionable choice or routing gate.
5. **What should a human do next?** Defined next inspection or engagement step.
6. **What should an agent extract?** Typed YAML frontmatter, tables, or fenced status blocks.
7. **What must not be exposed?** Proprietary CAC, client data, private doctrine, and credentials.
8. **What GitHub Markdown structure fits best?** Semantic headings, tables, alerts, and code fences.

## Surface Audit: Root Navigation Surfaces

| Surface | Primary Reader | Job | Markdown Techniques | Machine Extraction | Success Criteria |
|---|---|---|---|---|---|
| [`README.md`](../README.md) | Cold buyer / operator | Orient and route on first reading | Headings, inspection list, relative links, ASCII folder tree | Status block, commercial ladder parameters | Reader knows where to go clearly |
| [`START-HERE.md`](../START-HERE.md) | Cold founder / buyer | Diagnose operating wound | Plain-English job, visceral symptom bullets, 10-minute path | Entity status block, buyer routing | Reader recognizes fit or exits immediately |
| [`quickstart.md`](quickstart.md) | Founder / builder | Set up AI Office step-by-step | 6 sequential steps, folder breakdown, verification commands | Setup checklist, verification commands | Reader builds functioning repository following the step-by-step procedure |
| [`templates/starter-vault/`](../templates/starter-vault/README.md) | Founder / note-taker | Capture private Source Memory | 30-minute win, maturity ladder, agent context contract | Note frontmatter schema, promotion intent | User captures private ideas without public exposure |
| [`starter/`](../starter/README.md) | Operator / agent | Execute AI Office tasks | 3-room folder tree, WIP limits, bounded execution | Folder invariants, cockpit ledger | Team runs governed AI delegation on GitHub |
| [`gitmoney-public-operator`](../starter/.agents/skills/gitmoney-public-operator/SKILL.md) | AI Agent / operator | Operate open-source skeleton safely | 3-layer model, bounded rules, explicit permissions | Allowed/forbidden actions, non-authority rules | Agent operates skeleton without private skills |
| [`CONSULTING.md`](../CONSULTING.md) | Enterprise buyer | Translate open skeleton to paid ladder | Offer comparison table, scope descriptions, direct apply links | Price ladder, deliverable table, prerequisite rules | Buyer understands exact offer tiers and prices |
| [`CONTRIBUTING.md`](../CONTRIBUTING.md) | Contributor / agent | Govern open repository contributions | Branch naming convention, pull request checklist | Classification, approval path, write lanes | Zero classified files or bad links submitted |
| [`AGENTS.md`](../AGENTS.md) | AI agents / developers | Define agent execution boundaries | Plain-English job, permitted actions, hard prohibitions | Agent status block, write lane constraint | Agents cannot self-approve, merge, or leak secrets |

## Surface Audit: Architecture & Boundaries

| Surface | Primary Reader | Job | Markdown Techniques | Machine Extraction | Success Criteria |
|---|---|---|---|---|---|
| [`pol-vsm-icm-ifl-stack.md`](architecture/pol-vsm-icm-ifl-stack.md) | Architect / senior operator | Teach governance of 3-layer skeleton | 3 reading layers, Comprehension Ladder, stack tables | Architecture layer mapping, attribution | Reader grasps how POL, VSM, ICM, and IFL govern work |
| [`open-source-boundary.md`](open-source-boundary.md) | Legal / open-source user | Clarify Apache-2.0 boundary | Public vs private comparison tables, license warnings | License scope, commercial boundary | Prevents confusion between skeleton and private machinery |
| [`private-machine-boundary.md`](private-machine-boundary.md) | Enterprise buyer / auditor | Prove boundary discipline without leaking | Two-column tables, boundary warnings, forbidden examples | Disclosure bounds, primary paid entry | Reader trusts the boundary without seeing private organs |

## Surface Audit: Commercial & Buyer Paths

| Surface | Primary Reader | Job | Markdown Techniques | Machine Extraction | Success Criteria |
|---|---|---|---|---|---|
| [`founder-dependency-map.md`](buyer-paths/founder-dependency-map.md) | Founder trapped as middleware | Diagnose bottleneck and map to proof | ASCII before/after contrast, symptom-to-proof table | Symptom routing, paid implications | Founder recognizes self as middleware and views solution |
| [`commercial-translation.md`](commercial-translation.md) | Buyer / commercial reviewer | Map skeleton to commercial ladder | Service ladder tiers, buyer state routing table | Complete price schedule ($1.5k to $50k+) | Transparent commercial bridge without aggressive sales hype |

## Surface Audit: Proof Package Surfaces

| Surface | Primary Reader | Job | Markdown Techniques | Machine Extraction | Success Criteria |
|---|---|---|---|---|---|
| [`proof-package/README.md`](proof-package/README.md) | Skeptical operator | Navigate public proof evidence | 3-minute summary, 10-minute path, tool translation glossary | Verification directory, status block | Operator quickly finds relevant proof artifact |
| [`proof-index.md`](proof-package/proof-index.md) | Diligence auditor / founder | Map claims to GitHub evidence | Six-column claim-to-evidence table, safe vs unsafe claims | Direct GitHub proof links, proof levels | Every claim backed by evidence and explicit boundary |
| [`founder-verification-checklist.md`](proof-package/founder-verification-checklist.md) | Independent founder | Verify repo claims autonomously | Task lists across concept, work, and quality | Verification category table, status verdict | Founder completes independent audit in under 15 minutes |
| [`proof-of-work.md`](proof-package/proof-of-work.md) | Technical auditor | Prove production work history | Multi-repo topology table, PR links, commit trail | Repo visibility table, public PR numbers | Proves GitMoney OS was built and tested in production |
| [`proof-of-quality.md`](proof-package/proof-of-quality.md) | Governance reviewer | Prove quality standards and remediation | Approval packet truth test, remediation loop steps | Quality standards, remediation trail | Proves system repairs its own operational gaps |

## Surface Audit: Templates & Assessments

| Surface | Primary Reader | Job | Markdown Techniques | Machine Extraction | Success Criteria |
|---|---|---|---|---|---|
| [`icm-execution-contract.md`](templates/icm-execution-contract.md) | Agent / human delegate | Bound task scope before acting | Contract field table, authorized/forbidden fences | Task boundaries, input/output contracts | Eliminates hallucinated tasks and scope creep |
| [`icm-receipt.md`](templates/icm-receipt.md) | Reviewer / owner | Prove what changed after completion | Fillable receipt template, verification checkboxes | Changed files, passed/failed gates, rollback | Eliminates unverified claims of task completion |
| [`icm-conformance-checklist.md`](templates/icm-conformance-checklist.md) | QA auditor / subagent | Verify adherence to ICM contract | Structured task lists for Identity, Context, Authority | Pass/fail conformance ruling | Catches agent simulation before human review |
| [`exit-ready-score-self-assessment.md`](exit-ready-score-self-assessment.md) | Founder evaluating risk | Assess business knowledge health | 0-5 scoring scale, 8 dimensions table, fictional case | Readiness score bands, risk/action lists | Turns vague anxiety into an actionable asset |

## Global Readability & Typography Rules

All public documentation must adhere to these mechanical standards:

1. **Paragraph Density:** Maximum 1 to 3 sentences per paragraph. One conceptual idea per block.
2. **Copy Rails:** Zero em dashes (U+2014). Use hyphens (`-`), colons (`:`), or parentheses. Zero banned AI fluff words (`delve`, `tapestry`, `unlock`, `landscape`, `bespoke`, `elevate`, `foster`, `harness`, `crucial`, `vital`).
3. **Semantic Hierarchy:** Exactly one H1 per document. H2s for major structural divisions. H3s only for nested scannability.
4. **Link Integrity:** All internal links must use relative file paths. No absolute local paths, `file://` URIs, or broken references.
5. **Code Blocks:** All fenced blocks must declare language identifiers (`text`, `bash`, `yaml`, `json`, `mermaid`).
6. **Alert Restraint:** Maximum one GitHub alert per section. Never stack alerts.

## Human & Machine Extraction Interface

Every major document provides two parallel reading layers:

1. **Human Layer:** Visceral, plain-English prose structured for 90-second scanning and deep comprehension.
2. **Machine Layer:** Typed YAML frontmatter and fenced `text` entity blocks specifying:
   - `ENTITY`: Canonical filename or artifact identifier.
   - `ROLE`: Structural job within the architecture.
   - `OWNER`: Accountable human executive node (`Hitsuyo Aku`).
   - `STATUS`: Operating state (`active-public`).
   - `CLASSIFICATION`: Information security grade (`public`).
   - `PRIMARY_PAID_ENTRY`: Commercial routing anchor.
   - `MERGE_AUTHORIZED` / `DEPLOYMENT_AUTHORIZED`: Invariant execution locks (`NO`).

```text
ENTITY: markdown-surface-contract.md
ROLE: Public documentation architecture specification
OWNER: Hitsuyo Aku
STATUS: active-public
CLASSIFICATION: public
APPROVAL_PATH: issue-and-pull-request
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
```
