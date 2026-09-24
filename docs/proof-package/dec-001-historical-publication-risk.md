---
title: "DEC-001: Historical Publication Risk Disposition"
type: "decision"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "System 5 Owner Ruling"
tags:
  - gitmoney/public-framework
  - governance
  - decisions
---

# Owner Decision Record: DEC-001

- **Decision ID:** DEC-001
- **Title:** Disposition of Historical Publication Risk for v0.9.0-beta.2
- **Date:** 2026-09-24
- **Authority:** Hitsuyo Aku (System 5 / Owner Ruling)
- **Status:** ACCEPTED (OWNER_ACCEPTED)

## Context

Prior commits in repository history (ancestors 8d62ca89, fca78ddb, 4ebc89bd) contained early student and training framework materials prior to formal boundary hardening. HEAD commit has been fully sanitized with deterministic scans verifying zero private source references, zero credentials/secrets, and zero restricted classification leaks across all 207 tracked files.

## Ruling

**OWNER_ACCEPTED.**

The owner rules that repository continuity shall be preserved. No destructive Git history rewrites (such as git-filter-repo or force-pushing to main) are authorized. Historical publication is acknowledged and accepted as legacy public record.

## Consequences

1. Advancement from v0.9.0-beta.1 to v0.9.0-beta.2 is authorized.
2. The Security Score advances from 10.5/15 to 13.5/15 (+3.0 weighted delta).
3. The overall Executive Score advances from 82.5 to 85.5/100, legitimately clearing the 85-point Beta.2 release gate.
4. Downstream clones, forks, and commit history remain stable and unbroken.

```text
DECISION_ID: DEC-001
AUTHORITY: System 5 (Hitsuyo Aku)
RULING: OWNER_ACCEPTED
GATE_STATUS: RESOLVED
ADVANCEMENT_AUTHORIZED: v0.9.0-beta.2
```
