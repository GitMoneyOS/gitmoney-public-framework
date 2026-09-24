---
title: "starter-vault-start-here"
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

# START HERE

Welcome to your Starter Vault. Say the three rooms once out loud:

- **Obsidian is private memory:** This vault. Nobody sees it. Safe to be messy or wrong.
- **Agent platforms are workbenches:** Where briefed jobs become drafts.
- **GitHub is the official record:** Where approved work becomes permanent assets.

Do not customize anything yet. Do the 30-minute win first.

## The 30-Minute Win

### 1. Capture one real idea (5 min)

Not a test note. A real thought from your actual business or work. Create a new note in `00-inbox/` using `_templates/daily-capture.md`. State one idea plainly.

### 2. Fill the starter fields (5 min)

In the note's YAML frontmatter:

- `owner`: you.
- `source`: where it came from (your head, a client call, an article).
- `status`: `seed`.
- `classification`: `private-user-content`.
- `summary`: one sentence for your future self.
- `promotion_target`: leave as `none` for now.
- `created`: today's date (YYYY-MM-DD).

### 3. Add one meaningful link (5 min)

Finish this sentence inside the note: *"This connects to..."* and link it to an existing concept or note: `[[concept]]`.

One honest link beats ten reflex links.

### 4. Mark maturity (5 min)

Assess where this note sits on the Maturity Ladder:

```text
seed              -> Raw, unverified thought
sprout            -> Touched twice, gaining shape
asset-candidate   -> Substantial idea with commercial or operational value
ready-to-promote  -> Bounded and ready for agent drafting or issue creation
promoted          -> Promoted into official GitHub record with receipt
archived          -> Retired or superseded
```

Most first notes are seeds. That is correct, not small.

### 5. Choose a promotion target (5 min)

Decide what, if anything, this note should become, and set `promotion_target`:

- `none`: stays as a private thought.
- `agent-brief`: ready to be handed to an agent for research or drafting.
- `github-issue`: ready to become a trackable business task.
- `repo-doc`: ready to become internal documentation.
- `decision-log`: an executive choice to be recorded.
- `content`: an outline for public media or article.
- `sop`: a candidate standard operating procedure.

### 6. Stop before customizing (5 min)

The graveyard of note systems is full of perfect empty vaults. Capture beats configuration.

Use the vault for three real tasks before changing folders, tags, or settings.

## Connecting to the AI Office

When a note reaches `ready-to-promote`, open [`../../starter/`](../../starter/) and create a formal [ICM Execution Contract](../icm-execution-contract.md) to govern the build.

Promotion intent is not authorization. GitHub becomes the official record only when work is committed, reviewed, verified, and preserved.
