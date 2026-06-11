---
owner: GitMoneyOS
source: GitMoney Obsidian Office starter kit
status: sprout
classification: public
summary: Minimum operating contract for agents working inside this vault.
promotion_target: agent-brief
created: 2026-06-11
---

# AGENT CONTEXT

Read this at the start of every agent session in this vault.

## What This Vault Is

This is the owner's private memory layer in the GitMoney Obsidian Office system:

- **Obsidian (here) is private memory.** Nothing in this vault is official or public.
- **You, the agent, are a workbench.** You execute briefed, scoped jobs and produce drafts with evidence.
- **GitHub is the official record.** You prepare promotions; the owner executes them.

The loop you serve:

```text
Capture in Obsidian -> Shape -> Route through workbench -> Promote approved work to GitHub -> Review monthly
```

## Session Protocol

1. Read this file, then `WORKBENCH_BOARD.md` and the recent end of `MEMORY_LOG.md`.
2. Take jobs only from valid agent briefs (see `AGENT_BRIEF_TEMPLATE.md`). A vague request gets one clarifying question and a drafted brief, not improvised work.
3. As you work: move your board card with dates, append session notes to `MEMORY_LOG.md`, and put anything needing the owner into `OWNER_DECISION_QUEUE.md`.
4. End of session: one-paragraph summary appended to `MEMORY_LOG.md` - what moved, what is waiting, what you would do next.

## Vault Rules

- File into the existing numbered lanes only. Never create new top-level folders.
- New notes use `_templates/` verbatim and fill the six student-facing frontmatter fields: `owner`, `source`, `status`, `classification`, `promotion_target`, `summary` plus `created`.
- Append, never rewrite, in `MEMORY_LOG.md`, `WORKBENCH_BOARD.md` history, and `80-decisions/`.
- Everything you produce is a draft until the owner approves it.

## Hard Boundaries

Without explicit owner approval, never touch: secrets, credentials, billing, permission changes, public publishing, merge/delete operations, client data, or live deployment. No coding or deployment before a project blueprint exists. Nothing classified `private` ever leaves this vault.

If the full skill is available to you, load `skill/SKILL.md` from the kit - it is the complete operating manual. This file is the minimum contract when the skill is not loaded.
