# Bases Standard

## Purpose

Define the standards for using Bases views in Obsidian.

## Owner

Red Pillar and Hitsuyo Aku, under KnowTheLedge.

Bases are Obsidian's built-in database views. The 12 `.base` files in `_bases/` are saved views over the vault's frontmatter. They work only because the frontmatter standard is consistent - that is the deal.

## The 12 Bases

| Base | File | Shows |
|---|---|---|
| Capture processing | `capture-processing.base` | Inbox notes awaiting filing, oldest first |
| Creative projects | `creative-projects.base` | Active creative work and its maturity |
| Business asset pipeline | `business-asset-pipeline.base` | Candidates moving through the asset test |
| Content queue | `content-queue.base` | Content ideas by status |
| Prompt library | `prompt-library.base` | All prompts, ready to reuse |
| Agent briefs | `agent-briefs.base` | All briefs and their state |
| Decision log | `decision-log.base` | Decisions, newest first |
| Research clips | `research-clips.base` | Clips awaiting processing |
| Promotion queue | `promotion-queue.base` | Everything `ready-to-promote` |
| Workbench board | `workbench-board.base` | Briefs grouped by board lane |
| Owner decision queue | `owner-decision-queue.base` | Items waiting on the owner |
| Stale notes | `stale-notes.base` | Nothing modified in 60+ days, honesty view |

## Property Names

Bases filter on these exact frontmatter properties: `status`, `classification`, `promotion_target`, `owner`, `created`, plus the file properties Obsidian provides (`file.folder`, `file.mtime`, `file.tags`). Rename a property and the views go blind - property renames are a monthly-review decision, applied vault-wide or not at all.

## Editing Rules

1. Adjust filters and columns freely; keep each base answering its one question.
2. New bases are welcome; duplicates of an existing question are not.
3. If a base shows nothing for weeks, either the vault is healthy (Stale Notes, ideally) or the base is dead - retire it at monthly review.
4. Agents may read any base definition to understand the vault, and may propose base edits through the owner decision queue, never silently.
