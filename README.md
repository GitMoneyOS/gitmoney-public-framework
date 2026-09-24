# GitMoney OS Public Framework

**An open-source public skeleton for governing AI-assisted business work.**

GitMoney OS is not a prompt pack, Notion template, AI automation recipe, GitHub tutorial, productivity system, or free calculator replacement. It is a plain-language operating pattern for turning source material, agent work, decisions, approvals, and receipts into inspectable business records.

This repository is the open-source part of the GitMoney OS ecosystem. It exists so the industry has a shared skeleton for governed AI-assisted business work. Reuse rights for this repository are governed by the published [`LICENSE`](LICENSE).

The public framework defines the open standard. The private GitMoney OS, Mothership, Skills, CAC, Audit, Delivery, SaaS, and client implementation systems remain proprietary operating machinery. A company pays when it needs the advanced private methods applied to its own context, evidence, workflows, people, permissions, and commercial constraints.

GitMoney OS is one implementation path within Hitsuyo Aku's Enterprise Systems Architecture practice. It helps a founder-led team put source material, decisions, staged work, and reviewable changes where the right people can find them. Each organization must validate its own workflows, controls, permissions, and outcomes.

## Start here if you are a buyer

If you are a founder, executive, operator, agency owner, or senior builder trying to understand why this matters, read [`START-HERE.md`](START-HERE.md) first.

Within 90 seconds, you should know:

- what expensive problem this framework addresses;
- whether the wound is yours;
- why GitMoney OS is the open public skeleton;
- what architecture governs the skeleton;
- what remains private;
- what proof you can inspect;
- what paid step comes next.

Within 10 minutes, inspect:

1. [`START-HERE.md`](START-HERE.md)
2. [`docs/architecture/pol-vsm-icm-ifl-stack.md`](docs/architecture/pol-vsm-icm-ifl-stack.md)
3. [`docs/proof-package/proof-index.md`](docs/proof-package/proof-index.md)
4. [`docs/open-source-boundary.md`](docs/open-source-boundary.md)
5. [`docs/private-machine-boundary.md`](docs/private-machine-boundary.md)
6. [`docs/proof-package/founder-verification-checklist.md`](docs/proof-package/founder-verification-checklist.md)
7. [`CONSULTING.md`](CONSULTING.md)

The skeleton is open. The living machine is paid.

## The architecture it serves

1. **Primal Ontological Loop (POL):** state what the business is, what it commits to, and how it learns from its own work.
2. **Viable System Model (VSM):** identify operating functions, accountable owners, coordination, control, future intelligence, and policy authority.
3. **Interpretable Context Methodology (ICM):** organize the context, stage contracts, artifacts, and handoffs an agent or person needs for a bounded job.
4. **Identity Forensics Lab (IFL):** investigate evidence, design interventions, and compare results with the prior state.

The public three-layer skeleton is governed by this deeper stack. Read [`docs/architecture/pol-vsm-icm-ifl-stack.md`](docs/architecture/pol-vsm-icm-ifl-stack.md) for the operational map.

**Interpretable Context Methodology is Jake Van Clief's work.** See the [original methodology repository](https://github.com/RinDig/Interpretable-Context-Methodology) and [paper](https://arxiv.org/html/2603.16021v2). Hitsuyo Aku used related files-in-folders logic before formally naming ICM as a component of this integrated architecture. Those earlier practices and this later adoption should not be mistaken for authorship of ICM.

## A working repository pattern

```text
your-ai-office/
├── AGENTS.md             # Task and behavior guidance
├── 00_COCKPIT.md         # Owner decisions and current work
├── 01_research/          # Sources, questions, and evidence
├── 02_architecture/      # Decisions, interfaces, and plans
├── 03_build/             # Bounded implementation work
├── .agents/skills/       # Reusable instructions, where installed
└── _generated/           # Draft outputs awaiting review
```

This is an example of context organization, not a security perimeter or a universal required folder tree. File placement can help an agent select relevant material. Technical access depends on separately configured repository permissions, tool capabilities, runtime authorization, and data boundaries. A written instruction can say what an agent should do; a separate control must limit what it can actually do.

## One bounded change

For a consequential task, record:

