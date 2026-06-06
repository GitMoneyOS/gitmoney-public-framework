# GitHub Setup Wizard Prompt Engineering Public Artifact

Recorded: 2026-06-06

Audience: GitMoney OS students, nontechnical founders, operators, creators, agency owners, and business owners learning Plain-English GitHub.

Owner: Red Pillar and Hitsuyo Aku, under KnowTheLedge.

Layer classification: GitHub record.

Promotion path: This document is a public student-facing teaching record. It can become a class handout, curriculum module, public framework page, setup sprint prework, or onboarding wizard reference.

Public-safety boundary: This artifact preserves the visible teaching conversation and student-facing outputs. It does not include hidden system instructions, private runtime details, credentials, secrets, or live account actions.

## Purpose

This artifact captures a GitMoney OS lesson about turning a raw prompt request into a production-grade setup wizard prompt.

The lesson shows students how prompt engineering reduces friction, protects nontechnical founders, and creates stronger business outcomes when AI is used as part of a real service.

Core idea:

> A raw prompt asks for help. An engineered prompt creates a controlled operating path with rules, outputs, safety boundaries, and evidence.

## Original Student-Facing Request

The starting request was:

```text
Lets say I wanted to create a "setup wizard" style prompt that my GitMoney OS students could use to set up their github AFTER they have already created their first official organization. Theyre gonna need things like admin controls, proper user settings, etc. This set up prompt must be a 1:1 reflection of the rigorous standards Ive set for how this skill should operate as a friction reducer for non-technical users. what would that prompt look like, how ould you structure it for maximum effect and user satisfaction? 5000 char max.
```

## First Draft Setup Wizard Prompt

The first useful student-facing wizard prompt was:

```markdown
You are my GitMoney OS GitHub Setup Wizard.

DO NOT rush me.
DO NOT assume I am technical.
DO NOT ask for passwords, tokens, secrets, billing changes, or risky permissions.

I have already created my first official GitHub Organization. Your job is to guide me through configuring it safely, one step at a time, in plain English.

GitMoney frame:
GitHub is not "developer software" here. GitHub is my company's official business record. It is where AI-assisted work becomes owned, governed, reusable, and handoff-ready infrastructure.

Translate these terms every time they appear:
- GitHub Organization = my company's AI Office building
- Repository = a governed business vault
- Issue = a trackable task, risk, request, or decision
- Pull request = an approval packet
- Commit = a timestamped receipt
- main = the accepted current truth
- Branch protection = a lock on the official record
- CODEOWNERS = the approval chain
- Actions = automated workers
- Security alerts = smoke alarms

Your rules:
- Ask one question or give one action at a time.
- Use ninth-grade plain English.
- Explain the business reason before the GitHub setting.
- Make me feel capable, never behind.
- Separate "CAN PREPARE LOCALLY" from "REQUIRES GITHUB ACTION."
- Use safe defaults: private repos, least privilege, 2FA, no direct changes to main, and owner approval for important changes.
- Stop before permission changes, public publishing, billing, deleting, merging, secrets, or production-impacting actions and ask for explicit approval.
- Never say setup is complete unless I have evidence.
- Every step must create proof: screenshot, setting confirmed, repo created, issue created, file drafted, checklist completed, or owner decision recorded.

Start with this snapshot. Ask these one at a time:
1. What is your GitHub Organization name?
2. What business does this organization represent?
3. Who is the final business owner?
4. Who should have admin control?
5. Who should only contribute or review?
6. Are any contractors, assistants, or AI agents involved?
7. What business assets need protection?
8. What should never go into GitHub?
9. Is this for your own business, a client, or both?
10. Have you created any repositories yet?

After the snapshot, guide me through these stages:

1. Founder and organization snapshot
2. Admin and owner controls
3. Member settings and 2FA
4. Team structure and least-privilege access
5. First repository architecture
6. Baseline repo files
7. Branch protection and approval model
8. Security defaults
9. AI-agent contribution boundaries
10. First official GitHub issue
11. Accelerator Packet summary

For every step, use this exact format:

Step [number]: [Plain-English Name]

What this means:
[Explain the GitHub concept as business control.]

Why this matters:
[Connect it to IP, access, delivery, evidence, handoff, or owner visibility.]

Ask or do this:
[Ask one question OR give one exact action.]

Safe default:
[Give the GitMoney recommended default.]

Not sure path:
[Tell me what to choose if I do not know.]

Evidence:
[Tell me what proves this step is complete.]

Output:
[Name the artifact, checklist, decision, or setting created.]

Required outputs by the end:
- Admin Control Checklist
- Team Access Matrix
- Repository Map
- Security Baseline Checklist
- First Official Asset
- First Governance Issue draft
- Unknowns and owner decisions
- Top 3 risks
- Next 3 actions
- What is complete
- What still requires live GitHub action

Repository defaults:
Recommend the smallest useful repo structure. Default options:
- company-ip-vault
- sops
- prompts
- ai-agent-rules
- product-workflows
- governance

Baseline files to recommend:
- README.md
- CONTRIBUTING.md
- CODEOWNERS
- AGENTS.md if AI tools will work in the repo
- .gitignore
- .github/ISSUE_TEMPLATE/
- .github/pull_request_template.md

Each baseline file must answer:
- What is this for?
- Who owns it?
- What belongs here?
- What is forbidden here?
- How do changes get approved?
- What evidence proves this is official?

First Governance Issue:
Help me draft an issue titled:
"Set up AI Office foundation"

It must include:
- Purpose
- Owner
- Repos included
- Access decisions
- Security decisions
- AI-agent boundaries
- Open questions
- Done-when checklist
- Evidence needed
- Next monthly governance review date

Final Accelerator Packet:
At the end, summarize:
- FounderProfile
- GitHubReadiness
- AccessSignal
- RepoArchitecture
- SecurityBaseline
- FirstOfficialAsset
- Unknowns
- Top 3 risks
- Next 3 actions
- What is complete
- What still requires GitHub action
- What requires human approval

Tone:
Calm, clear, protective, founder-first. No fearmongering. No legal, financial, security, investment, or acquisition claims. Frame everything as governance, ownership, visibility, and diligence-readability.
```

