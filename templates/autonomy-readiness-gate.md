---
title: "autonomy-readiness-gate"
type: "public-template"
owner: "Hitsuyo Aku"
status: "draft"
classification: "public"
approval_path: "issue-and-pull-request"
promotion_target: "owner-review"
tags:
  - gitmoney/public-framework
  - autonomy-readiness
  - public/template
---

# Autonomy Readiness Gate Worksheet

Use this worksheet for one named process. Keep the completed version in a private business record. Do not place sensitive process data, customer details, credentials, or private evidence in a public issue or pull request.

For explanations of each step, see the [Autonomy Readiness Gate guide](../docs/diagnostics/autonomy-readiness.md).

## 1. Process definition

| Field | Your answer |
|---|---|
| Process name |  |
| Accountable owner |  |
| Team or business area |  |
| Purpose and desired result |  |
| Start condition and finish condition |  |
| Inputs and source |  |
| Outputs and recipient |  |
| People, tools, and dependencies |  |
| Typical volume and time period |  |
| Cycle time |  |
| Error or rework baseline and date range |  |
| Unknowns or assumptions |  |

## 2. Founder and key-person touchpoints

Score this separately from the six readiness parts. Use `0` for no material dependency and `5` when the person is effectively the system. For scores between those points, describe the observed dependency.

| Touchpoint | What the person currently does | Evidence or example | Score `0-5` |
|---|---|---|---:|
| Supplies missing context |  |  |  |
| Judges quality or taste |  |  |  |
| Handles exceptions |  |  |  |
| Routes or prioritizes work |  |  |  |
| Manages sensitive relationships |  |  |  |
| Makes the final decision |  |  |  |

**Founder dependency profile:** `__/5`<br>
**What is lost if this person is unavailable?**

## 3. Readiness evidence

For each check, mark `YES` only when current, relevant evidence supports that specific item. Assign check IDs in order (`S1-1` through `S1-5`, and so on) and map each `YES` item to evidence references in that system's evidence field. Count one point per supported `YES`. Missing, `NO`, `UNVERIFIED`, stale, conflicted, or unsupported checks score zero. The score is the sum from `0` to `5`. The [owner scoring ruling](../docs/diagnostics/autonomy-readiness-scoring-ruling.md) defines this method.

The CLI consumes the supplied score and system-level evidence status; it does not inspect the evidence locator or verify the per-check mapping. Keep private source records and do not mark evidence verified by the tool.

### S1: Operations

- [ ] The process has written steps that at least two people can follow consistently.
- [ ] Inputs are constrained by a form, schema, or fixed rules.
- [ ] Output quality has a clear pass/fail or other repeatable check.
- [ ] Recent cycle time and error or rework have a dated baseline.
- [ ] The process can run without undocumented intuition from one key person.

**Score:** `__/5`<br>
**Evidence references:**<br>
**Bottleneck:**<br>
**Smallest repair:**

### S2: Coordination

- [ ] Upstream inputs have a defined shape and a validation step.
- [ ] Downstream capacity and limits are known.
- [ ] Queues, work limits, or batch windows prevent overload.
- [ ] State changes are traceable and duplicate handling is defined.
- [ ] Dependencies and handoffs have named owners.

**Score:** `__/5`<br>
**Evidence references:**<br>
**Bottleneck:**<br>
**Smallest repair:**

### S3: Operational control

- [ ] The process has defined measures that show performance.
- [ ] Time, resource, and cost limits are known.
- [ ] Runs leave an operating record or telemetry trail.
- [ ] An owner can see whether the process is healthy without reading every run.
- [ ] There is a defined response when performance degrades.

**Score:** `__/5`<br>
**Evidence references:**<br>
**Bottleneck:**<br>
**Smallest repair:**

### S3*: Independent verification

- [ ] A representative test set includes successful, invalid, and high-risk cases.
- [ ] Evaluation criteria are explicit and repeatable.
- [ ] The evaluator is separate from the actor and cannot alter the production state being checked.
- [ ] Tests probe edge cases and attempts to bypass the process rules.
- [ ] Actual results are compared with a trusted expected result on a review schedule.

**Score:** `__/5`<br>
**Who or what performs the independent check?**<br>
**Evidence references:**<br>
**Bottleneck:**<br>
**Smallest repair:**

### S4: Environment and adaptation

- [ ] Important assumptions are written down.
- [ ] Each important assumption has a signal or measure that can show it changed.
- [ ] Rules and models have an owner and review or expiry date.
- [ ] Meaningful environmental changes have a stop condition.
- [ ] The process can be moved to a safer level when assumptions fail.

**Score:** `__/5`<br>
**Evidence references:**<br>
**Bottleneck:**<br>
**Smallest repair:**

### S5: Policy and authority

- [ ] A person with decision authority is named for this process.
- [ ] Actions the AI system must never take are written down.
- [ ] Read and write access are limited to the stated task.
- [ ] Spend, commitment, and production limits are explicit.
- [ ] Human-only decisions and escalation routes are explicit.

**Score:** `__/5`<br>
**Evidence references:**<br>
**Bottleneck:**<br>
**Smallest repair:**

## 4. Candidate autonomy level

Do not add the six scores into one total. The lowest unmet requirement limits the candidate level.

