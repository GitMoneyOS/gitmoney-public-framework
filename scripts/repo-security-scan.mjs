#!/usr/bin/env node
import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";

console.log("==================================================");
console.log("   GitMoney OS Tracked-File Security & IP Scan    ");
console.log("==================================================");

let violations = 0;

// 1. Quarantined Files Check
const QUARANTINED_FILES = [
  "docs/proposals/57_Nine_Figure_Optimization_Proposal_2026-06-10.md",
  "docs/routing/04_Agent_Platform_Routing.md"
];

for (const qf of QUARANTINED_FILES) {
  if (existsSync(qf)) {
    console.error("❌ [QUARANTINE VIOLATION] Forbidden file exists: " + qf);
    violations++;
  }
}

// 2. Query all git-tracked files
let trackedFiles = [];
try {
  trackedFiles = execSync("git ls-files", { encoding: "utf8" })
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean)
    .filter(f => existsSync(f));
} catch (err) {
  console.error("Failed to query git tracked files:", err.message);
  process.exit(1);
}

console.log("Auditing " + trackedFiles.length + " tracked files across repository...\n");

// 3. Patterns to scan
const FORBIDDEN_STRINGS = [
  ["gitmoney-ai-office", "SKILL.md"].join("/"),
  ["cac-operator", "SKILL.md"].join("/"),
  ["mothership", "-skills/"].join(""),
  ["identity-forensics-audit", "SKILL.md"].join("/"),
  ["sovereign-writers-room", "SKILL.md"].join("/"),
  ["sovereign-router", "SKILL.md"].join("/")
];

const SECRET_PATTERNS = [
  { name: "Private Key", regex: /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/ },
  { name: "GitHub Personal Access Token", regex: /ghp_[0-9a-zA-Z]{36}/ },
  { name: "GitHub Fine-Grained Token", regex: /github_pat_[0-9a-zA-Z_]{82}/ },
  { name: "Stripe Live Key", regex: /sk_live_[0-9a-zA-Z]{24}/ },
  { name: "Slack Token", regex: /xox[baprs]-[0-9a-zA-Z]{10,48}/ }
];

const BLOCKED_CLASSIFICATIONS = new Set(["internal", "confidential", "restricted"]);

let privateExposures = 0;
let secretExposures = 0;
let classificationViolations = 0;

for (const file of trackedFiles) {
  if (file === "scripts/repo-security-scan.mjs" || file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".ico") || file.endsWith(".pdf")) {
    continue;
  }
  let content = "";
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  for (const fs of FORBIDDEN_STRINGS) {
    if (content.includes(fs)) {
      console.error("❌ [PRIVATE EXPOSURE] Forbidden string \"" + fs + "\" found in " + file);
      privateExposures++;
      violations++;
    }
  }
  for (const sp of SECRET_PATTERNS) {
    if (sp.regex.test(content)) {
      console.error("❌ [SECRET DETECTED] " + sp.name + " pattern matched in " + file);
      secretExposures++;
      violations++;
    }
  }
  if (file.endsWith(".md")) {
    const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (fm) {
      const cm = fm[1].match(/^classification:\s*["\x27]?([^"\x27\n]+)/m);
      if (cm) {
        const cls = cm[1].trim().toLowerCase();
        if (BLOCKED_CLASSIFICATIONS.has(cls)) {
          console.error("❌ [CLASSIFICATION LEAK] Restricted classification \"" + cls + "\" in " + file);
          classificationViolations++;
          violations++;
        }
      }
    }
  }
}

console.log("--------------------------------------------------");
console.log("HEAD_PRIVATE_SOURCE_EXPOSURE = " + privateExposures);
console.log("HEAD_SECRET_EXPOSURE = " + secretExposures);
console.log("RESTRICTED_CLASSIFICATION_LEAKS = " + classificationViolations);
console.log("--------------------------------------------------");

if (violations === 0) {
  console.log("✅ [SECURITY SCAN PASSED] Zero private sources, zero secrets, zero classification leaks.");
  console.log("==================================================");
  process.exit(0);
} else {
  console.error("❌ [SECURITY SCAN FAILED] " + violations + " violation(s) detected.");
  console.log("==================================================");
  process.exit(1);
}