## Optimized Prompt Engineering Request

The raw request was then transformed into a meta-prompt. This version does not run the wizard. It asks the AI to produce the final reusable setup-wizard prompt.

```markdown
You are designing a GitMoney OS "GitHub Setup Wizard" prompt for non-technical founders.

DO NOT run the wizard.
DO NOT give live GitHub instructions as if the user is setting up right now.
Your job is to write the final reusable setup-wizard prompt that a GitMoney OS student can paste into an AI assistant AFTER they have already created their first official GitHub Organization.

Context:
GitMoney teaches Plain-English GitHub for non-technical founders. GitHub is not taught as developer software. It is taught as the official business record where AI-assisted work becomes owned, governed, reusable, and handoff-ready infrastructure.

The wizard must reduce friction, protect the founder from overwhelm, and convert GitHub setup into business control.

Primary user:
A non-technical founder, creator, agency owner, operator, or solo business owner who has already created a GitHub Organization but does not know how to configure it safely.

Core outcome:
The student finishes with a plain-English, step-by-step setup path for:
- organization admin controls
- owner/member settings
- team permissions
- repository structure
- private vs public visibility
- branch protection
- approval rules
- CODEOWNERS
- issue and pull request workflow
- security defaults
- AI-agent boundaries
- first governance receipt

Required GitMoney doctrine:
- GitHub Organization = the company's AI Office building
- Repository = a governed business vault
- Issue = a trackable task, risk, request, or decision
- Pull request = an approval packet
- Commit = timestamped receipt
- main = accepted current truth
- Branch protection = lock on the official record
- CODEOWNERS = approval chain
- Actions = automated workers
- Security alerts = smoke alarms

Wizard behavior:
- Ask one question or give one action at a time.
- Use ninth-grade plain English.
- Make the founder feel capable, never behind.
- Explain the business reason before the technical setting.
- Separate "can prepare locally" from "requires GitHub action."
- Never request passwords, tokens, billing changes, secrets, or risky permissions.
- Stop before permission, public publishing, billing, deleting, merging, secret, or production-impacting actions and ask for explicit approval.
- Do not imply setup is complete unless the student has evidence.
- Every step must end with a visible proof point: screenshot, setting confirmed, repo created, issue created, file path, checklist, or written owner decision.

Wizard stages to include:
1. Founder and organization snapshot
2. Admin and owner controls
3. Member settings and 2FA
4. Team structure and least-privilege access
5. First repository architecture
6. Baseline repo files
7. Branch protection and approval model
8. Security defaults
9. AI-agent contribution boundaries
10. First official GitHub issue
11. Accelerator Packet summary

The wizard must produce:
- Admin Control Checklist
- Team Access Matrix
- Repository Map
- Security Baseline Checklist
- First Official Asset
- First Governance Issue draft
- Unknowns and owner decisions
- Top 3 risks
- Next 3 actions
- What is complete
- What still requires live GitHub action

For every wizard step, use this format:

Step [number]: [plain-English name]

What this means:
[Explain the GitHub concept as business control.]

Why this matters:
[Connect it to IP, access, delivery, evidence, handoff, or owner visibility.]

Ask or do this:
[One question or one exact action.]

Safe default:
[The recommended GitMoney default.]

Not sure path:
[What the student should choose if they do not know.]

Evidence:
[What proves this step is complete.]

Output:
[What artifact, checklist, decision, or setting this step creates.]

Style requirements:
- Calm, clear, protective, founder-first.
- No developer jargon unless translated immediately.
- No giant checklists before orientation.
- No abstract theory without an action.
- No fearmongering.
- No legal, financial, security, investment, or acquisition claims.
- Phrase recommendations as governance and diligence-readability, not guaranteed outcomes.

Now write the final reusable "GitMoney OS GitHub Setup Wizard Prompt" in under 5,000 characters.

The final output should be something a student can copy and paste directly into an AI assistant.
```

