# State Of Agentic Repo Governance: Pilot Methodology

Status: research draft, not a published index
Classification: Public
Owner: Red Pillar and Hitsuyo Aku, under KnowTheLedge
Purpose: test whether public repositories expose enough evidence to govern AI-assisted contribution
Update cadence: after the pilot sample and before each published edition
Approval path: both owners approve methodology, sample, claims, and publication

## Research Question

What governance controls can a visitor verify in a public repository without private access, security testing, or unsupported inference?

## Unit Of Analysis

One public GitHub repository at one recorded commit and observation date.

## Visible Evidence Rubric

Score each control `0`, `1`, or `2`:

| Control | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Agent instructions | No visible agent instructions | Instructions exist but omit boundaries or review | Scope, forbidden actions, checks, and escalation are visible |
| Ownership | No visible approval owner | General maintainer or contribution owner | CODEOWNERS or an equivalent path covers critical surfaces |
| Proposal lane | No visible contribution or review path | General contribution guidance | Issues, branches, pull requests, and decision expectations are explicit |
| Deterministic checks | No visible automated check | Checks exist but job or permission is unclear | Checks have a clear job, narrow permissions, and inspectable failure behavior |
| Evidence receipts | Activity exists without decision context | Some links between work and changes | Issues, pull requests, releases, or decisions explain what became official |
| Data boundary | No visible sensitive-data rule | General warning | Public, private, client-owned, credential, and claim boundaries are explicit |
| Lifecycle | No visible maintenance signal | Changelog or cadence exists | Owner, review cadence, stale-work path, and release history are visible |
| Founder readability | Control requires strong Git knowledge | Some plain-English explanation | A nontechnical owner can identify authority, risk, and next action |

Maximum visible-evidence score: `16`.

## Interpretation

- `0-4`: little public governance evidence
- `5-8`: partial operating shell
- `9-12`: inspectable collaboration controls
- `13-16`: unusually legible public governance

The score measures visible evidence only. It does not measure private controls, actual compliance, security, code quality, team behavior, business value, or legal sufficiency.

## Sampling Plan

Pilot with a bounded, declared sample across:

- AI coding or agent framework repositories
- founder or business operating-system repositories
- public learning and contributor programs
- mature open-source projects with established governance

Record inclusion rules before selecting repositories. Do not choose only examples that support the GitMoneyOS thesis.

## Collection Rules

1. Record repository, commit, observation date, and reviewer.
2. Inspect public files and settings only.
3. Link every score to visible evidence or record “not observed.”
4. Treat missing public evidence as “not observed,” not proof that the control does not exist.
5. Use deterministic file and link checks where possible.
6. Use a separate reviewer or adjudication step for disputed scores.
7. Offer a correction path before using a named repository as a negative example.
8. Archive the rubric version used for every edition.

## Claim Boundary

Allowed:

> At the observed commit, we found public evidence for six of eight visible-governance controls.

Not allowed:

> This repository is secure, unsafe, compliant, negligent, certified, or investment-ready.

## Pilot Acceptance

- [ ] Inclusion and exclusion rules approved before sampling.
- [ ] At least two repository types represented.
- [ ] Every score has a source URL and observation date.
- [ ] Inter-reviewer disagreements recorded.
- [ ] Correction process published.
- [ ] No security, legal, certification, valuation, or affiliation implication.
- [ ] Qualified demand and Audit-route attribution plan defined.

## Commercial Route

The public index creates authority and diagnosis. The paid route is an Agentic Repo Governance Check that inspects the owner's actual operating context with permission. A public score does not substitute for that diagnostic.
