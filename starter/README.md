# My AI Office

This repository uses the GitMoney OS open operating skeleton to govern AI-assisted business work.

## Structure
- `01_research/`: Source notes, raw problem intake, and customer observations.
- `02_architecture/`: Decision records, interface contracts, and execution plans.
- `03_build/`: Bounded implementation code, tests, and completed receipts.
- `.agents/skills/`: Reusable task definitions and instructions for autonomous tools (includes [`gitmoney-public-operator`](.agents/skills/gitmoney-public-operator/SKILL.md)).
- `_generated/`: Staging area for AI drafts awaiting human review.

## Operating Workflow
1. Operate using [`gitmoney-public-operator`](.agents/skills/gitmoney-public-operator/SKILL.md).
2. Define the task using an ICM Execution Contract.
3. For consequential delegated work, bind an owner-issued authority grant to a verified runtime adapter. Read [`docs/authority-revocation.md`](docs/authority-revocation.md).
4. Delegate execution only through the adapter and retain its authority and action receipts.
5. Review the pull request and verify the accompanying ICM Receipt.
6. Promote approved records into the company record.
