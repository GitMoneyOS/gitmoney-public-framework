# Changelog

All notable GitMoney changes for this repo will be tracked here.

## 0.9.0-beta.4 - LOCAL PATCH CANDIDATE (amended 2026-09-26)

### Beta-Line Patch Candidate: Autonomy Readiness Gate
- **Autonomy Readiness Gate:** Added a one-process guide and worksheet, a schema-backed candidate manifest and CLI evaluation, fictional examples, and contextual routes through the public framework and starter operator.
- **Authority boundary:** Results are candidate guidance only. They do not verify evidence, certify safety, grant tool access, or authorize production actions.
- **Owner scoring decisions:** Confirmed both rules in `docs/diagnostics/autonomy-readiness-scoring-ruling.md`: one point per current evidence-supported check, and S1/S2/S3 each at least `4` plus explicit authority and action limits for a Level 2 candidate.
- **Scope enforcement:** Level 2 and higher candidates now require nonblank permitted-tool, read, write, allowed-data, and forbidden-data scopes; contradictory permitted/forbidden entries block. The positive verdict is now `OWNER REVIEW REQUIRED`.
- **Review and release state:** Fresh-context review returned `HOLD` findings on scope enforcement, verdict language, and stale fixture claims. The local candidate now addresses those findings, and a final fresh-context recheck is pending. Beta.4-specific RC evidence remains unrun. No cold-founder usability test is included and no usability result is claimed. This candidate is unreleased; beta.3 remains the active public release.
- **Execution Boundary and Authority Revocation:** Added versioned grant/runtime-state/action/trigger/receipt contracts and a deterministic reference evaluator. A declared trigger produces a frozen next state, increments the authority epoch, and denies subsequent stale or consequential actions. The CLI does not intercept external tools or establish provider-level revocation; RC-06 and adapter evidence remain pending.
- **Promotion and Execution separation:** The public model now states that promotion controls whether a result becomes official and execution controls whether an actor may continue acting. The three rooms remain unchanged; the law set adds `Revocation outruns escalation`.
- **Version promotion:** Local candidate version advanced from `0.9.0-beta.3` to `0.9.0-beta.4` at the owner's direction to package this as a beta-line patch update.

## 0.9.0-beta.3 - 2026-09-24

### Beta.3 Release: Pre-RC Gap Closure, Windows Portability & Governed AI Work Protocol
- **Windows Portability Hardening:** Normalized path handling across `scripts/gitmoney.mjs`, `scripts/repo-security-scan.mjs`, and conformance tests to POSIX standards; added `windows-latest` runner to GitHub Actions CI matrix.
- **OpenSSF Scorecard Remediation:** Resolved default branch scanning failure by bumping Scorecard action to `v2.4.4` and enabling default-branch push events with zero-token public analysis.
- **Downstream Secret Guard:** Added sensitive path and token pattern detection into `starter/scripts/gitmoney.mjs` and adopter doctor audits.
- **RC Trial Evidence Machinery:** Created Draft-07 machine receipt schema (`schemas/rc-trial-receipt.schema.json`) and four standardized trial kits (`tests/rc-trials/RC-01` through `RC-04`) for empirical validation.
- **Support & Commercial Boundaries:** Documented clear open-source versus paid commercial support boundaries in `SECURITY.md` and `docs/quickstart.md`.
- **Governed AI Work Protocol Positioning:** Reframed framework entry point around 3 Rooms (Source Memory, Agent Workbench, Official Record), 2 Artifacts (Action Envelope Contract, Execution Receipt), and 3 Laws (Capability != Authority, Context != Canon, Completion != Proof) with the 96-Hour Founder Freeze Test.
- **Version Promotion:** Promoted framework specification from `0.9.0-beta.2` to `0.9.0-beta.3`.

## 0.9.0-beta.2 - 2026-09-24

### Beta.2 Release: Hardened Public Operational Skeleton
- **System 5 Owner Gate Resolved:** Historical publication risk formally dispositioned as `OWNER_ACCEPTED` (Decision DEC-001) with zero destructive git history rewrites.
- **Node.js Compatibility Matrix:** CI evidence gate expanded to test Node 18, 20, and 22 across doctor and conformance test suite.
- **Executable Version Coherence:** Canonicalized schema versions (`0.1.0`) and operator version (`0.1.0`); doctor enforces version coherence on every run with negative test fixtures.
- **Pre-1.0 Compatibility Law:** Added `docs/compatibility-policy.md` defining 0.x breaking change contract, version property decoupling, and 1.0+ SemVer commitments.
- **Deterministic Tracked-File Security Scan:** Added `scripts/repo-security-scan.mjs` auditing all 207 tracked files in CI for zero private sources, 0 configured secret pattern matches, and zero classification leaks.
- **Telemetry Calibration:** Removed unsupported aspirational time claims across all documentation surfaces.
- **Version Promotion:** Promoted framework specification from `0.9.0-beta.1` to `0.9.0-beta.2`.

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
