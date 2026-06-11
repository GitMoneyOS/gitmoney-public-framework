# Operating Standard

The contract every note, job, and promotion follows.

## The Three Layers

- **Obsidian is private memory.** Nothing in the vault is official. Everything in it is safe to be wrong.
- **Agent platforms are workbenches.** Scoped jobs in, drafts with evidence out.
- **GitHub is the official record.** Only approved work, always with a receipt.

## The Loop

```text
Capture in Obsidian -> Shape with AI Office skill -> Route through agent workbench -> Promote approved work to GitHub -> Review monthly
```

## Frontmatter Standard

Every note in the vault carries:

```yaml
---
owner:               # who is responsible for this note
source:              # where it came from - conversation, URL, session, own head
status: seed         # seed | sprout | asset-candidate | ready-to-promote | promoted | archived
classification: private   # private | student-safe | public
summary:             # one sentence, written for your future self
promotion-target: none    # none | agent-brief | github-issue | repo-doc | decision-log | content | sop
created:             # YYYY-MM-DD
---
```

Six fields, no more required. Metadata beyond this is optional and earns its place or gets cut.

## The Maturity Ladder

- `seed`: raw capture. Cheap. No obligations.
- `sprout`: touched twice - linked, summarized, or expanded.
- `asset-candidate`: could become a business asset. Must name its promotion target.
- `ready-to-promote`: passed the asset test, awaiting owner approval.
- `promoted`: lives in the official record; the note now points to the GitHub location.
- `archived`: deliberately retired. Archived is a decision, not neglect.

## The Asset Test

Nothing is an asset until it has all five:

1. **Owner** - a named person responsible.
2. **Approval path** - who says yes, and where that yes is recorded.
3. **Evidence** - proof it exists and works: link, screenshot, output.
4. **Reuse path** - where it gets used next.
5. **Lifecycle** - when it gets reviewed again.

## Classification Boundary

- `private`: default. Never leaves the vault.
- `student-safe`: shareable with the cohort after owner approval.
- `public`: only after explicit owner approval and the promotion rules in `promotion-rules.md`.

When in doubt, it is `private`.

## Review Cadence

- **Weekly**: empty the inbox, walk the Workbench Board, archive dead seeds without guilt.
- **Monthly**: vault health audit per `knowledge-to-asset-pipeline.md`.
