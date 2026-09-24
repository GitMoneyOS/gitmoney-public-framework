# Changelog

All notable GitMoney changes for this repo will be tracked here.

## 0.9.0-beta.1 - 2026-09-24

### Beta Release: Feature-Complete Operational Skeleton
- **Pre-1.0 Compatibility Law:** Added [`docs/compatibility-policy.md`](docs/compatibility-policy.md) defining version contract layers, breaking change rules, and migration expectations.
- **Self-Contained Downstream Install:** `init` bundles `scripts/` and `schemas/` into the adopter workspace, enabling standalone execution of `node scripts/gitmoney.mjs doctor` without upstream repo dependencies.
- **Draft-07 Schema Validation:** Added zero-dependency validation engine (`scripts/schema-validator.mjs`) enforcing Draft-07 schemas for `gitmoney.yaml`, ICM contracts, and ICM receipts with 33 automated conformance tests.
- **Immutable Action Pinning:** Pinned all GitHub Actions workflows to immutable commit SHAs across `.github/workflows/`.
- **Unified Entrypoint:** Added `scripts/gitmoney.mjs` with `init <dir> [--with-vault]`, `init --here`, and `doctor`.
- **Framework Manifest:** Pinned `SPEC_VERSION` (0.9.0-beta.1) and created root `gitmoney.yaml` configuration manifest with Draft-07 schema validation.
- **Canonical Scaffolds:** Finalized `templates/starter-vault/` (Source Memory private room) and `starter/` (AI Office agent workbench).
- **Public Operator Skill:** Introduced `gitmoney-public-operator` at `starter/.agents/skills/gitmoney-public-operator/SKILL.md` to operate the open skeleton with zero private skill dependencies.
- **Boundary Hardening:** Replaced student reference corpus with public protocol stubs; purged proprietary heuristics, scoring, and orchestration logic.
- **Security Policy:** Added `SECURITY.md` defining supported versions, private reporting channels, and zero-credential invariants.
- **Two Canonical Adoption Paths:** Unified documentation in `docs/quickstart.md` into New Project and Existing Project paths.

## 2026-07-13

- Added Week 0 student preparation for the GitBuilt lesson: docs/students/ai-office-source-pack/week-0-agentic-systems-first-principles.md.
- Updated the public source-pack index, onboarding curriculum path, and README so students can find the preparation lesson before Week 1.

## 2026-07-03

- Added the capstone synthesis class to the AI Office source pack: `docs/students/ai-office-source-pack/capstone-cybernetic-revenue-loop.md`.
- Updated the source pack README so the four lessons ladder into the capstone and the loop diagram closes through revenue signal back to new evidence.

## 2026-06-22

- Performed repository audit and documented governance gaps.
- Created `docs/proof-package/self-audit-summary-2026-06-22.md`.
- Identified metadata drift and changelog lag as key risks.

## 2026-06-11

- Promoted AI Office source pack for students.
- Added student-facing skill system and starter vault.
- Expanded `docs/students/` directory with official records and orientation materials.

## 2026-05-22

- Created initial GitMoneyOS repository baseline.
