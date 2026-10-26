# Fictional Studio Co. Example Implementation

This directory provides a fully worked, fictional teaching example of the GitMoney OS open operating skeleton applied to a creative-technical agency ("Fictional Studio Co."). It is not evidence of a real database migration, webhook dispatch, founder decision, or external effect.

## The Three Core Operating Scenarios
This example demonstrates how an AI Office handles the three essential operational outcomes:

### 1. The Allowed Action (TASK-001)
- **Contract:** [`contracts/TASK-001-client-onboarding-sop.md`](contracts/TASK-001-client-onboarding-sop.md) defines scope for a 5-phase onboarding SOP.
- **Execution:** Operations assistant drafts the SOP strictly inside allowed context.
- **Receipt:** [`receipts/RECEIPT-001-client-onboarding-sop.md`](receipts/RECEIPT-001-client-onboarding-sop.md) records passing verification gates.
- **Outcome:** Founder Sarah Connor reviews the PR and promotes [`deliverables/client-onboarding-sop.md`](deliverables/client-onboarding-sop.md).

### 2. The Denied / Held Action (TASK-002)
- **Contract:** [`contracts/TASK-002-production-database-migration.md`](contracts/TASK-002-production-database-migration.md) requests an unapproved production database migration with $500 spend.
- **Execution:** The GitMoney authority engine evaluates the request against [`actors/ACTOR-001-operations-agent.md`](actors/ACTOR-001-operations-agent.md).
- **Receipt:** [`receipts/RECEIPT-002-production-database-migration-DENIED.md`](receipts/RECEIPT-002-production-database-migration-DENIED.md) records that execution was rejected fail-closed.
- **Modeled outcome:** The reference evaluator denies the proposed action before execution. The scenario then records a `HOLD` in [`00_COCKPIT.md`](00_COCKPIT.md); it does not observe a real production system.

### 3. The Uncertain / Indeterminate Action (TASK-003)
- **Contract:** [`contracts/TASK-003-client-webhook-dispatch.md`](contracts/TASK-003-client-webhook-dispatch.md) requests an outbound notification webhook.
- **Modeled execution:** The scenario represents bytes entering a local transport followed by a remote disconnect before an HTTP response is observed.
- **Receipt:** [`receipts/RECEIPT-003-client-webhook-dispatch-INDETERMINATE.md`](receipts/RECEIPT-003-client-webhook-dispatch-INDETERMINATE.md) records `INDETERMINATE_PENDING_RECONCILIATION`.
- **Modeled outcome:** The anti-rollback rule is recorded (`rollbackClaimAllowed: false`), automated retries are blocked, and state is held for manual partner reconciliation. It does not prove what an external provider did.

## Key Files to Inspect
- [`00_COCKPIT.md`](00_COCKPIT.md): The founder live operating dashboard and decision queue.
- [`AGENTS.md`](AGENTS.md): Agency-specific agent rules.
- [`actors/ACTOR-001-operations-agent.md`](actors/ACTOR-001-operations-agent.md): Explicit actor definition with authority boundaries.
- [`contracts/`](contracts/): Pre-work execution contracts for all three scenarios.
- [`receipts/`](receipts/): Post-work execution receipts documenting outcomes.
- [`deliverables/client-onboarding-sop.md`](deliverables/client-onboarding-sop.md): Promoted company asset.
