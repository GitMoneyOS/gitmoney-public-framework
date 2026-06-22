# Clipper Standard

## Purpose

Define the standards for using the Obsidian Web Clipper.

## Owner

Red Pillar and Hitsuyo Aku, under KnowTheLedge.

The Obsidian Web Clipper templates in `_clipper-templates/`. They exist so web capture lands governed instead of hoarded.

## The 4 Templates

| Template | File | Captures | Lands in |
|---|---|---|---|
| Article/research capture | `article-research-capture.json` | Articles, papers, posts worth keeping | `70-research-and-clips/` |
| YouTube/video capture | `youtube-video-capture.json` | Videos with a reason to remember them | `70-research-and-clips/` |
| Tool/repo discovery | `tool-repo-discovery.json` | Tools and repos found in the wild | `70-research-and-clips/` |
| Content inspiration | `content-inspiration.json` | Things that spark content ideas | `40-content-and-media/` |

## How To Install

1. Install the Obsidian Web Clipper browser extension.
2. Open the extension settings, go to Templates, and import each JSON file.
3. Point the extension at your Office vault.

## The Capture Contract

Every clip arrives with the six-field frontmatter, `status: seed`, `classification: private`, and the source URL filled automatically. The one field the clipper cannot fill is the one that matters most: **why you clipped it**. Each template prompts for a one-line "why this matters" - an empty why is how input hoarding starts (see `anti-patterns.md`).

## Processing Rule

Clips are seeds, not trophies. At weekly review every clip gets one of three fates: file it into a lane with a real link, turn it into an intake-worthy discovery (tools and repos route toward the Repo Man intake practice from Week 1), or archive it without guilt. The Research Clips base shows the backlog honestly.
