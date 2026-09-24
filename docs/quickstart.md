---
title: "quickstart"
type: "public-framework"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
  - quickstart
---

# GitMoney OS Quickstart: Step-by-Step AI Office Setup Guide

## Purpose

Provide a rapid, step-by-step setup guide for founders, operators, and developers adopting the GitMoney OS open operating skeleton.

## Plain-English Job

Guide a founder from a blank folder to a functioning, governed AI Office with explicit agent boundaries, an owner cockpit, an execution contract, and a verified audit receipt step-by-step.

## Prerequisites

Before beginning, ensure you have:

1. A GitHub account and a new empty repository (public or private).
2. A local terminal with `git` and `node` (v18+) installed.
3. Your preferred AI coding assistant or workbench (Codex, Antigravity 2, or Claude Code).

> [!NOTE]
> Private GitMoney skills are not required to adopt this quickstart. The public framework includes [`starter/.agents/skills/gitmoney-public-operator/`](../starter/.agents/skills/gitmoney-public-operator/SKILL.md), allowing any capable agent to operate the skeleton safely.

## Two Canonical Adoption Paths

The GitMoney OS framework provides two explicit paths to adopt the open operating skeleton:

```text
PATH A: NEW PROJECT (Start Fresh)
node scripts/gitmoney.mjs init <dir> [--with-vault]
       |
       v
Complete AI Office scaffold + optional private Source Memory vault

PATH B: EXISTING PROJECT (Adopt into Existing Repo)
cd your-existing-project/
node path/to/scripts/gitmoney.mjs init --here
       |
       v
Adds AGENTS.md, 00_COCKPIT.md, gitmoney.yaml, and public operator
```

---

### Path A: New Project (Start Fresh)

Use this path if you are building an AI Office from scratch:

```bash
# Clone the public framework
git clone https://github.com/GitMoneyOS/gitmoney-public-framework.git
cd gitmoney-public-framework

# Initialize a new project directory with optional Source Memory vault
node scripts/gitmoney.mjs init ../my-ai-office --with-vault
cd ../my-ai-office
```

This scaffolds the full three-room architecture:
- `vault/`: Obsidian-compatible private thinking room (Source Memory).
- `.`: Governed AI Office workbench repository.

---

### Path B: Existing Project (Adopt in Existing Repo)

Use this path if you already have an active code or documentation repository:

```bash
# From within your existing repository root
node /path/to/gitmoney-public-framework/scripts/gitmoney.mjs init --here
```

Preflight collision detection ensures existing files are never overwritten without an explicit `--force` flag.

This non-destructively adds:
- `AGENTS.md` (agent rules and boundary contract)
- `00_COCKPIT.md` (owner decision dashboard and WIP limit ledger)
- `gitmoney.yaml` (pinned project manifest)
- `.agents/skills/gitmoney-public-operator/SKILL.md` (thin public operator)
- `01_research/`, `02_architecture/`, `03_build/`, `_generated/` (governed lanes)

The resulting folder structure organizes work into distinct rooms:

```text
my-ai-office/
├── AGENTS.md             # Rule layer: what agents may and may not touch
├── 00_COCKPIT.md         # Owner layer: active priorities and decisions
├── 01_research/          # Intake layer: source notes and raw problem capture
├── 02_architecture/      # Plan layer: interface specs and decisions
├── 03_build/             # Build layer: bounded implementation work
├── .agents/skills/       # Skill layer: reusable tool and task instructions
└── _generated/           # Staging layer: unreviewed draft outputs
```

## Step 2: Establish Agent Boundaries in AGENTS.md

Open `AGENTS.md` and define what autonomous agents are authorized to perform and what actions are strictly forbidden.

Key invariants to declare:

- **May do:** Draft documentation, run local tests, summarize evidence, propose pull requests.
- **Must not do:** Push directly to the main branch, modify billing, expose credentials, or make unevidenced commercial claims.

See [`templates/AGENTS.md`](../templates/AGENTS.md) for the copy-paste template.

