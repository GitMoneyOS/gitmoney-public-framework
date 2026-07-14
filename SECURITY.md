# Security And Sensitive Information

## Purpose

Protect contributors, founders, clients, and the public framework from accidental disclosure while keeping security claims tied to evidence.

## Never Put In A Public Issue Or Pull Request

- passwords, access tokens, API keys, private keys, recovery codes, or credentials
- private repository URLs or internal machine paths
- client names, private screenshots, access lists, or confidential records
- raw Obsidian vault material, private source doctrine, or restricted business strategy
- exploit details that would create an immediate risk before maintainers can respond

If sensitive information has already been posted, do not repeat it in another issue. Notify the repository owners through an approved private channel and preserve only the minimum evidence needed for recovery.

## Reporting A Vulnerability

Use GitHub's private vulnerability-reporting option in the repository Security tab. The approved fallback alias is `security@hitsuyoaku.tech`, but do not rely on that route until [PRIVATE-CHANNELS.md](PRIVATE-CHANNELS.md) records a passing delivery test.

Do not open a public issue to request a security contact. Do not include the vulnerability, affected values, screenshots, private links, or reproduction details in any public repository surface.

## What To Include Privately

- affected public surface
- impact stated without exaggeration
- smallest safe reproduction
- whether the issue is currently exploitable
- suggested containment when known
- your preferred contact method

## Response And Claims Boundary

The security owner targets acknowledgment within one business day and an initial triage update within three business days. These are operating targets, not guaranteed remediation times. This repository does not claim certification, continuous monitoring, or a complete security posture. Live security settings must be verified in GitHub before they are represented as enabled.

## Owner And Lifecycle

Primary owner: Hitsuyo Aku (`HitsuyoAkuWeb3`).
Backup owner: Red Pillar (`redpillar75`).
Access: the primary and backup owner only, plus a specifically approved incident specialist when the report requires it.
Minimum-data rule: collect only the affected public surface, smallest safe reproduction, impact, exploitability, and a reply route; do not request credentials, production secrets, unrelated client data, or full private repositories.
Review cadence: monthly governor review and after any accepted security report.
Approval path: security-policy changes require owner review through a pull request.
