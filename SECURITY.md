# Security Policy

## Supported Versions

Only the latest release of the GitMoney OS Public Framework receives security updates and boundary patches.

| Version | Supported |
|---|---|
| 1.0.x | Yes |
| < 1.0.0 | No (Deprecated pilot revisions) |

## Reporting a Vulnerability

If you discover a security vulnerability, classification leak, credential exposure, or boundary flaw in this repository:

1. **Do not open a public issue.** Public disclosure exposes adopters to unnecessary risk.
2. Submit a report through **GitHub Private Vulnerability Reporting** on the `GitMoneyOS/gitmoney-public-framework` repository.
3. Alternatively, report the vulnerability directly to the security team via email at `security@gitmoney.io`.

Include the following details in your report:
- Type of issue (credential exposure, boundary failure, classification leak, path traversal)
- Affected file paths and commit SHAs
- Step-by-step instructions or proof of concept to reproduce the issue
- Impact assessment and suggested mitigation

We will acknowledge receipt within 48 hours and provide a timeline for triage and patch release.

## Scope and Boundaries

- **In Scope:** The open-source public repository `GitMoneyOS/gitmoney-public-framework` licensed under Apache-2.0.
- **Out of Scope:** Third-party downstream forks, user-created private vaults, external cloud environments, and private GitMoney implementation machinery.

## Operating Invariants

This repository enforces strict operational rules:
- **Zero Credential Emission:** API keys, access tokens, private keys, and passwords must never be committed.
- **Classification Guard:** Files marked `internal`, `confidential`, or `restricted` are rejected by pre-commit hooks and CI gates.
- **No Remote Live Execution:** Public scripts provide local verification and scaffolding; they do not trigger remote mutations or deployments.