## Step 3: Initialize 00_COCKPIT.md as Owner Ground Truth

`00_COCKPIT.md` is the human owner dashboard. It prevents you from becoming a human router for every operational exception.

Configure your cockpit with three core sections:

1. **Owner Decision Queue:** Decisions requiring executive sign-off before promotion.
2. **Active Work-in-Progress (WIP):** Hard limit of maximum 3 concurrent tasks in execution.
3. **Receipt Ledger:** Cryptographic hashes or commit links for completed work.

See [`templates/00_COCKPIT.md`](../templates/00_COCKPIT.md) for the ready-to-use template.

## Step 4: Issue Your First Bounded Task with an ICM Contract

Before prompting an AI agent to execute a non-trivial task, create an **ICM Execution Contract**:

1. Copy [`templates/icm-execution-contract.md`](../templates/icm-execution-contract.md) to `02_architecture/contracts/TASK-001.md`.
2. Fill in:
   - **Job to be Done:** Exactly what needs to happen.
   - **Business Reason:** Why this matters now.
   - **Allowed Context:** Specific files the agent is allowed to read.
   - **Forbidden Changes:** Boundaries the agent must not breach.
   - **Expected Output:** The exact artifact to produce.

Point your AI assistant directly to `TASK-001.md`:

```text
Read 02_architecture/contracts/TASK-001.md.
Follow all constraints and produce only the specified output in _generated/.
Do not touch any files outside the allowed context.
```

## Step 5: Close the Loop with an ICM Receipt

When the agent finishes its bounded work:

1. Copy [`templates/icm-receipt.md`](../templates/icm-receipt.md) to `03_build/receipts/RECEIPT-001.md`.
2. Record what changed, which verification checks passed, and any remaining uncertainties.
3. Package the work and receipt into a branch pull request for human review.

```bash
git checkout -b task/001-initial-workflow
git add _generated/ 03_build/receipts/
git commit -m "feat(workflow): implement task 001 with verified receipt"
git push origin task/001-initial-workflow
```

## Step 6: Run Repository Doctor

Run the aggregated governance doctor to verify structure, classification, link integrity, and manifest health:

```bash
# Run the unified GitMoney doctor
node scripts/gitmoney.mjs doctor
```

See [`docs/compatibility-policy.md`](compatibility-policy.md) for version evolution, schema versioning, and pre-1.0 migration guidance.

Individual verification tools can also be run directly:
- `node scripts/classification-guard.mjs`: Verifies zero restricted classification tags.
- `node scripts/copy-rail-checker.mjs`: Verifies zero em dashes and zero buzzwords.
- `node scripts/link-checker.mjs`: Verifies all relative links resolve.

## Summary Checklist

- [ ] Folder structure copied from `/starter`.
- [ ] `AGENTS.md` defines hard boundaries and permitted actions.
- [ ] `00_COCKPIT.md` tracks active decisions and enforces WIP limits.
- [ ] Pre-work tasks are bounded by an ICM execution contract.
- [ ] Completed tasks produce an inspectable ICM receipt.
- [ ] Verification scripts pass with zero errors.

## When You Need Paid Architecture

This quickstart establishes the public open skeleton. When your company requires:

- forensic investigation of deep founder bottlenecks;
- multi-agent orchestration and private skill authoring;
- forward-deployed installation of proprietary revenue systems;
- ongoing cybernetic governance and drift control;

Review the [Commercial Translation](commercial-translation.md) guide or apply directly for the **$20,000 Identity Forensics Audit** with Hitsuyo Aku.

```text
ENTITY: quickstart.md
ROLE: Step-by-step setup guide for the open operating skeleton
OWNER: Hitsuyo Aku
STATUS: active-public
CLASSIFICATION: public
PRIMARY_PAID_ENTRY: Identity Forensics Audit ($20,000)
BOUNDED_PAID_DIAGNOSTIC: Architecture Sprint ($7,500)
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
```
