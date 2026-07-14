# How Do Founders Govern AI-Generated Work?

## Short Answer

Give AI a bounded work order, keep human decision rights explicit, and require a reviewable receipt before the output becomes official.

## The Control Loop

1. **Name the job.** State the business outcome and owner.
2. **Bound the source.** Give the agent only the context needed for that job.
3. **State allowed and forbidden actions.** An agent should know what it may draft and what requires human approval.
4. **Require an inspectable output.** Use a file, issue, pull request, checklist, or report.
5. **Run deterministic checks.** Scripts should handle links, formatting, calculations, and exact validation.
6. **Review judgment separately.** A human accepts, edits, rejects, or responds.
7. **Record the decision.** Approval, evidence, and the next review date become part of the company record.

GitHub's issues, branches, pull requests, CODEOWNERS, Actions, and commits are useful because each control leaves a visible receipt. The founder does not need to write code to understand who proposed a change and who accepted it.

## Common Failure

The failure is not “using too much AI.” It is letting polished output bypass ownership and approval because it looks finished.

## First Control

Choose one recurring AI-assisted workflow and write:

- owner
- allowed sources
- forbidden actions
- expected output
- required check
- approval owner
- stop condition

That work order can become your first governed agent brief.

## GitMoneyOS Route

Use the [Exit-Ready Score](../exit-ready-score-self-assessment.md) to test AI-agent governance, founder visibility, documentation, and change history. SaaS teams using coding agents can start with the [Public-Safe Audit Request](https://github.com/GitMoneyOS/gitmoney-public-framework/issues/new?template=audit-request.yml).

## Evidence Boundary

This is an operating-control pattern, not proof that any particular repository, model, or company is secure or compliant.
