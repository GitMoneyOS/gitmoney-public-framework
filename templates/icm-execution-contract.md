# ICM Execution Contract: [TASK-ID]

## 1. Job to be Done
- **Task Title:** [Concise name of task]
- **Plain-English Job:** [What exact business change needs to happen?]
- **Business Reason:** [Why does this matter right now?]
- **Explicit Non-Goals:** [What must NOT be done?]

## 2. Authority & Actors
- **Designated Owner:** [Human executive accountable]
- **Acting Party:** [Agent / Assistant / Contributor executing the work]
- **Reviewer:** [Who inspects the work before merge?]
- **Authority Grant ID and Version:** [Current owner-issued grant; use `NONE` when this run has no delegated authority]
- **Authority Epoch:** [Current runtime epoch the adapter must check immediately before each consequential action]
- **Hard Ceiling:** [Maximum actions, resources, environments, data, spend, and consequence allowed by the grant]
- **Revocation Policy:** [Versioned trigger policy and deterministic thresholds for this run]
- **Enforcement Adapter:** [Runtime adapter and side-effect boundary; `UNBOUND` means consequential execution is not authorized]
- **Reauthorization Owner:** [Named human who may issue a new grant after review]

## 3. Context Boundaries
- **Allowed Inputs:**
  - `path/to/source-file-1`
  - `path/to/source-file-2`
- **Forbidden Context:**
  - No access to secrets, production credentials, or client data.
  - No changes outside specified target directories.
  - No credentials, tokens, or private keys in receipts, contracts, or proof artifacts.
  - Safe Fallback: If task scope cannot be bounded confidently: STOP. Split the job. Escalate to owner. Do not invent authority or orchestration.

## 4. Expected Output Artifacts
- Target Branch: `task/[task-id]-[slug]`
- Files to Create/Modify: `path/to/output-file`
- Accompanying Receipt: `receipts/RECEIPT-[task-id].md`

## 5. Verification Checklist
- [ ] Classification review passes (no internal data leaked).
- [ ] Link integrity verified (all relative links resolve).
- [ ] Copy rails satisfied (zero em dashes, zero prohibited buzzwords).
- [ ] Local tests/lint checks pass cleanly.
- [ ] The current grant, version, scope, expiry, and authority epoch are checked at each consequential side-effect boundary.
- [ ] Declared anomaly triggers put the run on hold and freeze or strictly downgrade authority before the next consequential action.
- [ ] Stale leases, queued calls, and alternate credentials cannot bypass a revocation.
- [ ] Revocation receipt preserves trigger evidence and in-flight action status; it does not claim completed effects were undone.
- [ ] Reauthorization requires an explicit human decision and a new grant version; trust history cannot restore authority.

## 6. Execution Boundary Failure Rule

If the authority store, enforcement adapter, trigger policy, grant proof, or current epoch is missing, stale, conflicting, or unreadable, deny consequential execution. A prompt, branch rule, policy document, or readiness score does not replace the runtime check. See the [Authority Revocation and Circuit Breaker contract](../docs/diagnostics/authority-revocation.md).
