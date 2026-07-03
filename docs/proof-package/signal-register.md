# Signal Register

Status: draft public-safe measurement standard
Classification: Public
Owner: Red Pillar and Hitsuyo Aku, under KnowTheLedge
Update cadence: monthly during governor review
Approval path: issue and pull request before this becomes official public doctrine

## Purpose

Every felt-value surface in the public framework has exactly one completion signal. The signal is a GitHub issue filed by the founder — measurement lives inside the official record, not in a bolted-on analytics tool.

Plain-English translation: when someone finishes one of our diagnostics, the proof is a receipt in this repo, the same way all official work becomes a receipt.

## The Signals

| Surface | Signal | Issue Template | Decision It Informs |
| --- | --- | --- | --- |
| Exit-Ready Score Self-Assessment | Completed score filed with band and top risk | `score-completed` | Which score bands are common, and which offer each band should route to |
| First Official Asset path | Receipt filed with commit link and time-to-asset | `first-official-asset` | Where founders stall between messy note and governed receipt |
| Self-Heal Check | Run filed with gap count and chosen control | `self-heal-run` | Which governance gaps are most common in the wild |

## Signal Rules

- One signal per surface. No stacking events, no analytics theater.
- A signal without a data-boundary check is not accepted.
- Signals are reviewed monthly in the Governor Review and summarized in the Healing Dashboard.
- The proof ladder rule: a surface with zero real completions is still *theory*. One real completion moves it to *pilot*. Repeated completions with routed next steps move it toward *productized*.

## Data Boundary

Signals carry counts, bands, plain-English summaries, and public links only. Never client names, credentials, screenshots of private systems, or confidential details.
