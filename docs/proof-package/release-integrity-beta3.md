---
title: "release-integrity-beta3"
type: "public-proof"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
  - gitmoney/proof
  - release-integrity
---

# Release Artifact Integrity Record: v0.9.0-beta.3

## Purpose

Provide deterministic, inspectable integrity evidence for the frozen GitMoney OS Public Framework v0.9.0-beta.3 release baseline.

## Plain-English Job

Document the cryptographic commit SHA, git tag object SHA, platform immutability status, and source archive checksums so downstream adopters and RC trial participants can verify they are testing and adopting the exact ratified release bytes without modification.

## Governance & Immutability Classification

```text
BASELINE_POLICY: FROZEN
TAG_NAME: v0.9.0-beta.3
TAG_TARGET: VERIFIED (PENDING_TAG_PROMOTION)
RELEASE_MUTATION_AUTHORIZED: NO
PLATFORM_IMMUTABILITY: NOT_ENFORCED
```

> [!IMPORTANT]
> GitMoney OS maintains strict distinction between policy and mechanism:
> - **Policy Enforcement:** System 5 policy declares this baseline FROZEN. No further architectural mutations are authorized.
> - **Platform Mechanism:** GitHub Release API reports `immutable: false` and repository rulesets report `[]` (no native tag lock ruleset configured). Platform immutability is therefore accurately reported as `NOT_ENFORCED`.

## Cryptographic Identifiers

| Object | Identifier / Digest | Evidence Source |
|---|---|---|
| **Merge Commit SHA** | (Recorded upon PR merge) | `git rev-parse HEAD` on `main` |
| **Annotated Tag Object** | (Recorded upon tag creation) | `git rev-parse v0.9.0-beta.3` |
| **Tag Target Commit** | (Recorded upon tag creation) | `git rev-parse v0.9.0-beta.3^{commit}` |
| **GitHub Release** | [v0.9.0-beta.3 Pre-Release](https://github.com/GitMoneyOS/gitmoney-public-framework/releases/tag/v0.9.0-beta.3) | GitHub Releases API |

## Verification Instructions

To verify your local worktree matches this exact baseline:

```bash
# 1. Fetch tag and verify commit
git fetch --tags origin
git rev-parse v0.9.0-beta.3^{commit}

# 2. Verify git archive checksum
git archive --format=tar v0.9.0-beta.3 | shasum -a 256
```
