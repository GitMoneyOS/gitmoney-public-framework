# Live GitHub Settings Runbook

Status: owner decision packet
Classification: Internal until owner acceptance, then Public
Owner: GitMoneyOS owners
Purpose: separate mergeable repository changes from live settings that cannot be proven by files alone
Approval class: 3, explicit owner approval required
Lifecycle: run after the self-annealing pull request merges, then verify monthly

## Rule

Do not mark a setting complete until its live GitHub page or API response has been inspected after the change.

## 1. License Decision

Decision required before adding `LICENSE`:

- open-source code license plus a separate documentation license
- one permissive license for the whole repository
- a source-available or noncommercial documentation license
- all rights reserved with explicit reuse permissions

Evidence needed: intended commercial reuse, contribution policy, source-document treatment, and owner or counsel preference.

No agent should choose this on the owners' behalf.

## 2. Private Contact Channels

Publish monitored private routes for:

- security reports
- conduct reports
- commercial intake involving private evidence

Acceptance:

- owner named
- response cadence named
- privacy notice or minimum-data rule stated
- public issues explicitly excluded for sensitive details

## 3. GitHub Discussions

Proposed categories:

1. Ask GitMoney
2. First Official Assets
3. GitBuilt Show-and-Tell, disabled until pilot gates pass

Category form candidates live in `.github/DISCUSSION_TEMPLATE/`. GitHub requires each filename to match the category slug. After enabling Discussions and creating categories, confirm the rendered forms and moderation owners.

Acceptance evidence:

- `has_discussions: true`
- category URLs
- form render screenshots or URLs
- moderation owner and cadence

## 4. GitHub Pages And Homepage

Candidate source: `/docs` on `main`.
Candidate page: `docs/index.html`.

After owner approval and merge:

1. Enable Pages from the approved source.
2. Wait for the deployment to pass.
3. Set the repository homepage to the deployed URL.
4. Check mobile, keyboard, and screen-reader landmarks.
5. Confirm every primary CTA resolves.

Acceptance evidence:

- successful Pages deployment
- live homepage URL
- repository homepage field
- accessibility and link check

## 5. Social Preview

Candidate: `docs/assets/gitmoneyos-social-preview.png`, `1280 × 640`.

After owner visual approval, upload it through repository settings. Confirm the image is legible at small card sizes and does not imply an unsupported outcome.

Acceptance evidence: current social-preview screenshot from repository settings.

## 6. Security Features

Observed at the start of this cycle:

- private vulnerability reporting disabled
- Dependabot security updates disabled
- secret scanning and push protection reported disabled

Owners should review plan availability, false-positive handling, notification ownership, and recovery process before enabling features.

Acceptance evidence:

- live status for each feature
- alert owner
- response and review cadence
- any unavailable feature recorded as a limitation, not success

## 7. Actions Policy

The branch pins all third-party Actions to full commit SHAs. The observed repository policy allowed all Actions and did not require SHA pinning.

Owner decision:

- keep all Actions allowed with file-level SHA enforcement
- restrict to GitHub-owned Actions
- create an explicit allowlist for `actions/checkout` and `actions/github-script`

Acceptance evidence:

- live Actions policy response
- successful contract workflow
- successful governor workflow dispatch
- no broader permission than the workflow job requires

## 8. First Release

Recommended first release occurs only after:

- self-annealing pull request accepted
- license and contact decisions closed
- contract workflow passes on `main`
- owner-approved title, version, and release notes
- claim boundary reviewed

The release should name what is present, what is experimental, and what remains staged. It should not imply validated client, sponsor, income, security, valuation, investment, or transaction outcomes.

## Owner Decision Record

| Decision | Approve | Edit | Reject | Evidence |
| --- | --- | --- | --- | --- |
| License |  |  |  |  |
| Private security channel |  |  |  |  |
| Private conduct channel |  |  |  |  |
| Private commercial intake |  |  |  |  |
| Discussions and categories |  |  |  |  |
| Pages and homepage |  |  |  |  |
| Social preview |  |  |  |  |
| Security features |  |  |  |  |
| Actions restriction |  |  |  |  |
| First release |  |  |  |  |
