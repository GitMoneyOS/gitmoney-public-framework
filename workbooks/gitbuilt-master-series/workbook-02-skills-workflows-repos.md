---
id: GUIDE-GITBUILT-WORKBOOK-02
type: guide
status: active-internal
owner: "@Hitsuyo"
classification: internal
created: 2026-07-26
updated: 2026-07-26
---

# GitBuilt Workbook 2  -  Skills, Workflows & GitHub Repositories

**The Definitive Guide to Building Your AI-Native Toolkit and Turning It Into Revenue**  
*2025 Edition | v2.0 | gitbuild.ai*

---

## Introduction & Architecture

Welcome to Workbook 2 in the GitBuilt series. This workbook acts as the bridge between understanding AI tools and actually building production systems with them. While Workbook 1 established the foundation of the GitBuilt philosophy, this workbook dives deep into the specific skills, agent frameworks, Model Context Protocol (MCP) servers, and repositories that form the core DNA of every successful AI-native builder.

The modern AI ecosystem is defined by three interconnected infrastructure layers:
1. **Coding Agents**: AI agents that operate directly inside your codebase to write, refactor, and test production software.
2. **MCP Servers (Model Context Protocol)**: Protocols that grant AI models secure, structured access to real-world APIs, databases, and filesystem tools.
3. **Agent Frameworks**: Orchestration systems that manage complex multi-step, multi-agent workflows.

The second half of this workbook (the **GitMoney** section) details how each technical layer directly connects to revenue across creative design, marketing automation, research intelligence, and rapid product shipping.

---

## Module Breakdown

### Module 1: THE DNA  -  Coding Agents & IDEs
- **Claude Code**: Anthropic's terminal-native CLI agent operating directly within local repositories.
- **Cursor**: AI-native IDE featuring multi-file Composer completions and deep codebase index context.
- **Aider**: Open-source terminal AI pair programmer with git-commit integration and multi-file diff capabilities.
- **Windsurf**: Next-generation flow-based AI IDE combining agentic actions with interactive chat.

#### Key Concept Exercises:
1. Compare terminal-native agents (Claude Code / Aider) with IDE-integrated agents (Cursor / Windsurf) for multi-file refactoring.
2. Build a local git repository workflow where an AI agent authors unit tests and commits changes atomically.

---

### Module 2: THE DNA  -  Agent Frameworks
- **LangChain & LangGraph**: State-machine orchestration for multi-step agentic graphs and persistent memory.
- **LlamaIndex**: Data framework for connecting custom data sources to large language models via RAG.
- **AutoGen**: Microsoft's framework for building multi-agent conversational swarms.
- **CrewAI**: Role-based agent orchestration framework for autonomous task delegation.

#### Key Concept Exercises:
1. Design a role-based 3-agent swarm (Researcher, Writer, Auditor) using plain-English task definitions.
2. Implement state persistence so an agentic graph resumes execution after human approval.

---

### Module 3: THE DNA  -  MCP Servers & Tooling
- **Model Context Protocol (MCP)**: Open standard connecting LLMs to external data sources and tools.
- **Supabase MCP**: Database queries, schema migrations, and authentication rule management.
- **GitHub MCP**: Repository management, issue tracking, PR reviews, and CI workflow triggering.
- **Rube / Composio MCP**: Multi-app integrations spanning Airtable, Notion, Stripe, and Google Workspace.

#### Key Concept Exercises:
1. Configure an MCP client to perform read-only schema discovery before generating SQL queries.
2. Build an automated PR review tool using GitHub MCP.

---

### Module 4: THE DNA  -  Local AI & Infrastructure
- **Ollama**: Lightweight CLI for running open-weights models (Llama 3, Qwen 2.5, DeepSeek R1) locally.
- **LM Studio**: Desktop GUI for local LLM inference, embedding generation, and local API serving.
- **vLLM**: High-throughput GPU inference engine for self-hosted model serving.
- **Local RAG**: Privacy-preserving retrieval over local Markdown notes and documents.

#### Key Concept Exercises:
1. Set up a local Ollama instance serving a 7B parameter model to format text without external API costs.
2. Evaluate local vs cloud inference latency for offline data processing.

---

### Module 5: GIT MONEY  -  Design & Creative Skills
- **UI/UX Systems**: Modern design tokens, glassmorphism, HSL color palettes, and Google Fonts typography.
- **3D CSS & Motion**: GSAP micro-animations, dynamic hover states, and dynamic layout math.
- **Tailwind CSS v4**: CSS-first configuration and container query implementations.