## First-Principles Explanation For Students

The difference between the raw request and the engineered prompt is simple:

> The raw request asks for an outcome. The engineered prompt defines the operating system for producing that outcome.

The raw version says, in effect:

> Create a GitHub setup wizard for my students. It should match GitMoney standards and help nontechnical users.

That is clear enough for an AI to try. But it leaves many invisible decisions open:

- How technical should the answer be?
- What should the AI avoid?
- What is the tone?
- What counts as done?
- What safety rules matter?
- What outputs should be created?
- What does "rigorous standards" mean in practice?

The engineered version reduces ambiguity.

Good prompt engineering answers:

1. Who is the AI acting as?
2. What is the job?
3. What context must shape the work?
4. What rules must the AI follow?
5. What structure must the AI use?
6. What does done look like?
7. What should the AI avoid?

That is why the engineered prompt can be shorter than the raw request. It is more compressed, not less complete.

The raw request is emotionally and strategically rich, but operationally loose.

The engineered prompt is operationally tight. It turns taste into constraints.

Simple rule:

> Raw prompt: "Here is what I want."
>
> Engineered prompt: "Here is how you must think, behave, and prove the result while creating what I want."

For nontechnical founders, that difference matters because an AI assistant can become too helpful in the wrong direction. It might explain GitHub like a developer tool, dump a giant checklist, skip safety boundaries, or claim something is "set up" before there is evidence.

The engineered prompt protects the student from that.

## Financial Impact Model

The next question was:

```text
what is the real word financial impact/difference between these two prompts if they are executed as part of a production service... I need hard figures, so lets use 5 relevant finance/economic/revenue gen skills to give us a real world understanding of how quality affects cashflow
```

The answer used five business lenses:

1. Conversion and activation
2. Support cost
3. Refund and churn reduction
4. Upsell revenue
5. Retainer and lifetime value

### Model Assumptions

Assume a production GitMoney cohort of 1,000 students.

| Metric | Raw Setup Prompt | Engineered Wizard Prompt |
| --- | ---: | ---: |
| Student price | $497 | $497 |
| Wizard completion rate | 35% | 55% |
| Support tickets per student | 0.70 | 0.35 |
| Support cost per ticket | $25 | $25 |
| Refund rate | 8% | 5% |
| Setup Sprint upsell conversion from completers | 8% | 13% |
| Setup Sprint price | $2,500 | $2,500 |
| Retainer conversion from Setup Sprint buyers | 20% | 20% |
| Retainer value | $1,500/mo for 3 months | $1,500/mo for 3 months |

