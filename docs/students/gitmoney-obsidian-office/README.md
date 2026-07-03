# GitMoney Obsidian Office

## Purpose

Define the private memory layer of the AI Office and provide a starter framework for founders using Obsidian.

## Owner

Red Pillar and Hitsuyo Aku, under KnowTheLedge.

Version: v1
Audience: GitMoneyOS students who completed GitHub orientation (Week 1).
Layer classification: GitHub record.

## What This Is

GitMoney Obsidian Office is the Week 2 unlock. It is not an Obsidian template. It is the missing staging ground between raw student thought and the official business record.

The three layers, in plain English:

- **Obsidian is private memory.** Where raw ideas, captures, and half-formed thinking live safely.
- **Agent platforms are workbenches.** Where briefed, scoped jobs turn notes into drafts and artifacts.
- **GitHub is the official record.** Where approved work becomes issues, docs, decisions, and receipts.

The end-to-end loop:

```text
Capture in Obsidian -> Shape with AI Office skill -> Route through agent workbench -> Promote approved work to GitHub -> Review monthly
```

## What Is In The Kit

```text
gitmoney-obsidian-office/
├── README.md                          <- you are here
├── week-2-obsidian-official-record.md <- the Week 2 class record
├── skill/                             <- the AI Office skill for your agent platform
│   ├── SKILL.md
│   ├── references/                    <- operating standard, vault map, workbench contract, and more
│   └── evals/evals.json
├── starter-vault/                     <- a ready-to-open Obsidian vault
│   ├── START_HERE.md                  <- your 30-minute win
│   ├── 00-inbox ... 90-promoted-to-github
│   ├── _templates/                    <- 14 note templates
│   ├── _bases/                        <- 12 Bases views
│   ├── _clipper-templates/            <- 4 Web Clipper templates
│   └── _agent-context/                <- the contract between your vault and your agents
└── dist/
    └── gitmoney-obsidian-office-starter-vault.zip
```

## How To Start

1. Download and unzip `dist/gitmoney-obsidian-office-starter-vault.zip`. It expands into one folder named `gitmoney-obsidian-office-starter-vault/` (or copy the `starter-vault/` folder and rename it).
2. Store that folder somewhere stable. Not Downloads.
3. Open that folder in Obsidian as a vault.
4. Open `START_HERE.md` and do the 30-minute win.
5. When you are ready to put an agent to work, give your agent platform the `skill/` folder and follow `_agent-context/AGENT_CONTEXT.md`.

## What You Need

- Current Obsidian (free), with the Templates and Bases core plugins enabled. The vault still works as folders and markdown if Bases are unavailable, but the queue views need Bases.
- Optional: Obsidian Web Clipper browser extension for the capture templates.
- An agent platform for the workbench steps: Claude Code, Codex, Antigravity, or any chat assistant. The skill includes a chat-only fallback.

You do not need community plugins, MCP, API keys, local AI models, or any always-on automation for v1. Advanced tools are optional extensions, never requirements.

## The Rules That Keep This Safe

- Every agent job starts from a note or issue and uses an agent brief. No vague jobs.
- Every agent output is a draft until it has an owner, approval path, evidence, reuse path, and lifecycle.
- No AI coding or deployment before a project blueprint exists.
- No secrets, credentials, billing, permission changes, public publishing, merges, deletions, client data, or live deployment without explicit owner approval.
- Private memory stays private until you deliberately promote it. Promotion is a decision, not a default.

## Lifecycle

This kit is reviewed after each cohort and at the Monthly Governor Review.

## Related Student Source Pack

Continue with the [GitMoney AI Office Source Pack](../ai-office-source-pack/README.md) to see how source material becomes Obsidian notes, agent briefs, student lessons, and GitHub official records.
