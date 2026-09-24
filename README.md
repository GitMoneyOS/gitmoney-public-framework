# GitMoney OS Public Framework

**A plain-language pattern for governing AI-assisted business work in GitHub.**

This repository is free to read. A public repository can show how the framework is organized; it does not by itself grant permission to copy, adapt, or redistribute the material. Consult a published license for those rights if one is added.

GitMoney OS is one implementation path within Hitsuyo Aku's Enterprise Systems Architecture practice. It helps a founder-led team put source material, decisions, staged work, and reviewable changes where the right people can find them. The framework has been developed through Hitsuyo Aku's own operating system and bounded pilot work. Each new organization must validate its own workflows, security controls, permissions, and outcomes.

## The architecture it serves

1. **Primal Ontological Loop (POL):** state what the business is, what it commits to, and how it learns from its own work.
2. **Viable System Model (VSM):** identify operating functions, accountable owners, coordination, control, future intelligence, and policy authority.
3. **Interpretable Context Methodology (ICM):** organize the context, stage contracts, artifacts, and handoffs an agent or person needs for a bounded job.
4. **Identity Forensics Lab (IFL):** investigate evidence, design interventions, and compare results with the prior state.

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

This is an **example of context organization**, not a security perimeter or a universal required folder tree. File placement can help an agent select relevant material. Technical access depends on separately configured repository permissions, tool capabilities, runtime authorization, and data boundaries. A written instruction can say what an agent should do; a separate control must limit what it can actually do.

## One bounded change

For a consequential task, record:

1. **Source and problem:** what was observed, where it came from, and what remains uncertain.
2. **Owner and authority:** who can decide, who can act, and which approval applies to this exact change.
3. **Stage and handoff:** what input is allowed, what output is expected, and who receives it next.
4. **Implementation and check:** the smallest relevant change, the checks appropriate to the repository, and what those checks actually cover.
5. **Receipt:** the version, result, exceptions, rollback path, and next decision.

Git commits and pull requests can make changes inspectable. They do not make a claim true, a deployment safe, or client material publishable on their own. A separate reviewer and owner decision are needed where the work warrants them.

## Work with Hitsuyo Aku

The **$20,000 Identity Forensics Audit** is the main paid entry to the Enterprise Systems Architecture service. Qualified buyers can [review the Audit and apply directly](https://architect.hitsuyoaku.io/sovereign-brand-os-audit). A separate **$7,500 Architecture Sprint** addresses a narrower immediate architecture question; [ask about its current scope](https://architect.hitsuyoaku.io/contact?tier=v2-diagnose-architecture-sprint). Smaller Diagnostic scopes can be offered where a narrower investigation fits. Sovereign Reconstruction is a contracted build scoped after the Audit, starting at $50,000; ongoing governance is separately contracted.

This framework is the free resource for learning how the architecture organizes work. Reading or adopting it does not by itself establish a financial return or security guarantee.
