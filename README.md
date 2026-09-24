# GitMoney OS Public Framework

**The open protocol for governed AI-assisted business work.**

GitMoney OS is not an AI operating system, a prompt pack, a Notion template, an agent orchestration framework, or a GitHub tutorial kit. It is an open protocol for deciding how AI-assisted work becomes legitimate company knowledge.

> **AI agents already have capabilities. Businesses still need a chain of command.**  
> **The goal is not giving AI more memory. The goal is deciding which memory becomes truth.**

---

## The Transmissible Standard: 3 Rooms / 2 Artifacts / 3 Laws

GitMoney OS compresses enterprise agent governance into three undeniable primitives:

### Three Rooms
- **Source Memory (`templates/starter-vault/`):** Private thinking room. Rough notes, unverified drafts, and founder doctrine. Private by default.
- **Agent Workbench (`starter/`):** Bounded execution room. Scaffolds, execution contracts, tools, and test suites. Where candidate work is shaped.
- **Official Record (GitHub):** Institutional canon. Commits, pull requests, owner reviews, and verified receipts. Where work becomes legitimate company knowledge.

### Two Artifacts
- **Contract before work:** [`templates/icm-execution-contract.md`](templates/icm-execution-contract.md) defines scope, owner, allowed inputs, and non-goals before execution begins.
- **Receipt after work:** [`templates/icm-receipt.md`](templates/icm-receipt.md) records what changed, passed verification gates, remaining exceptions, and owner sign-off after execution completes.

### Three Laws
1. **Capability != Authority:** Possession of tool access does not equal permission to execute.
2. **Context != Canon:** Background information provided to an agent does not equal binding company truth.
3. **Completion != Proof:** Reporting a task complete does not prove an enterprise state transition occurred.

---

## Where GitMoney Sits in the Agent Stack

GitMoney OS does not compete with adjacent infrastructure. It sits beneath policy and above individual agent execution:

- **MCP** answers: *What can the agent connect to?*
- **AGENTS.md** answers: *What should the agent know?*
- **Anthropic Agent Skills** answer: *How should the agent perform a procedure?*
- **GitHub Spec Kit & Kiro** answer: *What should be built and how should work progress?*
- **GitHub Agentic Workflows & OpenAI SDK** answer: *How does the agent execute?*
- **Microsoft Entra Agent ID & Okta** answer: *Who is the agent and what can it access?*
- **GitMoney OS answers:** *When does AI-assisted work become official company truth?*

GitMoney owns the **Promotion Boundary**:
```text
PRIVATE THOUGHT -> CANDIDATE WORK -> EVIDENCE -> OWNER DECISION -> INSTITUTIONAL RECORD
```

---

## Three Core Principles

1. **Authority:** The agent can do it. That does not mean the agent is allowed to.
2. **Institutional Memory:** Your AI does not need more memory. Your business needs a way to decide which memory becomes truth. Memory without authority is just organized context.
3. **Proof:** Completion is not proof. AI does not remove organizational dysfunction. It industrializes it.

---

## Two Canonical Adoption Paths

```text
PATH A: NEW PROJECT (Start Fresh)
node scripts/gitmoney.mjs init <dir> [--with-vault]
       |
       v
Complete AI Office scaffold + optional private Source Memory vault

PATH B: EXISTING PROJECT (Adopt into Existing Repo)
cd your-existing-project/
node path/to/scripts/gitmoney.mjs init --here
       |
       v
Adds AGENTS.md, 00_COCKPIT.md, gitmoney.yaml, and public operator non-destructively
```

Read [`docs/quickstart.md`](docs/quickstart.md) for the step-by-step adoption guide.

---

## The Underlying Architecture

The public three-layer skeleton is governed by an integrated cybernetic stack:
1. **Primal Ontological Loop (POL):** State what the business commits to and how it learns from its own work.
2. **Viable System Model (VSM):** Define operating functions, accountable owners, coordination, control, intelligence, and policy authority.
3. **Interpretable Context Methodology (ICM):** Organize context, stage contracts, artifacts, and handoffs for bounded jobs.
4. **Identity Forensics Lab (IFL):** Investigate evidence, design interventions, and compare results with prior states.

Read [`docs/architecture/pol-vsm-icm-ifl-stack.md`](docs/architecture/pol-vsm-icm-ifl-stack.md) and [`docs/architecture/governed-ai-work-protocol-category.md`](docs/architecture/governed-ai-work-protocol-category.md) for the complete operational map.

---

## What to Inspect

- [`START-HERE.md`](START-HERE.md): Founder orientation and the 96-Hour Founder Freeze Test.
- [`docs/quickstart.md`](docs/quickstart.md): Step-by-step setup guide for your governed AI office.
- [`docs/proof-package/release-integrity-beta2.md`](docs/proof-package/release-integrity-beta2.md): Cryptographic release baseline evidence.
- [`docs/compatibility-policy.md`](docs/compatibility-policy.md): Pre-1.0 compatibility law and version contracts.
- [`docs/open-source-boundary.md`](docs/open-source-boundary.md): What is open source, what is not, and why.
- [`docs/private-machine-boundary.md`](docs/private-machine-boundary.md): Proprietary machine boundaries.
- [`templates/starter-vault/`](templates/starter-vault/): Canonical public Source Memory starter scaffold.
- [`starter/`](starter/): Canonical public AI Office starter scaffold.
- [`starter/.agents/skills/gitmoney-public-operator/`](starter/.agents/skills/gitmoney-public-operator/SKILL.md): Thin public operator skill.
- [`schemas/`](schemas/): Draft-07 JSON schemas for contracts, receipts, and RC trials.
- [`scripts/`](scripts/): Public CLI validation tools for doctor, security, and conformance.

---

## Support Boundary & Scope

Community bug reports and framework defect reports are triaged on GitHub.

- **Open Source Scope:** Defect fixes, documentation corrections, schema validation improvements, and compatibility patches.
- **Paid Engagement Scope:** Implementation consulting, proprietary architecture adaptation, private skill authoring, and forward-deployed installation.
- **Consulting Inquiries:** For commercial architecture work, see [Work with Hitsuyo Aku](#work-with-hitsuyo-aku) below.

---

## Work with Hitsuyo Aku

The public framework defines the open standard. When an enterprise requires private diagnostic and execution infrastructure:

- **Identity Forensics Audit ($20,000):** Comprehensive forensic investigation of founder bottlenecks and operational memory leaks.
- **Architecture Sprint ($7,500):** Narrow, bounded resolution of a single architectural question.
- **Sovereign Reconstruction (from $50,000):** Contracted forward-deployed build scoped after diagnostic evidence.
- **Signal & Dependency Governance ($10,000/mo):** Ongoing cybernetic governance and drift control.

Review the [Commercial Translation](docs/commercial-translation.md) guide or apply directly at [https://architect.hitsuyoaku.io](https://architect.hitsuyoaku.io/sovereign-brand-os-audit).

```text
ENTITY: GitMoney OS Public Framework
LAYER: Governed AI Work Protocol / Public Standard Layer
OWNER: Hitsuyo Aku
STATE: Active public framework (v0.9.0-beta.3)
PRIMARY_PAID_ENTRY: Identity Forensics Audit ($20,000)
BOUNDED_PAID_DIAGNOSTIC: Architecture Sprint ($7,500)
PAID_BUILD: Sovereign Reconstruction (FROM $50,000)
ONGOING_GOVERNANCE: Signal & Dependency Governance ($10,000/mo)
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
LICENSE_BOUNDARY: Apache-2.0 applies strictly to GitMoneyOS/gitmoney-public-framework
```
