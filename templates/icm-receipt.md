# ICM Receipt: [TASK-ID]

## Header
- **Task ID:** [TASK-ID]
- **Job:** [Brief description of task]
- **Executor:** [Agent / Developer]
- **Owner:** [Accountable Human Owner]
- **Date:** [YYYY-MM-DD]
- **Commit SHA:** [Git Commit Hash]
- **Branch:** [Branch Name]
- **Status:** [DRAFT | VERIFIED | OWNER_APPROVED | PROMOTED | HELD]

## 1. What changed (Modifications Executed)
| File | Action | Summary of Change |
|---|---|---|
| `path/to/file` | Created / Modified | Brief description of changes |

## 2. Verification Gates Passed
- [ ] Classification Guard: PASSED
- [ ] Copy Rails Check: PASSED
- [ ] Link Integrity: PASSED
- [ ] Test Suite: PASSED

## 3. Exceptions & Unresolved Questions
- [None, or describe any open decisions requiring human owner judgment]

## 4. Execution Boundary Evidence
- **Grant ID / Version:** [or `NONE`]
- **Authority Epoch Before / After:** [values]
- **Runtime Adapter and Version:** [name/version, or `NOT_BOUND`]
- **Trigger Observed:** [trigger ID/type, or `NONE`]
- **Revocation Receipt:** [durable locator and digest, or `NONE`]
- **Next Consequential Action Denied:** [action ID and adapter evidence, or `NOT_APPLICABLE`]
- **In-Flight Actions:** [state and evidence; do not imply revocation undid a completed action]
- **Reauthorization:** [new decision and grant version, or `NOT_REAUTHORIZED`]
- **Proof Boundary:** [state what this receipt proves and what it does not prove]

## 5. Next Owner Action
```text
RULING: [ APPROVE_AND_MERGE | REQUEST_REVISIONS | HOLD ]
ROLLBACK: git revert [COMMIT_SHA] -m 1
```
