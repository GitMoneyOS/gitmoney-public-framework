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

Use GitHub's private vulnerability-reporting option in the repository Security tab when it is available.

If no private reporting option is visible and you do not already have an approved private contact, open a minimal issue titled `[Private Security Contact Requested]`. Do not include the vulnerability, affected values, screenshots, private links, or reproduction details in that public issue. A maintainer can then establish a private response lane.

## What To Include Privately

- affected public surface
- impact stated without exaggeration
- smallest safe reproduction
- whether the issue is currently exploitable
- suggested containment when known
- your preferred contact method

## Response And Claims Boundary

The maintainers will acknowledge, investigate, contain, and document accepted reports as capacity allows. This repository does not claim certification, continuous monitoring, guaranteed response times, or a complete security posture. Live security settings must be verified in GitHub before they are represented as enabled.

## Owner And Lifecycle

Owner: GitMoneyOS owners.
Review cadence: monthly governor review and after any accepted security report.
Approval path: security-policy changes require owner review through a pull request.
