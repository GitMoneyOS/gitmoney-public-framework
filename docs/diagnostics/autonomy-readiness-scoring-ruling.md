---
title: "Autonomy Readiness Gate Scoring Ruling"
type: "public-framework-decision"
owner: "Hitsuyo Aku"
status: "owner-confirmed-candidate"
classification: "public"
decision_reference: "AR-SCORING-RULING-2026-09-24"
decision_date: "2026-09-24"
promotion_target: "v0.9.0-beta.4 local candidate"
approval_path: "Owner ruling; public release remains separately gated"
tags:
  - gitmoney/public-framework
  - autonomy-readiness
  - scoring
---

# Autonomy Readiness Gate Scoring Ruling

This record applies to the GitMoney OS Public Framework Autonomy Readiness Gate candidate. It records the owner's two scoring decisions. It does not approve any business process, verify its evidence, grant tool access, or authorize execution or production changes.

**Decision reference:** `AR-SCORING-RULING-2026-09-24`

**Decision date:** 2026-09-24
**Decision source:** Explicit owner instruction in the GitMoney beta.4 execution thread.

## Rule 1: Count evidence-supported checks

Each readiness system has five checks. Award one point only when current, relevant evidence supports that individual check. A check that is missing, marked `NO` or `UNVERIFIED`, stale, conflicted, or unsupported earns zero. The system score is the sum of its supported checks, from `0` through `5`. Do not average the six system scores.

Record evidence references against the individual check IDs in the private worksheet, such as `S1-1` through `S1-5`. Keep real evidence and sensitive process details in the owner's private records.

The CLI consumes the supplied system score and system-level evidence status. It does not inspect the contents of evidence locators or verify the assessor's per-check mapping. Keep `evidence_verified: NO`; a successful validation is not an evidence audit.

## Rule 2: Level 2 threshold and limits

A Level 2 candidate requires all of the following:

- S1 Operations, S2 Coordination, and S3 Operational Control each score at least `4` under Rule 1, with current usable evidence references.
- The process owner and authority record identify the same accountable owner.
- Actions and forbidden actions are explicit.
- Permitted tools and tool actions, read and write scopes, and allowed and forbidden data are explicit and nonblank. State `no read` or `no write` when that is the intended boundary.
- Delegated or supervised actions retain human approval.
- Spend and production limits are defined and internally consistent.
- Escalation names a trigger, owner, and response; a safe state is defined.
- Customer-reputation and strategic-identity limits are stated.

These requirements establish candidacy for a separate owner review. They do not change `authority_status: NOT_GRANTED`, remove the separate execution-authorization requirement, or set `production_authorized` to `YES`.

## Scope and lifecycle

The rules apply to the beta.4 candidate. They do not retroactively alter beta.3 trial materials or prove that beta.4 has passed conformance, usability, independent human review, or release gates. Any later change to either rule needs a new owner decision record and a versioned change entry.

```text
RULING_STATE: OWNER_CONFIRMED
CANDIDATE_STATE: UNRELEASED
PROCESS_AUTHORITY_GRANTED: NO
PRODUCTION_AUTHORIZED: NO
```
