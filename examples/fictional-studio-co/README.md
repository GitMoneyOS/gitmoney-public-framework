# Fictional Studio Co. Example Implementation

This directory provides a fully worked demonstration of the GitMoney OS open operating skeleton applied to a fictional creative-technical agency ("Fictional Studio Co.").

## The Business Problem
Fictional Studio Co. was struggling with founder dependency:
- The founder was personally answering every onboarding question for new clients.
- Contractors were guessing how to set up client shared drives and Slack channels.
- Work had no durable record or receipt.

## How GitMoney OS Resolved It
1. **Contract:** The founder issued an ICM Execution Contract (`contracts/TASK-001-client-onboarding-sop.md`) bounding the scope of a new standard operating procedure.
2. **Execution:** An AI agent drafted the SOP strictly inside allowed context.
3. **Receipt:** The agent produced an inspectable receipt (`receipts/RECEIPT-001-client-onboarding-sop.md`) proving checks ran cleanly.
4. **Approval:** The founder reviewed the PR and merged the deliverable into `deliverables/client-onboarding-sop.md`.

## Key Files to Inspect
- [`00_COCKPIT.md`](00_COCKPIT.md): The founder's live operating dashboard.
- [`AGENTS.md`](AGENTS.md): Agency-specific agent rules.
- [`contracts/TASK-001-client-onboarding-sop.md`](contracts/TASK-001-client-onboarding-sop.md): Pre-work contract.
- [`receipts/RECEIPT-001-client-onboarding-sop.md`](receipts/RECEIPT-001-client-onboarding-sop.md): Post-work receipt.
- [`deliverables/client-onboarding-sop.md`](deliverables/client-onboarding-sop.md): Final promoted asset.
