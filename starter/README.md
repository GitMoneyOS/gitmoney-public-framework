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
3. Delegate execution to an AI workbench or human contributor.
4. Review the pull request and verify the accompanying ICM Receipt.
5. Promote approved records into the company record.
