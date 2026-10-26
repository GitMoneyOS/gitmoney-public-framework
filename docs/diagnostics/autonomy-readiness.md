---
title: "autonomy-readiness"
type: "public-framework"
owner: "Hitsuyo Aku"
status: "draft"
classification: "public"
approval_path: "issue-and-pull-request"
promotion_target: "owner-review"
tags:
  - gitmoney/public-framework
  - diagnostics
  - autonomy-readiness
---

# Autonomy Readiness Gate

Use this guide to review one business process before asking an AI system to take on more of its work. It helps you compare the process with its evidence, decision rights, and limits.

The result is a **candidate level for owner review**. It is not a safety certification, proof that the process works, or permission to give an AI system live access.

## Who should use this

Use the Gate when you are considering AI execution, agent-controlled decisions, production changes, supervised autonomy, or exception-only human intervention for a specific process.

You do not need a full Gate to ask an AI system for a draft that a person reviews and applies. Use an [Execution Contract](../../templates/icm-execution-contract.md) to bound ordinary work.

## What the Gate decides

The Gate asks: **What is the highest candidate level of AI involvement this one process can support with evidence and clear human authority?**

It does not explain why problems repeat across your whole organization. It does not decide whether a process is legally, financially, or security ready. It does not authorize an AI system to act.

## Before you begin

Choose one process with a clear start and finish. Bring the current steps, the person accountable for the process, examples of completed work, known exceptions, and any available measures of time, errors, or rework.

Keep private information in your own records. Do not paste customer details, credentials, private messages, or confidential operating data into a public issue, pull request, or shared example.

## Step 1: Describe the process

Write down its purpose, owner, inputs, outputs, handoffs, dependencies, current volume, and intended result. If cycle time or error rates are unknown, mark them unknown. Do not replace a missing baseline with a guess.

List where a person currently supplies context, checks quality, handles exceptions, routes work, manages relationships, or makes the final decision. Record those touchpoints separately from the six readiness scores.

## Step 2: Check six parts of the operating system

For each part, use the five checks in the [worksheet](../../templates/autonomy-readiness-gate.md). Count a check only when you can point to current evidence. A story or confidence level is not evidence by itself.

| Part | Plain-English question | What to inspect |
|---|---|---|
| Operations (S1) | Can different people repeat the process and recognize acceptable output? | Instructions, input rules, quality checks, baseline measures, and undocumented judgment |
| Coordination (S2) | Do handoffs, queues, and dependencies stay in control? | Input checks, downstream capacity, queues, duplicate handling, and named owners |
| Operational control (S3) | Can the owner see whether the process is healthy and respond when it is not? | Measures, time and cost limits, run records, status visibility, and response steps |
| Independent verification (S3*) | Can a separate check catch failures without relying on the AI system's own report? | Test cases, repeatable criteria, reviewer independence, adversarial cases, and comparison with expected results |
| Environment and adaptation (S4) | Will someone notice when assumptions or conditions change? | Assumptions, signals, review dates, stop conditions, and a path to safer operation |
| Policy and authority (S5) | Is it clear who may decide, what must never happen, and who can stop the process? | Named owner, forbidden actions, access limits, approval rules, and identity or strategy boundaries |

The owner-confirmed scoring rule is one point for each of the five checks supported by current, relevant evidence. Missing, `NO`, `UNVERIFIED`, stale, conflicted, or unsupported checks score zero. The system score is the count of supported checks, from `0` to `5`; do not average the six scores. See the [scoring ruling](autonomy-readiness-scoring-ruling.md).

## Step 3: Set a candidate autonomy level

Choose the highest level supported by the evidence. A higher score does not grant permission.

| Level | Name | Boundary |
|---:|---|---|
| 0 | Human Execution | People perform the work. AI makes no process state changes. |
| 1 | AI Drafting | AI suggests or drafts. A person performs consequential state changes. |
| 2 | AI Execution with Human Approval | AI prepares the process work. A person approves consequential changes before they take effect. The owner-confirmed threshold requires S1, S2, and S3 each to be at least `4`, supported by current evidence, plus explicit authority and action limits. |
| 3 | Supervised Autonomy | AI acts within defined limits while a person monitors evidence and exceptions. Each of S1, S2, S3, S3*, S4, and S5 must be at least `4`; independent evaluation, monitoring, escalation, a safe state, and hard limits are also required. |
| 4 | Exception-Only Autonomy | Human attention is reserved for exceptions. A score cannot grant this level. It requires evidence from bounded live operation and a separate owner decision. |