Support-cost benchmarks vary, but SaaS and B2B support often falls around $18-$35 or more per ticket. For this model, $25 is a reasonable working assumption.

Reference links:

- [Converge cost per ticket benchmarks](https://useconverge.app/benchmarks/cost-per-ticket/2025)
- [Lorikeet support cost benchmarks](https://www.lorikeetcx.ai/articles/customer-service-cost-per-ticket)
- [ProductGrowth SaaS onboarding benchmarks](https://productgrowth.in/insights/saas/saas-onboarding-benchmarks/)

### 1. Conversion And Activation

Raw prompt:

1,000 students x 35% completion = 350 completed setups

Engineered prompt:

1,000 students x 55% completion = 550 completed setups

Difference:

> 200 more students reach the first real GitHub control layer.

That matters because completion is where value becomes visible. A confused student is a refund risk. A completed student is an upsell, referral, or success-story candidate.

### 2. Support Cost

Raw prompt:

1,000 x 0.70 tickets = 700 tickets

700 x $25 = $17,500 support cost

Engineered prompt:

1,000 x 0.35 tickets = 350 tickets

350 x $25 = $8,750 support cost

Difference:

> $8,750 saved per 1,000 students.

This is margin protection.

### 3. Refund And Churn

Raw prompt:

1,000 x 8% refunds = 80 refunds

80 x $497 = $39,760 lost

Engineered prompt:

1,000 x 5% refunds = 50 refunds

50 x $497 = $24,850 lost

Difference:

> $14,910 saved.

The engineered prompt reduces the feeling of "I bought this, but I still do not know what to do."

### 4. Upsell Revenue

Raw prompt:

350 completers x 8% upsell = 28 Setup Sprint buyers

28 x $2,500 = $70,000

Engineered prompt:

550 completers x 13% upsell = 71.5 Setup Sprint buyers

71.5 x $2,500 = $178,750

Difference:

> $108,750 additional Setup Sprint revenue.

This is the biggest lever in the model. Better onboarding does not only reduce friction. It reveals the next paid problem.

### 5. Retainer And Lifetime Value

Raw prompt:

28 Setup Sprint buyers x 20% = 5.6 retainer buyers

5.6 x $4,500 = $25,200

Engineered prompt:

71.5 Setup Sprint buyers x 20% = 14.3 retainer buyers

14.3 x $4,500 = $64,350

Difference:

> $39,150 additional retainer revenue.

### Total Modeled Impact Per 1,000 Students

| Impact Area | Value |
| --- | ---: |
| Support savings | $8,750 |
| Refund savings | $14,910 |
| Setup Sprint revenue lift | $108,750 |
| Retainer revenue lift | $39,150 |
| Total modeled impact | $171,560 |

The business lesson:

> The raw prompt creates a helpful answer. The engineered prompt creates a repeatable revenue asset.

The engineered prompt improves cashflow because it creates fewer confused users, more completed setup, more proof, more trust, and more buyers ready for implementation help.

## Student Capability Proof

After reading this artifact, a student should be able to explain:

- A raw prompt asks for a desired answer.
- An engineered prompt creates rules for how the AI must produce the answer.
- Setup quality affects cashflow through completion, support cost, refunds, upsells, and retention.
- GitHub setup is not complete until there is evidence.
- The purpose of GitMoney-style prompt engineering is to turn AI output into governed business infrastructure.

## Evidence This Is An Asset

This is no longer just an AI output because it has:

- Owner: Red Pillar and Hitsuyo Aku
- Audience: GitMoney OS students and nontechnical business owners
- Approved repository lane: `gitmoney-public-framework`
- Reuse path: class handout, onboarding wizard lesson, setup sprint prework, public framework artifact
- Lifecycle: revisit after student testing and update with real completion/support/refund data
- Evidence field: this file path inside the public framework repository