#### Revenue Wedge:
High-end, dynamic landing page templates command $3,000–$7,500 per client build when paired with AI backend integration.

---

### Module 6: GIT MONEY  -  Marketing & Content Skills
- **Cold Email Infrastructure**: Secondary domain management, SPF/DKIM/DMARC setup, plain-text copy rails.
- **Copywriting**: Wound-first positioning, direct cost/wound claims, and clear call-to-action paths.
- **Content Factory**: Transmuting core technical assets into multi-channel documentation and educational posts.

#### Revenue Wedge:
Outbound lead generation systems and messaging frameworks yield $5,000/mo retainer contracts for B2B client acquisition.

---

### Module 7: GIT MONEY  -  Research & Intelligence
- **Apify**: Web scraping actors for directory extraction and lead list generation.
- **Firecrawl**: Structured page extraction, website mapping, and competitive intelligence audits.
- **Exa**: Semantic search and discovery over web sources.
- **OSINT & Stylometry**: Digital footprint analysis and identity verification.

#### Revenue Wedge:
Automated market intelligence briefs and competitive research reports sell for $1,500–$3,500 per diagnostic.

---

### Module 8: GIT MONEY  -  Product & Building
- **Core Stack**: HTML/JS, Next.js App Router, Vite, Supabase Auth/Database, Stripe Checkout.
- **Execution Loop**: Concept -> Plain-Text Spec -> AI Agent Build -> Local Verification -> Vercel/GCP Deploy.
- **WIP Limits**: Enforce maximum 3 active tasks in `Doing` to maintain high shipping velocity.

#### Revenue Wedge:
Micro-SaaS products and setup sprints deliver $10,000+ upfront project fees plus ongoing monthly maintenance.

---

## Quick Reference Cheat Sheet

| Skill / Tool | Ecosystem Layer | Primary Function | Commercial Output |
| :--- | :--- | :--- | :--- |
| **Claude Code** | Coding Agent | CLI repo manipulation & test generation | Rapid feature development |
| **Cursor Composer** | Coding Agent | Multi-file codebase refactoring | App scaffolding |
| **LangGraph** | Agent Framework | Stateful multi-agent graph orchestration | Enterprise AI workflows |
| **Supabase MCP** | Tooling (MCP) | Direct database execution & schema management | Full-stack backend wiring |
| **Ollama** | Local Infrastructure | Privacy-preserving local model inference | Zero-cost data processing |
| **Firecrawl** | Intelligence | Structured web data extraction | Market & competitor briefs |
| **Next.js + Stripe** | Product Engine | Full-stack web app deployment | Subscriptions & checkout |

---

## Final Assessment  -  20 Questions Overview

1. Which tool is Anthropic's official terminal CLI agent? (Claude Code)
2. What is the primary function of Cursor Composer? (Multi-file cross-repo generation)
3. Which open-source CLI pairs directly with git commits? (Aider)
4. What open standard connects LLMs securely to external APIs? (Model Context Protocol / MCP)
5. Which framework excels at stateful graph-based agent orchestration? (LangGraph)
6. What tool serves open-weights models locally via CLI? (Ollama)
7. How does LlamaIndex assist AI applications? (Structured data retrieval and RAG)
8. What is the main advantage of local model inference? (Data privacy and zero API costs)
9. Which CSS technique produces modern translucent UI elements? (Glassmorphism / backdrop-filter)
10. What is the core rule of plain-English marketing copy? (State the wound, cost, and proof without AI fluff)
11. How does Firecrawl differ from traditional web scrapers? (Converts web pages into clean Markdown and structured JSON)
12. What is the function of Supabase MCP? (Enables AI models to inspect schemas and run database queries)
13. What WIP limit rule prevents project stagnation? (Cap at 3 active tasks in Doing)
14. Which framework orchestrates role-based autonomous agent crews? (CrewAI)
15. What authentication provider replaces legacy OAuth for local-first apps? (Supabase Auth / Better Auth)
16. What is the primary benefit of container queries in modern CSS? (Component-level responsive design)
17. How does Apify assist outbound sales systems? (Automates structured data extraction from directories)
18. What is the first step in building a Next.js MVP? (Define plain-text spec and schema before writing code)
19. What is the role of Exa in research workflows? (Provides neural/semantic search over web documents)
20. What defines a GitBuilt operator? (Combining technical building capability with direct commercial distribution)
