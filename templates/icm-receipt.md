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

## 4. Next Owner Action
```text
RULING: [ APPROVE_AND_MERGE | REQUEST_REVISIONS | HOLD ]
ROLLBACK: git revert [COMMIT_SHA] -m 1
```
