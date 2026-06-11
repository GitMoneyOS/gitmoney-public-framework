# Workbench Contract

The agentic chain every job follows:

```text
Obsidian note -> Agent brief -> Workbench artifact -> Evidence -> Owner review -> GitHub promotion
```

No stage may be skipped. Each stage has an artifact.

## Stage 1: Obsidian Note

Every job traces back to a note (or an existing GitHub issue). If the user gives you a vague job with no note, your first move is: help them write the note. One idea, six frontmatter fields, done.

## Stage 2: Agent Brief

Created from `_agent-context/AGENT_BRIEF_TEMPLATE.md`. A brief is valid when it has:

- Source note or issue (linked).
- One-sentence job statement.
- Scope: what is in, what is explicitly out.
- Deliverable: what artifact, in what format, saved where.
- Boundaries: what the agent may not touch (default: everything in the Hard Rules).
- Done-when: observable completion criteria.

**No agent gets a vague job.** A brief that says "make this better" is rejected back to the owner with questions.

## Stage 3: Workbench Artifact

The agent's output: a draft document, plan, analysis, code-with-blueprint, or asset. It is a draft regardless of quality. Drafts live in the lane the brief names, never directly in `90-promoted-to-github/`.

## Stage 4: Evidence

Every artifact ships with proof: the output itself, plus anything that shows it works - test output, screenshot, before/after, checklist run. No evidence, no review.

## Stage 5: Owner Review

The owner reviews against `acceptance-rubric.md`. Outcomes: approve, revise (back to Stage 3 with notes), or archive. Approvals and rejections are recorded - on the board and, for significant calls, in `80-decisions/`.

## Stage 6: GitHub Promotion

Only after approval, per `promotion-rules.md`. The agent prepares; the owner executes or explicitly green-lights.

## The Workbench Board

`_agent-context/WORKBENCH_BOARD.md` tracks every job:

| Lane | Meaning |
|---|---|
| Backlog | Briefed but not scheduled |
| Ready | Next up; brief is complete and valid |
| Doing | In progress. **WIP limit: 3.** A fourth job waits |
| Review | Artifact and evidence delivered; awaiting owner |
| Blocked | Waiting on a decision, input, or dependency - says which |
| Done | Approved, and promoted if applicable |

Agents move their own cards and date every move. If Doing is full, finish something.
