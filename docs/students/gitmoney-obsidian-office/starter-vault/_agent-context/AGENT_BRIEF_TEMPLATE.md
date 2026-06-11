# AGENT BRIEF TEMPLATE

Copy this into `60-agent-briefs/` as `brief-YYYY-MM-DD-short-job-name.md`. A brief missing any section is not ready for the board.

```markdown
---
owner:
source: "[[link-to-source-note]]"
status: sprout
classification: private
summary: One sentence: what job, what deliverable.
promotion-target: agent-brief
created: YYYY-MM-DD
---

# Brief: [short job name]

## Source

Which note or issue this job comes from: [[source-note]]
Every job starts from a note or issue. No source, no job.

## Job Statement

One sentence. What the agent is being asked to produce.

## Scope

**In scope:**
- 

**Explicitly out of scope:**
- 

## Deliverable

What artifact, in what format, saved where in the vault.

## Boundaries

The hard rules always apply (no secrets, credentials, billing, permission changes, publishing, merge/delete, client data, or deployment without owner approval). List any job-specific boundaries here:

- 

## Done When

Observable criteria. The reviewer should be able to check these without asking you anything.

- [ ] 

## Evidence Required

What proof ships with the artifact: output, test run, screenshot, checklist.
```

## Validity Check

Before a brief enters the board's Ready lane:

- [ ] Source note linked
- [ ] Job statement is one sentence
- [ ] Out-of-scope list is non-empty (a job with nothing out of scope is not scoped)
- [ ] Deliverable names a format and a destination
- [ ] Done-when items are observable
