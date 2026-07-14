# Live GitHub Settings Runbook

Status: owner-approved staged execution packet
Classification: Public
Owner: GitMoneyOS owners
Purpose: separate mergeable repository changes from live settings that cannot be proven by files alone
Approval class: 3, explicit owner approval required
Lifecycle: apply the pre-merge controls recorded below; run the remaining steps after the self-annealing pull request merges; verify monthly

## Rule

Do not mark a setting complete until its live GitHub page or API response has been inspected after the change.

## 1. License Decision — Approved

- Apache-2.0 for code, workflows, scripts, forms, and configuration.
- CC BY 4.0 for approved public documentation and templates.
- Source doctrine, marks, logos, social-preview branding, third-party material, client material, and private or internal assets excluded.
- Copyright 2026 Red Pillar and Hitsuyo Aku, jointly.

The controlling scope map is [LICENSE.md](../../LICENSE.md). Owners should obtain legal review before relying on the map for a material transaction or enforcement decision.

## 2. Private Contact Channels — Names Approved, Delivery Test Open

The owner, backup, access, cadence, minimum-data, conflict, and activation rules live in [PRIVATE-CHANNELS.md](../../PRIVATE-CHANNELS.md).

- `security@hitsuyoaku.tech`
- `conduct@hitsuyoaku.tech`
- `audit@hitsuyoaku.tech`

Do not mark these operational until each alias passes end-to-end inbound delivery and reply testing. The domain is owned and the website is live, but that alone is not evidence that email is receivable.

## 3. GitHub Discussions

Approved parent-repository categories:

1. Ask GitMoney
2. First Official Assets
3. Announcements

Category form candidates live in `.github/DISCUSSION_TEMPLATE/`. The GitBuilt form was removed and belongs in the dedicated proof-sprint repository. Enable Discussions only after merge so the category slugs and merged forms can be verified together.

Acceptance evidence:

- `has_discussions: true`
- category URLs
- form render screenshots or URLs
- moderation owner and cadence

## 4. GitHub Pages And Homepage

Approved source: `/docs` on `main` after merge and rendered-link testing.
Approved page: `docs/index.html`.

After owner approval and merge:

1. Enable Pages from the approved source.
2. Wait for the deployment to pass.
3. Set the repository homepage to the deployed URL.
4. Update the repository description to the approved founder-control-system category and promise.
5. Check mobile, keyboard, and screen-reader landmarks.
6. Confirm every primary CTA resolves.

Acceptance evidence:

- successful Pages deployment
- live homepage URL
- repository homepage field
- accessibility and link check

## 5. Social Preview

Candidate: `docs/assets/gitmoneyos-social-preview.png`, `1280 × 640`.

The current visual is approved. Upload it through repository settings after the image is present on `main`, then confirm it is legible at small card sizes and does not imply an unsupported outcome.

Acceptance evidence: current social-preview screenshot from repository settings.

## 6. Security Features

Observed at the start of this cycle:

- private vulnerability reporting disabled
- Dependabot security updates disabled
- secret scanning and push protection reported disabled

Approved baseline: private vulnerability reporting, Dependabot security updates, secret-scanning review, and push protection where available. Hitsuyo Aku is primary alert owner and Red Pillar is backup. Record unavailable plan or repository features as limitations.

Applied and API-verified on 2026-07-13: private vulnerability reporting enabled; Dependabot security updates enabled; secret scanning enabled; push protection enabled. Non-provider-pattern scanning and validity checks remain disabled and are not represented as accepted baseline controls.

Acceptance evidence:

- live status for each feature
- alert owner
- response and review cadence
- any unavailable feature recorded as a limitation, not success

## 7. Actions Policy

The branch pins all third-party Actions to full commit SHAs. The observed repository policy allowed all Actions and did not require SHA pinning.

Approved post-merge policy: selected GitHub-owned Actions only, with mandatory full-SHA pinning. The initial allowlist is `actions/checkout` and `actions/github-script`. Apply the live restriction only after the pinned workflow changes are on `main`, then dispatch both workflows and verify that the policy did not block them.

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

| Decision | State | Execution gate |
| --- | --- | --- |
| Scoped dual license and joint copyright | Approved | Encode and review in PR #16 |
| Security, conduct, and audit aliases | Approved names | Delivery and reply tests required |
| Discussions: Ask GitMoney, First Official Assets, Announcements | Approved | Enable and render-test after merge |
| Pages from `/docs` and repository homepage | Approved | Deploy and link-test after merge |
| Current social preview | Approved | Upload after merge; inspect live card |
| Security baseline | Approved | Enable available controls and inspect API/settings evidence |
| GitHub-owned Actions allowlist and SHA pinning | Approved | Apply after pinned workflows merge; dispatch-test |
| First Official Asset Challenge | Approved bounded beta only | Intake, moderation rehearsal, cohort evidence |
| GitBuilt dedicated repository | Approved | Private staging; five launch gates |
| First release | Not approved by this packet | Separate title, version, notes, claim review, and release action |
