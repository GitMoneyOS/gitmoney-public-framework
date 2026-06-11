---
owner: GitMoneyOS
source: GitMoney Obsidian Office starter kit
status: sprout
classification: private
summary: Owner-only queue for approvals, promotions, classification changes, and hard-boundary decisions.
promotion_target: decision-log
created: 2026-06-11
---

# OWNER DECISION QUEUE

Anything an agent cannot decide lands here instead of being done silently. The owner clears this queue at weekly review or sooner. Decisions of consequence also get a record in `80-decisions/`.

Entry format:

```markdown
## [open|decided] YYYY-MM-DD - short title

- What needs deciding:
- Options (with the agent's recommendation first):
- Why it is owner-only: (approval, classification, promotion, boundary, spend)
- Link: [[relevant-note-or-brief]]
- Decision (owner fills): 
- Decided on: YYYY-MM-DD
```

What always queues here, never gets decided by an agent:

- Any promotion to the official record.
- Any classification change away from `private`.
- Anything touching the hard boundaries: secrets, billing, permissions, publishing, merge/delete, client data, deployment.
- Template or base schema changes.

---

## open 2026-06-11 - Example: approve first promotion candidate

- What needs deciding: whether the pricing objection SOP (once drafted) is approved for promotion as an official SOP.
- Options: approve as `sop` (recommended once evidence attached); keep private another cycle.
- Why it is owner-only: promotion to official record.
- Link: [[brief-2026-06-11-example-pricing-sop]]
- Decision (owner fills):
- Decided on:
