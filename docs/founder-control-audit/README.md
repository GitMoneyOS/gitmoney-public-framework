---
title: "Founder Control Audit"
type: "public-audit-guide"
owner: "Red Pillar and Hitsuyo Aku, under KnowTheLedge"
status: "review-draft"
classification: "public"
approval_path: "Pull request and founder review before merge"
update_cadence: "Review after each approved dry run and during the monthly governor review"
---

# Founder Control Audit

## Purpose

Find one control gap in the way your business handles important AI-assisted work, then name one small next move.

This is a working guide, not a data-collection form. It uses the existing [Exit-Ready Score Self-Assessment](../exit-ready-score-self-assessment.md) to check whether the business can find, approve, protect, hand off, and improve important work.

## What This Is And Is Not

This audit can help you inspect ownership, documentation, AI-agent rules, change history, and handoff readiness. It does not assess legal, financial, security, investment, or acquisition readiness. A score is a snapshot of observed control evidence, not a verdict about the business.

## Run It Privately

1. Create a private repository or use an existing private business-record repository.
2. Copy [the private audit template](private-copy-template.md) to `governance/founder-control-audit.md` in that repository.
3. Complete the eight dimensions in the [Exit-Ready Score Self-Assessment](../exit-ready-score-self-assessment.md). Mark each score as observed or inferred.
4. Name the lowest two dimensions, one first official asset, and one next action.
5. Keep the resulting document private unless you deliberately create a de-identified, approved proof record.

GitHub is useful here because the result can live beside the owner, approval path, evidence, reuse path, and review date. It does not need to be public to be real.

## Your Route

| Score | Next move |
| ---: | --- |
| 0-10 | Name the control failures before building. Use a short AI Work Governance Signal Audit. |
| 11-20 | Run an AI Office Audit to map workflows, risks, and a 30-day repair path. |
| 21-30 | Use a GitOps Setup Sprint to give visible assets a governed home. |
| 31-36 | Establish a monthly governance cadence and close named gaps. |
| 37-40 | Keep the cadence. Consider a public-safe case file only when a separate evidence and permission review approves it. |

Offer context lives in [CONSULTING.md](../../CONSULTING.md). This audit does not create a sales obligation.

## Public Boundary

Do not submit the worksheet, client material, credentials, private URLs, screenshots, access lists, financial details, or confidential strategy through GitHub Issues. This version has no Issue Form, data capture, analytics event, GitHub App, OAuth connection, or GitHub Pages deployment.

## What Makes This A Governed Asset

| Asset test | This audit's answer |
| --- | --- |
| Owner | The founder who creates the private record. |
| Approval | The founder's documented decision about the first repair. |
| Evidence | The observed links, files, settings, and notes behind each score. |
| Reuse path | A private `governance/founder-control-audit.md` record. |
| Lifecycle | Revisit after a material workflow change or during the monthly review. |

## Done When

- All eight dimensions have a score and evidence state.
- The lowest two dimensions are named in plain language.
- One next action can begin without exposing private material.
- The private record names its owner and next review date.

## Evidence And Maintenance

The schema for this guide is machine-checked by [`audit-contract.json`](audit-contract.json). The check runs in the repository's pull-request evidence gate. It validates the audit's eight dimensions and its no-public-submission rule; it does not score founders or read their repositories.
