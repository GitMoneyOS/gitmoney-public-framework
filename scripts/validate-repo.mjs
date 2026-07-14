#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, normalize, resolve } from "node:path";
import process from "node:process";

const root = process.cwd();
const errors = [];
const requiredFiles = [
  "README.md",
  "START_HERE.md",
  "CONTRIBUTING.md",
  "AGENTS.md",
  "CHANGELOG.md",
  "SECURITY.md",
  ".gitignore",
  ".github/CODEOWNERS",
  ".github/pull_request_template.md",
  ".github/labels.yml",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) errors.push(`Missing required file: ${file}`);
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules"].includes(entry.name)) return [];
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = walk(root);
const markdownFiles = files.filter((file) => extname(file).toLowerCase() === ".md");
const linkPattern = /!?(?:\[[^\]]*\])\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const body = readFileSync(file, "utf8");
  for (const match of body.matchAll(linkPattern)) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, "");
    if (!rawTarget || /^(?:https?:|mailto:|#)/i.test(rawTarget)) continue;
    const targetWithoutFragment = decodeURIComponent(rawTarget.split("#", 1)[0]);
    if (!targetWithoutFragment) continue;
    const target = normalize(resolve(dirname(file), targetWithoutFragment));
    if (!target.startsWith(root) || !existsSync(target)) {
      errors.push(`Broken relative link in ${file.slice(root.length + 1)}: ${rawTarget}`);
    }
  }
}

const labelRegistryPath = join(root, ".github/labels.yml");
const registeredLabels = existsSync(labelRegistryPath)
  ? new Set([...readFileSync(labelRegistryPath, "utf8").matchAll(/^\s*- name:\s*(.+)$/gm)].map((m) => m[1].trim()))
  : new Set();

function validateFormLabels(relativeDir, formType) {
  const formDir = join(root, relativeDir);
  if (!existsSync(formDir) || !statSync(formDir).isDirectory()) return;
  for (const name of readdirSync(formDir).filter((item) => /\.ya?ml$/i.test(item))) {
    const body = readFileSync(join(formDir, name), "utf8");
    const labelLine = body.match(/^labels:\s*\[([^\]]*)\]/m);
    if (!labelLine) continue;
    const labels = labelLine[1]
      .split(",")
      .map((label) => label.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
    for (const label of labels) {
      if (!registeredLabels.has(label)) errors.push(`${formType} ${name} uses unregistered label: ${label}`);
    }
  }
}

validateFormLabels(".github/ISSUE_TEMPLATE", "Issue form");
validateFormLabels(".github/DISCUSSION_TEMPLATE", "Discussion form");

const workflows = files.filter((file) => file.startsWith(join(root, ".github/workflows/")) && /\.ya?ml$/i.test(file));
for (const file of workflows) {
  const body = readFileSync(file, "utf8");
  for (const match of body.matchAll(/^\s*uses:\s*([^\s#]+).*$/gm)) {
    const reference = match[1];
    if (reference.startsWith("./") || reference.startsWith("docker://")) continue;
    const ref = reference.split("@")[1] ?? "";
    if (!/^[0-9a-f]{40}$/i.test(ref)) {
      errors.push(`Workflow action is not pinned to a full commit SHA in ${file.slice(root.length + 1)}: ${reference}`);
    }
  }
}

if (errors.length) {
  console.error("Public framework contract failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Public framework contract passed: ${markdownFiles.length} Markdown files checked.`);
console.log(`Registered labels checked: ${registeredLabels.size}.`);
console.log(`Pinned workflows checked: ${workflows.length}.`);
