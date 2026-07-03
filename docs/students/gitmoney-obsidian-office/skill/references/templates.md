# Templates Standard

## Purpose

Define the required note templates for the student Obsidian vault.

## Owner

Red Pillar and Hitsuyo Aku, under KnowTheLedge.

The 14 templates in `_templates/`. Copy them; never edit the originals in place. Every template carries the six-field frontmatter standard from `operating-standard.md`.

| Template | File | Use for | Default lane |
|---|---|---|---|
| Daily capture | `daily-capture.md` | One idea, fast, during the day | `00-inbox/` |
| Source doctrine | `source-doctrine.md` | Operating principles, beliefs, decision rules | `10-self-and-source-doctrine/` |
| Creative project | `creative-project.md` | A creative build with a definition of done | `20-creative-projects/` |
| Business asset | `business-asset.md` | A note maturing through the asset test | `30-business-assets/` |
| SOP | `sop.md` | A repeatable procedure someone else could run | `50-sops-and-prompts/` |
| Prompt | `prompt.md` | A reusable prompt with usage notes | `50-sops-and-prompts/` |
| Agent brief | `agent-brief.md` | A scoped job for an agent platform | `60-agent-briefs/` |
| Research clip | `research-clip.md` | An article, video, or tool worth keeping | `70-research-and-clips/` |
| Content idea | `content-idea.md` | A piece of content from spark to published | `40-content-and-media/` |
| Decision | `decision.md` | A decision with context, options, and outcome | `80-decisions/` |
| Project blueprint | `project-blueprint.md` | Required before any AI coding or deployment | project's lane |
| Promotion candidate | `promotion-candidate.md` | A note being prepared for the official record | its current lane |
| Weekly review | `weekly-review.md` | The weekly inbox-and-board ritual | `00-inbox/` |
| AI memory/context | `ai-memory.md` | A durable fact agents should retain across sessions | `_agent-context/` (appended to `MEMORY_LOG.md`) |

## Rules

1. Fill every frontmatter field. An empty `summary` is a capture, not a note.
2. Template headings are prompts, not bureaucracy: a heading with nothing to say gets one honest line, not filler.
3. Templates may gain fields only through the monthly review, and only when a real recurring need exists (see metadata fatigue in `anti-patterns.md`).
4. Agents creating notes use these templates verbatim - same headings, same field names - so Bases views keep working.
