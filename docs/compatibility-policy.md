---
title: "Compatibility Policy and Versioning Law"
type: "policy"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
  - governance
  - compatibility
---

# GitMoney OS Pre-1.0 Compatibility Policy

## Purpose

Define the versioning law, contract boundaries, breaking change policies, and migration expectations for the GitMoney OS Public Framework during the pre-1.0 development cycle.

## Pre-1.0 (0.x) Operating Law

During the 0.x cycle (including beta and release-candidate phases):

1. **Breaking changes are permitted but must be documented.** Structural enhancements to contracts, schemas, or directory layouts may occur between minor or patch pre-releases.
2. **Every breaking change requires:**
   - A version increment in the relevant version property;
   - An explicit entry in [CHANGELOG.md](../CHANGELOG.md) documenting what changed, why, and how to adapt;
   - An updated conformance test verifying the changed contract.
3. **No automated migration engine exists before 1.0.** Migrations between 0.x versions are manual and documented. Do not simulate or claim automated database or scaffold migration tooling before 1.0 without verified code on disk.

## Version Properties and Contract Layers

GitMoney OS manifests (`gitmoney.yaml`) decouple framework, operator, and schema contracts into distinct fields:

| Field | Contract Scope | Example | Description |
| :--- | :--- | :--- | :--- |
| `spec_version` | Framework specification | `0.9.0-beta.1` | The active version of the GitMoney OS public framework contract. |
| `installed_spec_version` | Adopter baseline | `0.9.0-beta.1` | The framework version that was originally initialized in the adopter repository. |
| `operator_version` | Public operator contract | `0.1.0` | The contract version of `gitmoney-public-operator` declared in its frontmatter. |
| `schema_version` | Machine schema family | `0.1.0` | The canonical version shared by all Draft-07 JSON schemas in `schemas/`. |

### Doctor Version Coherence Invariant

The repository doctor (`node scripts/gitmoney.mjs doctor`) enforces strict version coherence on every run:

- `manifest.operator_version` MUST exactly match the `version` property in the frontmatter of `gitmoney-public-operator/SKILL.md`.
- `manifest.schema_version` MUST exactly match the `x-gitmoney-schema-version` property of every canonical schema on disk.
- Any mismatch is a **HARD FAIL** preventing CI advancement.

## 1.0+ Stability Promise

Upon reaching `v1.0.0`:

1. **Semantic Versioning 2.0.0** applies strictly.
2. **Backwards Compatibility:** Breaking changes to schemas, manifest properties, or operator contracts will NOT occur within the 1.x major version series.
3. **Deprecation Window:** Deprecations will be announced at least one minor release prior to removal.
4. **Automated Migration Tooling:** Any migration required between 1.x minor versions will be supported with automated doctor remediation or migration scripts.

## Entity Card

```text
ENTITY: docs/compatibility-policy.md
ROLE: Canonical Pre-1.0 Compatibility Law and Version Contract
OWNER: Hitsuyo Aku
STATUS: active-public
CLASSIFICATION: public
APPLICABLE_PHASES: 0.x (pre-1.0) and 1.0+
MIGRATION_SUPPORT: Manual and documented before 1.0
```