The owner-confirmed Level 2 rule combines the source thresholds for agent control and live delegation. The validator also requires a matching named process owner, explicit actions and forbidden actions, approval for delegated or supervised actions, defined spend and production limits, escalation and a safe state, and customer-reputation and strategic-identity limits. These checks establish a candidate ceiling; they do not grant authority.

For Levels 0 and 1, do not require every readiness score to reach `4`. If the owner, process, or forbidden actions are unclear, keep consequential changes under human control.

## Step 4: Choose a verdict

Return one of these verdicts with the maximum candidate level and its evidence:

- **HUMAN CONTROLLED**: Keep the process human-executed or use AI only for drafts that a person checks and applies.
- **FIX FIRST**: The process lacks evidence or controls needed for the requested level. Name the specific gap and the smallest repair.
- **OWNER REVIEW REQUIRED**: The evidence supports considering a candidate level above drafting. This verdict routes the result to an accountable owner; it grants no authority.

The lowest unmet requirement sets the ceiling. A filled worksheet, score, successful schema check, or machine-generated manifest does not prove that the real process is safe or working as intended.

For Levels 3 and 4, record separate evidence references for run telemetry, independent evaluation, and bounded live operation. A system score does not substitute for these specific gates.

Candidate manifests should cite the [owner scoring ruling](autonomy-readiness-scoring-ruling.md) using reference `AR-SCORING-RULING-2026-09-24` and date `2026-09-24`. The CLI consumes the supplied system totals and checks system-level evidence status; it does not inspect each worksheet item or verify evidence truth. The ruling confirms scoring policy only and does not grant execution or production authority. A separate process-owner decision is still required for any real authority change.

After saving a candidate JSON manifest, run `node scripts/gitmoney.mjs readiness validate path/to/candidate.json --json`. The command validates the manifest and prints a machine-readable candidate evaluation. A successful command means the manifest was processed; it does not mean the process passed or received authority.

## Step 5: Draw the action boundary

For each action in the process, mark one boundary: `AUTOMATE`, `AGENT CONTROL`, `HUMAN SUPERVISE`, `HUMAN CONTROL`, or `FORBIDDEN`. Name permitted tools and tool actions, allowed and forbidden data, explicit read and write scopes (including an explicit no-read or no-write statement when applicable), limits on spend and production changes, customer-facing limits, escalation steps, and the safe state when a check fails. A Level 2 or higher candidate is blocked if any of these scopes is missing or blank.

Keep authority specific to the action and process. A tool being able to perform an action does not mean it is permitted to do so. Keep consequential changes under human approval unless the owner has made a separate, current decision.

Readiness candidacy is not a live grant. Before any agent receives authority to perform consequential work, bind an [Execution Boundary](authority-revocation.md) to the runtime adapter. The adapter must check current authority before each action and revoke or freeze the grant when a declared trigger fires. A worksheet, score, prompt, or CLI result does not perform that runtime enforcement.

## Step 6: Pick one next action

If the result is `FIX FIRST`, choose one blocker, name its owner, and record the evidence that will show the repair worked. Re-run only the affected checks after the process changes.

If the result supports a higher candidate level, prepare an [Execution Contract](../../templates/icm-execution-contract.md) for the proposed task and require an [Execution Receipt](../../templates/icm-receipt.md) afterward. The Gate itself grants no access or permission.

Use the [Exit-Ready Score Self-Assessment](../exit-ready-score-self-assessment.md) for broad business knowledge and governance hygiene. Use the [Founder Dependency Map](../buyer-paths/founder-dependency-map.md) to examine wider founder-dependency patterns. The Gate covers one process; these tools have different jobs and their scores are not interchangeable.

## Limits and owner review

This is a draft public exercise. It does not make legal, financial, security, investment, diligence, valuation, or acquisition-readiness determinations. Scores do not qualify a buyer or assign a paid service.

The owner has confirmed the two scoring rules in the [scoring ruling](autonomy-readiness-scoring-ruling.md). Before release, the owner must still review this exact wording, the independent content review and beta.4-specific RC evidence must be recorded, and a separate release decision is required. No cold-founder usability result is claimed for this candidate.

```text
ENTITY: docs/diagnostics/autonomy-readiness.md
ROLE: Plain-English guide for reviewing autonomy of one process
OWNER: Hitsuyo Aku
STATUS: draft
CLASSIFICATION: public
APPROVAL_PATH: issue-and-pull-request
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
```
