# Knowledge-To-Asset Pipeline

The advanced path: turning an aging vault into a portfolio of business assets. Run monthly, or when the owner asks for a vault audit.

## Stage 1: Vault Health Audit

Walk the vault and report honestly:

- Inbox count and oldest unprocessed capture.
- Notes per lane; lanes that are empty or bloated.
- Status distribution: how many seeds, sprouts, candidates, promoted.
- Stale notes: no edits in 60+ days, excluding `80-decisions/` and `90-promoted-to-github/`.
- Orphan notes: zero links in or out.
- Board health: WIP count, items stuck in Review or Blocked, oldest card.

Output: a short audit note in `00-inbox/` with the numbers and the three worst findings. No shame, no padding - the vault is allowed to be messy; it is not allowed to be unexamined.

## Stage 2: Pattern Surfacing

Look across notes for repetition the owner cannot see from inside:

- The same question answered three times -> SOP candidate.
- The same prompt rebuilt in different words -> prompt library candidate.
- The same client problem in multiple research clips -> offer or content candidate.
- A decision contradicted by a later note -> flag for the decision log.

Output: a pattern list, each entry naming its source notes by link. Patterns without at least two source notes are hunches, not patterns - say so.

## Stage 3: Asset Scoring

Score each candidate against the asset test, 0-2 per criterion (0 missing, 1 partial, 2 solid):

| Criterion | Question |
|---|---|
| Owner | Is a named person responsible? |
| Approval path | Is it clear who says yes? |
| Evidence | Does proof exist that it works? |
| Reuse path | Will it be used again, where? |
| Lifecycle | Is there a review date? |

- 8-10: mark `ready-to-promote`, queue for owner review.
- 5-7: mark `asset-candidate`, list exactly what is missing.
- 0-4: leave as `sprout`. Not every note owes you money.

## Stage 4: Official Promotion

For each approved `ready-to-promote` note, follow `promotion-rules.md`: pick the target, produce the artifact, run the public-safety check, queue it in `OWNER_DECISION_QUEUE.md`, and on owner approval record the promotion and stub the note into `90-promoted-to-github/`.

The pipeline's promise: nothing valuable rots in private memory, and nothing private leaks into the official record.