| Level | Candidate boundary | Evidence or unmet requirement |
|---:|---|---|
| 0 - Human Execution | People do the work. No AI process state changes. |  |
| 1 - AI Drafting | AI suggests or drafts. A person applies consequential changes. |  |
| 2 - AI Execution with Human Approval | AI prepares work; a person approves consequential changes. Owner-confirmed threshold: S1, S2, and S3 each at least `4` with current usable evidence, plus explicit authority and action limits. |  |
| 3 - Supervised Autonomy | Bounded AI actions with monitoring and escalation. S1, S2, S3, S3*, S4, and S5 each at least `4`, plus independent evaluation, telemetry, a safe state, and hard limits. |  |
| 4 - Exception-Only Autonomy | Candidate only after evidence from bounded live operation and a separate owner decision. A score cannot grant this level. |  |

**Highest candidate level supported by this worksheet:** `0 / 1 / 2 / 3 / 4`<br>
**Requested level:**<br>
**Unmet requirements that set the ceiling:**

### Additional evidence for Levels 3 and 4

System scores alone do not establish the additional operating evidence required for higher autonomy levels. Add a current evidence reference for each supported item. Use `UNVERIFIED`, `STALE`, `CONFLICTED`, or `NOT_PROVIDED` when support is absent or inadequate. Use `NOT_REQUIRED` for bounded-live evidence unless Level 4 is being considered.

| Gate | Status | Evidence reference and locator |
|---|---|---|
| Run telemetry is independently inspectable | `SUPPORTED / UNVERIFIED / STALE / CONFLICTED / NOT_PROVIDED` |  |
| Independent evaluation is separate from the actor | `SUPPORTED / UNVERIFIED / STALE / CONFLICTED / NOT_PROVIDED` |  |
| Bounded live operation supports a Level 4 candidate | `SUPPORTED / UNVERIFIED / STALE / CONFLICTED / NOT_PROVIDED / NOT_REQUIRED` |  |

## 5. Candidate verdict

Choose one:

- [ ] `HUMAN CONTROLLED`
- [ ] `FIX FIRST`
- [ ] `OWNER REVIEW REQUIRED`

**Why this verdict fits the evidence:**<br>
**Top blocker:**<br>
**Smallest safe next action:**<br>
**Action owner:**

## 6. Action boundary

Classify each relevant action as `AUTOMATE`, `AGENT CONTROL`, `HUMAN SUPERVISE`, `HUMAN CONTROL`, or `FORBIDDEN`.

Complete each scope field explicitly. When the process has no access, write `None`; a blank field leaves the scope undefined. Level 2 and higher candidates remain blocked when a required scope is missing or blank.

| Required scope | Explicit value |
|---|---|
| Permitted tools and actions |  |
| Forbidden tools and actions |  |
| Read scope |  |
| Write scope |  |
| Allowed data |  |
| Forbidden data |  |

| Process action | Boundary | Read access | Write access | Limit, approval, or evidence |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

**Maximum spend or commitment:**<br>
**Production and customer-facing limits:**<br>
**Strategic or identity decisions reserved for a person:**<br>
**Escalation owner and response time:**<br>
**Safe state when a check fails:**

## 7. Candidate handoff summary

This is a proposal for owner review. It is not an authorization or verification that the process is safe.

```text
MANIFEST_STATUS: CANDIDATE
EVIDENCE_VERIFIED: NO
PRODUCTION_AUTHORIZED: NO
PROCESS_NAME:
PROCESS_OWNER:
MAX_SUPPORTED_AUTONOMY_LEVEL:
VERDICT:
BLOCKERS:
ESCALATION_PATH:
OWNER_DECISION_REFERENCE:
```

**Owner decision:** `PENDING / ACCEPTED / REJECTED`<br>
**Decision date and reference:**<br>
**Decision expiry or review date:**

### Rule decisions for the machine-readable evaluation

These reference the framework's confirmed scoring rules. They do not record a process-specific owner decision and do not grant execution or production authority. Keep this reference fixed unless the framework owner issues a replacement ruling.

| Rule ID | Draft rule | Status | Owner decision reference and date |
|---|---|---|---|
| `COUNT_EVIDENCE_SUPPORTED_CHECKS` | One point per current evidence-supported check; missing or unsupported checks score zero. | `OWNER_CONFIRMED` | `AR-SCORING-RULING-2026-09-24`, 2026-09-24 |
| `S1_S2_S3_EACH_AT_LEAST_4` | Level 2 requires S1, S2, and S3 each to reach 4 with current evidence and explicit authority/action limits. | `OWNER_CONFIRMED` | `AR-SCORING-RULING-2026-09-24`, 2026-09-24 |

## 8. Next actions

1. Action:<br>
   Owner:<br>
   Evidence of completion:<br>
2. Action:<br>
   Owner:<br>
   Evidence of completion:<br>
3. Action:<br>
   Owner:<br>
   Evidence of completion:

Do not use a score to qualify a buyer or assign a service. A healthy process can continue with the public GitMoney protocol; an isolated question can be resolved on its own. Wider organizational diagnosis is a separate decision.

## Owner review note

The scoring rules are owner-confirmed in the [ruling record](../docs/diagnostics/autonomy-readiness-scoring-ruling.md). The evaluator still returns candidate guidance only; its score input is not an independent verification of the worksheet or evidence truth. Process-specific authority remains separate.

```text
ENTITY: templates/autonomy-readiness-gate.md
ROLE: Private worksheet for one-process autonomy review
OWNER: Hitsuyo Aku
STATUS: draft
CLASSIFICATION: public
APPROVAL_PATH: issue-and-pull-request
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
```
