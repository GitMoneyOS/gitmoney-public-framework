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
