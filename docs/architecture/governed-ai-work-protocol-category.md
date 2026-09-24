---
title: "governed-ai-work-protocol-category"
type: "public-architecture"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
  - gitmoney/architecture
  - category-definition
---

# Governed AI Work Protocol: Category Definition & Competitive Map

## Purpose

Define the specific market category and architectural boundary occupied by GitMoney OS within the enterprise AI ecosystem.

## The Category Blade

GitMoney OS is not an "AI Operating System," an "agent framework," or a "GitHub tutorial kit."

**GitMoney OS is the open protocol for deciding how AI-assisted work becomes legitimate company knowledge.**

Its core category thesis:
> **AI agents already have capabilities. Businesses still need a chain of command.**
> **The goal is not giving AI more memory. The goal is deciding which memory becomes institutional truth.**

## The 2026 Market Shift: From Assistance to Execution

Enterprise AI has shifted from conversational chatbots to autonomous execution:
- **OneTrust 2026 AI-Ready Governance Report:** 87% of surveyed organizations encourage AI agent use, but only 47% report clear governance, oversight, and controls. Only 5% report clear accountability across the AI lifecycle, and 28% experienced multiple incidents of unapproved AI actions.
- **Deloitte 2026 Emerging Tech Study:** Only 21% of organizations report mature agentic governance. 70% state they do not feel they can trust and govern agents, and 72% cite lack of unified, accessible data as an operational obstacle.
- **Frontier Platforms & Enterprise Memory:** While platforms like OpenAI Frontier and Meta's Organizational Second Brain focus on providing durable context and institutional memory, they do not solve the authority problem.

The economic problem is no longer: *"Can AI perform useful work?"*  
The economic problem is: *"How does a company allow AI to perform useful work without silently losing context, authority, accountability, provenance, and institutional memory?"*

## The Competitive Map: Where GitMoney Sits

GitMoney OS does not compete with adjacent infrastructure. It sits beneath policy and above individual agent execution:

| Layer | Dominant Technologies | What They Own | Where GitMoney Sits |
|---|---|---|---|
| **Agent Guidance** | `AGENTS.md`, Cursor Rules | Project instruction standard | **Consume the standard.** GitMoney embeds and adheres to `AGENTS.md`. |
| **Procedural Skills** | Anthropic Agent Skills | Portable procedure packages | **Consume the format.** `gitmoney-public-operator` is a thin, portable skill. |
| **Tool / Context Bridge** | MCP (Model Context Protocol) | Connect agents to data & tools | **Govern promotion.** GitMoney dictates what retrieved context is permitted to become official truth. |
| **Spec & Work Tracking** | GitHub Spec Kit, Kiro | Specify -> Plan -> Execute | **Define business intent.** GitMoney contracts define the business accountability behind the specification. |
| **Runtime Execution** | GitHub Agentic Workflows, OpenAI Agents SDK, LangGraph | Execution, pause, run orchestration | **Govern approval objects.** Let engines execute; GitMoney defines the contract and receipt required for promotion. |
| **Agent Identity & Entitlements** | Microsoft Entra Agent ID, Okta | Auth, entitlements, lifecycle | **Define meaning & canon.** They answer who/what can access; GitMoney answers what the work means and when it becomes truth. |
| **Enterprise GRC** | OneTrust, Audit platforms | High-level compliance policy | **Execution grammar.** GitMoney is the operational protocol beneath policy and above individual agent runs. |
| **Organizational Memory** | OpenAI Frontier, Meta Second Brain | Durable enterprise context | **Authority boundary.** GitMoney establishes that *memory without authority is just organized context.* |

## The Promotion Boundary

Access control dictates what an agent may touch. Runtime orchestration dictates how an agent runs.  
**GitMoney owns the Promotion Boundary:**

```text
PRIVATE THOUGHT (Source Memory)
       |
       v
CANDIDATE WORK (Agent Workbench)
       |
       v
EVIDENCE & GATES (Doctor, Conformance, Scans)
       |
       v
OWNER DECISION (Human Approval Gate)
       |
       v
INSTITUTIONAL RECORD (Official Git History)
```

## The Transmissible Transmission: 3 Rooms / 2 Artifacts / 3 Laws

The deep cybernetic engine block (POL, VSM, ICM, IFL) remains the internal engine. The transmissible public interface is compressed into three undeniable primitives:

### Three Rooms
1. **Source Memory (`templates/starter-vault/`):** Private thinking room. Rough notes, founder intuition, unverified drafts. Local-first, private by default.
2. **Agent Workbench (`starter/`):** Bounded execution room. Governed lanes, execution contracts, tools, tests. Where humans and agents collaborate on candidate work.
3. **Official Record (GitHub):** Institutional canon. Commits, pull requests, owner reviews, verified receipts. Where work becomes legitimate company knowledge.

### Two Artifacts
1. **ICM Execution Contract:** Bounded scope, designated owner, allowed context, and explicit non-goals *before* consequential work begins.
2. **ICM Receipt:** Cryptographic audit record detailing changed files, passed verification checks, unresolved exceptions, and owner sign-off *after* consequential work terminates.

### Three Laws
1. **Capability != Authority:** Possession of tool bindings or code capabilities never equals permission to execute or decide.
2. **Context != Canon:** Background context provided to an agent is informational; it never self-promotes into binding doctrine.
3. **Completion != Proof:** An agent declaring work complete does not prove an enterprise state transition occurred.

## Core Messaging Territories

1. **Authority:** *"The agent can do it. That does not mean the agent is allowed to."*
2. **Institutional Memory:** *"Your AI does not need more memory. Your business needs a way to decide which memory becomes truth."*
3. **Proof:** *"Completion is not proof."*
4. **Underlying Reality:** *"AI does not remove organizational dysfunction. It industrializes it."*
