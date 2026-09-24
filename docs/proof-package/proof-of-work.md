---
title: "proof-of-work"
type: "public-proof"
owner: "Hitsuyo Aku"
status: "active-public"
classification: "public"
approval_path: "issue-and-pull-request"
tags:
  - gitmoney/public-framework
  - gitmoney/proof
---

# Proof Of Work

## Purpose

Show the visible, inspectable work trail behind GitMoney OS.

## Plain-English Job

Document the actual public repositories, pull requests, issues, commits, and branch protections that prove GitMoney OS was built and tested in production rather than written as theoretical documentation.

## Owner

Red Pillar and Hitsuyo Aku, under KnowTheLedge.

This is not a polished marketing narrative. It is the operating evidence that the concept has been built, reviewed, corrected, and promoted through GitHub.

## Live Public Evidence

- Public framework repo: `https://github.com/GitMoneyOS/gitmoney-public-framework`
- Public founder demo: [`docs/demo/plain-english-github-founder-demo.md`](../demo/plain-english-github-founder-demo.md)
- Public positioning approval packet: PR #1 (`GitMoneyOS/gitmoney-public-framework#1`)
- Public demo approval packet: PR #3 (`GitMoneyOS/gitmoney-public-framework#3`)
- Public demo screen-checkpoint cleanup: PR #4 (`GitMoneyOS/gitmoney-public-framework#4`)
- Public demo issue: Issue #2 (`GitMoneyOS/gitmoney-public-framework#2`)

## Operating Repositories

GitMoney OS defines a multi-repository topology separating public surfaces from private machinery:

| Repository | Role | Visibility | Governance Boundary |
|---|---|---|---|
| `gitmoney-public-framework` | Public skeleton, open standard, consulting entry | Public | Open source (Apache-2.0) |
| `gitmoney-os` | Source doctrine, skill system, operating backbone | Private | Proprietary |
| `gitbuilt-workbooks` | Training material, student labs, curriculum | Private | Proprietary |
| `identity-forensics-lab` | Diagnostic tools, client audit engine | Private | Proprietary |
| `sovereign-creator-system` | Core SaaS runtime and identity infrastructure | Private | Proprietary |
| `the-mothership` | Master policy, executive locks, and cybernetic memory | Private | Proprietary |

## Commit & Pull Request Evidence

The GitMoney OS development record demonstrates:

1. **Atomic commits:** Each commit performs one bounded transformation with an explicit message.
2. **Reviewable PRs:** Every change is packaged into a pull request containing context, changed files, and checks.
3. **Automated CI checks:** Pull requests run classification guards and evidence linters to prevent data leaks.
4. **Receipts:** Substantial changes emit structured receipts detailing changes, verification, and rollback paths.

```text
ENTITY: proof-of-work.md
ROLE: Repository topology and public evidence registry
OWNER: Hitsuyo Aku
STATUS: active-public
CLASSIFICATION: public
APPROVAL_PATH: issue-and-pull-request
MERGE_AUTHORIZED: NO
DEPLOYMENT_AUTHORIZED: NO
```
