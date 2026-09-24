---
title: "icm-conformance-checklist"
type: "template"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - icm
  - conformance
  - public/template
---

# ICM Conformance Checklist

## Purpose

Check whether a bounded job actually followed the execution contract.

This checklist is for public-safe inspection. It does not prove security, legal, financial, or operational readiness by itself. It helps a founder see whether the work had enough context, authority, verification, and receipt discipline to be reviewable.

## Contract clarity

- [ ] The job is stated in plain English.
- [ ] The business reason is explicit.
- [ ] The non-goals are explicit.
- [ ] The owner is named.
- [ ] The approver is named.
- [ ] The acting party is named.
- [ ] The promotion decision is separated from the work itself.

## Context boundary

- [ ] Approved source files are listed.
- [ ] Evidence sources are listed.
- [ ] Private or client-owned material is excluded or summarized safely.
- [ ] Unknowns are marked as unknown.
- [ ] Assumptions are marked as assumptions.
- [ ] The task does not rely on invisible memory.

## Authority boundary

- [ ] The work does not grant itself approval.
- [ ] The work does not merge itself without owner authorization.
- [ ] The work does not deploy itself without owner authorization.
- [ ] The work does not expand claims beyond available evidence.
- [ ] The work does not change billing, access, security, or legal posture without explicit approval.

## Stage and handoff

- [ ] Source stage is complete.
- [ ] Architecture or plan stage is complete where required.
- [ ] Build or draft stage is bounded.
- [ ] Verification stage is recorded.
- [ ] Promotion stage requires a separate decision.
- [ ] The next handoff is named.

## Verification

- [ ] Checks are listed.
- [ ] Results are recorded.
- [ ] Failed or skipped checks are named.
- [ ] The receipt states what the checks do not cover.
- [ ] The evidence supports the claim.
- [ ] The work preserves rollback or reversal logic.

## Public-safety boundary

- [ ] No credentials or secrets are included.
- [ ] No private client data is included.
- [ ] No private source doctrine is exposed.
- [ ] No confidential strategy is exposed.
- [ ] No legal, financial, security, investor, or acquisition claim is made without evidence and approval.
- [ ] License and reuse rights are not implied unless published.

## Buyer-facing quality

- [ ] A non-technical founder can understand the business reason.
- [ ] The artifact explains why the control matters.
- [ ] The artifact points to the right next step.
- [ ] The artifact does not collapse into tool worship.
- [ ] The artifact makes the public proof layer stronger.

## Final conformance ruling

Use one:

```text
PASS
PASS_WITH_NOTES
REVISE
HOLD
```

## Notes

```text
What should the next reviewer know?
```

## Done-when

A job conforms when authority is explicit, context is bounded, handoffs are staged, verification is recorded, receipts are inspectable, and unknowns stay unknown.