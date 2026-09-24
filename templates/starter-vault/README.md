---
title: "starter-vault-readme"
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

# GitMoney OS Starter Vault

## Plain-English Job

Provide a clean, private Obsidian-compatible notebook scaffold where a founder or operator captures messy thoughts, sources, and rough drafts before anything becomes official.

## What This Is

This is the canonical **Source Memory starter scaffold** for the GitMoney OS ecosystem.

It is designed for personal note-taking applications (such as Obsidian) to serve as your private thinking layer. It provides numbered operational folders, note templates with maturity metadata, and an agent context contract.

## What This Is Not

- This is not the official business record.
- This is not the GitMoney OS agent workbench (see [`../../starter/`](../../starter/)).
- This is not a duplicate or replacement of the private Mothership cybernetic memory.
- This is not a requirement to run public GitMoney OS.

## The Three Rooms

GitMoney OS separates business knowledge into three distinct rooms:

```text
Private Memory (This Vault)
      |
      v  (promotion intent)
Agent Workbench (starter/)
      |
      v  (human approval & verification)
Official Record (GitHub)
```

1. **Private Memory (This Vault):** Rough thinking, raw capture, doctrine, seed notes. Safe to be messy or wrong.
2. **Agent Workbench ([`../../starter/`](../../starter/)):** Where tasks are bounded with [execution contracts](../icm-execution-contract.md) and transformed into drafts.
3. **Official Record (GitHub):** Where approved work lives permanently with issues, PRs, commits, checks, and [receipts](../icm-receipt.md).

## Folder Map

```text
templates/starter-vault/
├── README.md                      # This guide
├── START_HERE.md                  # 30-minute orientation workflow
├── 00-inbox/                      # Quick capture notes awaiting processing
├── 10-self-and-source-doctrine/   # Personal convictions, principles, and doctrine
├── 20-creative-projects/          # Active creative explorations
├── 30-business-assets/            # Core business models, offerings, and value logic
├── 40-content-and-media/          # Draft articles, videos, and social content
├── 50-sops-and-prompts/           # Working procedures and reusable prompt drafts
├── 60-agent-briefs/               # Scoped task briefs ready for delegation
├── 70-research-and-clips/         # Web clippings, quotes, and source material
├── 80-decisions/                  # Historical log of executive choices
├── 90-promoted-to-github/         # Stubs of assets promoted to official records
├── _agent-context/                # Operating contract for AI working in this vault
│   └── AGENT_CONTEXT.md
└── _templates/                    # Note templates with frontmatter schemas
    ├── daily-capture.md
    └── weekly-review.md
```

## The 30-Minute Win

Follow [`START_HERE.md`](START_HERE.md) to capture your first real idea, fill its maturity fields, add an honest link, and route it to an intended promotion target in under 30 minutes.

## How This Connects to the AI Office Starter

When a note in this vault matures from a `seed` to an `asset-candidate`, you do not simply publish it. You bridge it into the AI Office:

1. In this vault: Set `promotion_target: agent-brief` or `github-issue`.
2. In the AI Office ([`../../starter/`](../../starter/)): Create an [ICM Execution Contract](../icm-execution-contract.md) referencing the approved idea.
3. Run the task on an isolated branch.
4. Verify the work and emit an [ICM Receipt](../icm-receipt.md).
5. Merge the pull request into the official GitHub record.

## How To Use This With Agents

If you use an AI assistant (such as Codex, Claude Code, or Antigravity) inside this vault, the agent must read [`_agent-context/AGENT_CONTEXT.md`](_agent-context/AGENT_CONTEXT.md) before acting.

Agents in this vault may read context and draft notes. Agents may **never** publish or expose private notes without explicit human owner approval.

## How Promotion Works

Promotion intent is not authorization.

Setting `promotion_target: github-issue` inside a note expresses what you want the note to become. The note does not become official until it enters the GitHub repository through an issue or pull request with a human decision.

## Public Template vs. Private User Content

- **`public-template`:** The structural scaffolding of this starter vault is open source under Apache-2.0.
- **`private-user-content`:** All notes, ideas, doctrine, and reflections you create inside your instance of this vault remain private to you.

## What Must Stay Private

Do not push raw notes containing:

- personal or client credentials;
- unredacted customer data;
- privileged strategic secrets;
- unapproved commercial claims;

into a public GitHub repository. Use the AI Office boundary to sanitize and verify material before promotion.

## Next Step

1. Open [`START_HERE.md`](START_HERE.md) and execute the 30-minute win.
2. Review [`../../docs/quickstart.md`](../../docs/quickstart.md) for the full 20-minute AI Office setup.
3. Inspect [`../AGENTS.md`](../AGENTS.md) for agent governance rules.
