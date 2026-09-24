---
title: "release-integrity-beta2"
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

# Release Artifact Integrity Record: v0.9.0-beta.2

## Purpose

Provide deterministic, inspectable integrity evidence for the frozen GitMoney OS Public Framework v0.9.0-beta.2 release baseline.

## Plain-English Job

Document the cryptographic commit SHA, git tag object SHA, platform immutability status, and source archive checksums so downstream adopters can verify they are testing and adopting the exact ratified release bytes without modification.

## Governance & Immutability Classification

```text
BASELINE_POLICY: FROZEN
TAG_NAME: v0.9.0-beta.2
TAG_TARGET: VERIFIED (0d25a7b17b44c2f725ac49bccd409f6b59e3390d)
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
| **Merge Commit SHA** | `0d25a7b17b44c2f725ac49bccd409f6b59e3390d` | `git rev-parse HEAD` on `main` |
| **Annotated Tag Object** | `f6a1386b948d90afbcf37b3f884ac625911c2859` | `git rev-parse v0.9.0-beta.2` |
| **Tag Target Commit** | `0d25a7b17b44c2f725ac49bccd409f6b59e3390d` | `git rev-parse v0.9.0-beta.2^{commit}` |
| **GitHub Release** | [v0.9.0-beta.2 Pre-Release](https://github.com/GitMoneyOS/gitmoney-public-framework/releases/tag/v0.9.0-beta.2) | GitHub Releases API |

## Source Archive Checksums (SHA-256)

Deterministic cryptographic digests computed across archive formats:

```text
git archive tar (uncompressed):
1f7ffd3f91e5e1fb70229e7d6a19a7ea870e9d56f4cd973bc0a52348c5cc5114

git archive tar.gz:
7db075cdd7e4103124fc18fc1678bbb874d983b96afa67254e1ac5a05da77d08

GitHub Generated tar.gz (refs/tags/v0.9.0-beta.2.tar.gz):
47cf83efbacff98c55dbda5bb221dbf26bfb83681e741e0235b21d0dcb058c91

GitHub Generated zip (refs/tags/v0.9.0-beta.2.zip):
f12b8959b936ac91724cea17952a1878686e52476366f40779c6900b381894ae
```

## Verification Instructions

To verify your local worktree matches this exact baseline:

```bash
# 1. Fetch tag and verify commit
git fetch --tags origin
git rev-parse v0.9.0-beta.2^{commit}
# Expected: 0d25a7b17b44c2f725ac49bccd409f6b59e3390d

# 2. Verify git archive checksum
git archive --format=tar v0.9.0-beta.2 | shasum -a 256
# Expected: 1f7ffd3f91e5e1fb70229e7d6a19a7ea870e9d56f4cd973bc0a52348c5cc5114
```
