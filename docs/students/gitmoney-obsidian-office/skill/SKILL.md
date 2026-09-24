---
name: gitmoney-obsidian-office
description: Student-facing helper skill for operating a GitMoney Obsidian Office vault. Connects Source Memory to agent workbenches and GitHub records.
type: public-framework
owner: Hitsuyo Aku
status: active-public
classification: public
---

# GitMoney Obsidian Office Skill

## Purpose

Provide student and beginner guidance for working inside a GitMoney Obsidian Office vault environment.

## Canonical Public Operator

The primary, canonical public operator for the open-source skeleton is:

[`gitmoney-public-operator`](../../../../starter/.agents/skills/gitmoney-public-operator/SKILL.md)

This student skill serves as a localized teaching guide for the Week 2 student exercises.

## The Three Layers

The core architecture follows three layers:

- **Obsidian is private memory:** Raw captures, notes, and drafts live safely here.
- **Agent platforms are workbenches:** Scoped agent jobs produce structured drafts with evidence.
- **GitHub is the official record:** Approved work lands in repositories, issues, and pull requests.

## Student Reference Guides

These references define public interface protocols:

| Reference | Purpose |
|---|---|
| [`operating-standard.md`](references/operating-standard.md) | Baseline frontmatter standard and asset test |
| [`vault-map.md`](references/vault-map.md) | Folder taxonomy and filing conventions |
| [`workbench-contract.md`](references/workbench-contract.md) | Bounded agent briefs and board stages |
| [`anti-patterns.md`](references/anti-patterns.md) | Common vault pitfalls and recovery habits |
| [`creative-operator-loop.md`](references/creative-operator-loop.md) | Idea development from capture to evidence |
| [`knowledge-to-asset-pipeline.md`](references/knowledge-to-asset-pipeline.md) | Five-step asset identification protocol |
| [`templates.md`](references/templates.md) | Note template structures |
| [`bases-standard.md`](references/bases-standard.md) | Standard database views |
| [`clipper-standard.md`](references/clipper-standard.md) | Web capture guidelines |
| [`agent-command-patterns.md`](references/agent-command-patterns.md) | Sample prompt patterns for agents |
| [`promotion-rules.md`](references/promotion-rules.md) | Preconditions and public safety checks |
| [`acceptance-rubric.md`](references/acceptance-rubric.md) | Verification checklist before sign-off |

## Universal Workflow

1. **Capture:** One idea per note in `00-inbox/`.
2. **Shape:** Add basic frontmatter and connect to relevant existing notes.
3. **Route:** Draft an agent brief for bounded tasks on the Workbench Board.
4. **Work:** Execute bounded tasks. Outputs remain drafts with evidence.
5. **Promote:** With explicit owner approval, prepare GitHub-ready artifacts per promotion rules.
6. **Review:** Run regular reviews to keep the inbox and board healthy.

## Hard Rules

- No agent job without a brief.
- No software deployment or coding without a project blueprint or specification.
- No publishing, merging, credential changes, or secret exposures without explicit owner approval.
- Every promoted asset requires an owner, approval path, evidence, reuse path, and lifecycle.

## Private Machine Boundary

This student skill teaches open protocols and manual conventions. Advanced operator intelligence, multi-agent orchestration, proprietary diagnostic scoring, client implementation playbooks, and production delivery engines belong exclusively to the private GitMoney machine.