1. **Source and problem:** what was observed, where it came from, and what remains uncertain.
2. **Owner and authority:** who can decide, who can act, and which approval applies to this exact change.
3. **Stage and handoff:** what input is allowed, what output is expected, and who receives it next.
4. **Implementation and check:** the smallest relevant change, the checks appropriate to the repository, and what those checks actually cover.
5. **Receipt:** the version, result, exceptions, rollback path, and next decision.

Git commits and pull requests can make changes inspectable. They do not make a claim true, a deployment safe, or client material publishable on their own. A separate reviewer and owner decision are needed where the work warrants them.

## What to inspect

- [`docs/architecture/pol-vsm-icm-ifl-stack.md`](docs/architecture/pol-vsm-icm-ifl-stack.md): how POL, VSM, ICM, and IFL govern the public three-layer skeleton.
- [`docs/open-source-boundary.md`](docs/open-source-boundary.md): what is open source, what is not, and why.
- [`docs/buyer-paths/founder-dependency-map.md`](docs/buyer-paths/founder-dependency-map.md): map founder dependency wounds to the public skeleton and paid path.
- [`docs/proof-package/proof-index.md`](docs/proof-package/proof-index.md): claim-to-evidence table.
- [`docs/private-machine-boundary.md`](docs/private-machine-boundary.md): what is public, what remains private, and why.
- [`docs/templates/icm-execution-contract.md`](docs/templates/icm-execution-contract.md): bounded execution contract.
- [`docs/templates/icm-receipt.md`](docs/templates/icm-receipt.md): receipt template for work after completion.
- [`docs/templates/icm-conformance-checklist.md`](docs/templates/icm-conformance-checklist.md): verification checklist for bounded jobs.
- [`docs/commercial-translation.md`](docs/commercial-translation.md): how the open skeleton connects to the paid ladder.
- [`docs/quickstart.md`](docs/quickstart.md): set up your AI office in 20 minutes.
- [`templates/starter-vault/`](templates/starter-vault/): canonical public Source Memory starter scaffold (private thinking room).
- [`starter/`](starter/): canonical public AI Office starter scaffold (agent workbench and repository tree).
- [`templates/`](templates/): copy-paste starter files (AGENTS.md, 00_COCKPIT.md, contracts, receipts).
- [`examples/fictional-studio-co/`](examples/fictional-studio-co/): end-to-end worked example of an agency using the skeleton.
- [`schemas/`](schemas/): Draft-07 JSON schemas for contracts, receipts, and decision records.
- [`scripts/`](scripts/): public CLI validation tools for classification, link integrity, and copy rails.

## Work with Hitsuyo Aku

The **$20,000 Identity Forensics Audit** is the main paid entry to the Enterprise Systems Architecture service. Qualified buyers can [review the Audit and apply directly](https://architect.hitsuyoaku.io/sovereign-brand-os-audit). A separate **$7,500 Architecture Sprint** addresses a narrower immediate architecture question; [ask about its current scope](https://architect.hitsuyoaku.io/contact?tier=v2-diagnose-architecture-sprint). Smaller Diagnostic scopes can be offered where a narrower investigation fits. Sovereign Reconstruction is a contracted build scoped after the Audit, starting at $50,000; ongoing governance is separately contracted.

This framework is the open skeleton for learning how the architecture organizes governed AI-assisted business work. Reading or adopting it does not by itself establish a financial return, security guarantee, legal conclusion, investment claim, acquisition readiness, or client outcome.

```text
ENTITY: GitMoney OS Public Framework
LAYER: Open-source skeleton / public standard layer
OWNER: Hitsuyo Aku
STATE: Active public framework
PRIMARY_PAID_ENTRY: Identity Forensics Audit ($20,000)
BOUNDED_PAID_DIAGNOSTIC: Architecture Sprint ($7,500)
PAID_BUILD: Sovereign Reconstruction (FROM $50,000)
ONGOING_GOVERNANCE: Signal & Dependency Governance ($10,000/mo)
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
EVIDENCE: Inspectable GitHub issues, pull requests, checks, and receipts
LICENSE_BOUNDARY: Apache-2.0 applies strictly to GitMoneyOS/gitmoney-public-framework
```
