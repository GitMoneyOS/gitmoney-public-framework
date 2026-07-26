---
id: GUIDE-GITBUILT-WORKBOOK-02-ANSWERS
type: guide
status: active-internal
owner: "@Hitsuyo"
classification: internal
created: 2026-07-26
updated: 2026-07-26
---

# GitBuilt Workbook 2  -  Answer Key & Solution Guide

**Complete Solutions, Quiz Rationale, and Exercise Rubrics**  
*Workbook 2: Skills, Workflows & GitHub Repositories*

---

## How to Use This Solution Guide

This document provides the canonical answers for all module quizzes, model solutions for practical exercises, and full rationales for the 20-question Final Assessment in **GitBuilt Workbook 2**.

For exercises, model responses represent target benchmarks demonstrating expected technical depth. Student solutions may vary in implementation details while remaining fully correct if core engineering principles are met.

---

## Module Solutions & Rationale

### Module 1: Coding Agents & IDEs

#### Quiz Answers:
1. **Which coding agent is Anthropic's official terminal-based tool?**  
   - **Answer**: B) Claude Code  
   - **Rationale**: Claude Code is Anthropic's official CLI tool operating directly inside local git repositories via the terminal.

2. **What is the primary advantage of Cursor's Composer feature?**  
   - **Answer**: C) Multi-file generation from plain-English requirements  
   - **Rationale**: Composer evaluates cross-file dependencies and generates coordinated changes across multiple files simultaneously.

3. **Which tool is best described as an open-source AI pair programmer with deep Git integration?**  
   - **Answer**: C) Aider  
   - **Rationale**: Aider automates git commits for every AI-generated change set, maintaining a clean commit trail.

#### Exercise Model Solution:
- **Task**: Configure a terminal agent to write unit tests for a utility module.  
- **Model Output**: Run `claude` or `aider` in terminal, specify target test framework (e.g. Vitest/Jest), generate test coverage for edge cases, and run `npm test` locally to verify passing status before committing.

---

### Module 2: Agent Frameworks

#### Quiz Answers:
1. **Which framework provides graph-based stateful agent orchestration?**  
   - **Answer**: A) LangGraph  
   - **Rationale**: LangGraph structures agent logic as cycles and state graphs with built-in persistence.

2. **What is LlamaIndex primarily used for?**  
   - **Answer**: B) Connecting custom data to LLMs via RAG  
   - **Rationale**: LlamaIndex specializes in data ingestion, indexing, and retrieval-augmented generation.

3. **Which framework focuses on role-based agent crew delegation?**  
   - **Answer**: C) CrewAI  
   - **Rationale**: CrewAI assigns specific roles, goals, and tools to autonomous agents that collaborate on tasks.

#### Exercise Model Solution:
- **Task**: Define a 3-agent research crew.  
- **Model Output**: Researcher agent extracts raw facts -> Analyst agent checks data integrity -> Writer agent compiles plain-English report.

---

### Module 3: MCP Servers & Tooling

#### Quiz Answers:
1. **What does MCP stand for in modern AI architecture?**  
   - **Answer**: B) Model Context Protocol  
   - **Rationale**: MCP is an open standard created to standardize how LLMs connect to local and remote tools.

2. **How does Supabase MCP improve database workflows?**  
   - **Answer**: C) Inspects database schemas and runs SQL queries safely  
   - **Rationale**: Supabase MCP exposes structured tools for table inspection, migration check, and SQL execution.

3. **Which MCP platform bridges over 100 third-party SaaS apps?**  
   - **Answer**: A) Rube / Composio  
   - **Rationale**: Composio/Rube provides pre-built MCP tool integrations for major SaaS platforms.

---

### Module 4: Local AI & Infrastructure

#### Quiz Answers:
1. **Which CLI tool enables running open-weights models locally?**  
   - **Answer**: B) Ollama  
   - **Rationale**: Ollama packages model weights into local runners with a simple CLI and REST API.

2. **What is the main commercial reason to deploy local model inference?**  
   - **Answer**: C) Data privacy and zero per-token API costs  
   - **Rationale**: Local models process sensitive data on-premise without sending payload text to external APIs.

---

### Module 5: Design & Creative Skills

#### Quiz Answers:
1. **Which CSS property creates glassmorphism visual effects?**  
   - **Answer**: B) `backdrop-filter: blur(...)`  
   - **Rationale**: Backdrop-filter blurs the content behind an element to produce a translucent glass style.

2. **Why avoid arbitrary static pixel offsets in UI design?**  
   - **Answer**: A) Causes layout breaking across dynamic screen widths  
   - **Rationale**: Dynamic container bounds and relative units ensure responsiveness across devices.

---

### Module 6: Marketing & Content Skills

#### Quiz Answers:
1. **What is the primary requirement of plain-English copy rails?**  
   - **Answer**: C) Direct cost/wound claims with zero AI fluff words  
   - **Rationale**: Plain English copy states the exact business problem, consequence, and solution path clearly.

2. **Why must outbound email campaigns use secondary domain infrastructure?**  
   - **Answer**: B) Protects main domain deliverability and sender reputation  
   - **Rationale**: Isolates outbound sending volume from primary enterprise email domains.

---

### Module 7: Research & Intelligence

#### Quiz Answers:
1. **Which tool extracts clean Markdown from web pages and maps site structures?**  
   - **Answer**: B) Firecrawl  
   - **Rationale**: Firecrawl crawls websites and converts HTML into structured Markdown for LLM ingestion.

2. **What is the primary advantage of Exa search?**  
   - **Answer**: C) Neural and semantic search over web documents  
   - **Rationale**: Exa retrieves documents based on conceptual meaning rather than exact keyword matches.

---

### Module 8: Product & Building

#### Quiz Answers:
1. **What is the recommended WIP limit in GitBuilt operations?**  
   - **Answer**: B) Maximum 3 active tasks in Doing  
   - **Rationale**: Enforces focus and prevents context switching across active project lanes.

2. **What is the fastest way to validate a new AI micro-SaaS?**  
   - **Answer**: C) Deploy a functional MVP with Supabase Auth and Stripe Checkout  
   - **Rationale**: Direct commercial validation with live payment paths proves market willingness to pay.

---

## Final Assessment  -  Complete 20-Question Answer Key

1. **Claude Code**: Terminal CLI agent for direct repo manipulation.
2. **Cursor Composer**: Multi-file cross-repo generation.
3. **Aider**: Open-source CLI agent with git-commit integration.
4. **Model Context Protocol (MCP)**: Open standard for LLM tool integration.
5. **LangGraph**: Stateful graph-based multi-agent orchestration framework.
6. **Ollama**: CLI tool for local open-weights model inference.
7. **LlamaIndex**: RAG data framework for custom document retrieval.
8. **Local Inference Advantage**: Data privacy and zero per-token API fees.
9. **Glassmorphism**: Rendered via `backdrop-filter: blur(...)`.
10. **Plain-English Copy**: Clear wound, cost, and solution without AI fluff words.
11. **Firecrawl**: Web crawler that outputs structured Markdown.
12. **Supabase MCP**: Database schema discovery and SQL execution tool.
13. **WIP Limit Rule**: Cap at 3 active tasks in Doing.
14. **CrewAI**: Role-based multi-agent delegation framework.
15. **Modern Auth**: Supabase Auth / Better Auth for full-stack control.
16. **Container Queries**: Component-level responsive CSS styling.
17. **Apify**: Web scraping actor platform for lead lists.
18. **MVP First Step**: Define plain-text spec before coding.
19. **Exa**: Semantic neural web search.
20. **GitBuilt Operator**: Combines technical building skills with direct commercial distribution.
