# Private Channel Operating Matrix

Status: approved aliases; delivery verification required before they are represented as operational
Domain: `hitsuyoaku.tech`
Owners: Red Pillar and Hitsuyo Aku

| Channel | Purpose | Primary | Backup | Target cadence | Access | Minimum-data rule |
| --- | --- | --- | --- | --- | --- | --- |
| `security@hitsuyoaku.tech` | Vulnerabilities and accidental exposure | Hitsuyo Aku | Red Pillar | Acknowledge in 1 business day; initial triage in 3 | Both owners; approved incident specialist only when required | Smallest safe reproduction, affected public surface, impact, exploitability, reply route |
| `conduct@hitsuyoaku.tech` | Community conduct and moderation | Red Pillar | Hitsuyo Aku | Acknowledge in 2 business days; next step in 5 | Both owners; approved independent reviewer for conflicts | Surface, approximate date, reported behavior, immediate safety concern, reply route |
| `audit@hitsuyoaku.tech` | Private commercial and audit intake | Hitsuyo Aku | Red Pillar | Acknowledge in 2 business days | Both owners; approved delivery specialist only when required | Name, reply route, business type, requested route, one-sentence control problem |

## Shared Controls

- Public issues and Discussions are never fallback storage for sensitive details.
- A target cadence is not a guaranteed resolution or remediation time.
- Do not request passwords, tokens, private keys, recovery codes, raw vault exports, unrestricted repository access, or unrelated client records.
- Each owner removes copied material that is no longer required and records only the minimum decision receipt.
- If a message concerns a channel's primary owner, the backup owns triage. If a conduct report concerns both owners, an independent reviewer must be approved before a substantive enforcement decision.

## Activation Gate

The aliases may be published as the approved names, but the private-intake gate remains open until each route passes an end-to-end delivery and reply test. Domain ownership and an outbound email provider do not by themselves prove inbound delivery.
