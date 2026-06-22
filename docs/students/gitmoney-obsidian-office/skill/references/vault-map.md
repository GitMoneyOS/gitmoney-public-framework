# Vault Map

## Purpose

Outline the organizational structure and folder taxonomy of the Obsidian vault.

## Owner

Red Pillar and Hitsuyo Aku, under KnowTheLedge.

The starter vault has fixed lanes. File into them; do not invent new top-level folders.

| Folder | What lives here | Typical status |
|---|---|---|
| `00-inbox/` | Every new capture, one idea per note | `seed` |
| `10-self-and-source-doctrine/` | Who you are, what you believe, how you decide. Your operating principles | `sprout`+ |
| `20-creative-projects/` | Active creative work: products, designs, builds, experiments | `sprout`+ |
| `30-business-assets/` | Notes maturing toward the asset test: offers, systems, frameworks | `asset-candidate`+ |
| `40-content-and-media/` | Content ideas, drafts, scripts, publishing queues | any |
| `50-sops-and-prompts/` | Repeatable procedures and reusable prompts | `sprout`+ |
| `60-agent-briefs/` | Scoped jobs for agent platforms, one brief per job | any |
| `70-research-and-clips/` | Web clips, article notes, tool discoveries, video notes | `seed`/`sprout` |
| `80-decisions/` | Decision log: what was decided, by whom, why, and what evidence | permanent |
| `90-promoted-to-github/` | Stub notes pointing at the official record location of promoted work | `promoted` |
| `_templates/` | The 14 note templates. Copy, never edit in place | n/a |
| `_bases/` | The 12 Bases views over the vault | n/a |
| `_clipper-templates/` | Web Clipper capture templates | n/a |
| `_agent-context/` | The agent contract: context, briefs, board, memory, decision queue, handoff | n/a |

## Filing Rules

1. Everything enters through `00-inbox/`. Filing happens at review, not at capture.
2. A note lives in exactly one lane. Links connect lanes; copies do not.
3. When a note is promoted, the original moves to `90-promoted-to-github/` as a stub with the official URL, or stays in its lane with `status: promoted` and the URL in the body.
4. `80-decisions/` is append-only. Decisions are never edited; they are superseded by new decisions that link back.

## Naming

- Notes: short, plain, searchable. `pricing-objection-answers.md`, not `Untitled 47.md`.
- Agent briefs: `brief-YYYY-MM-DD-short-job-name.md`.
- Decisions: `decision-YYYY-MM-DD-short-topic.md`.
