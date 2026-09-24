#!/usr/bin/env node
import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import path from 'path';

function getFiles(dir) {
  let files = [];
  for (const item of readdirSync(dir)) {
    if (item === 'node_modules' || item === '.git') continue;
    const p = path.join(dir, item);
    if (statSync(p).isDirectory()) {
      files = files.concat(getFiles(p));
    } else if (p.endsWith('.md')) {
      files.push(p);
    }
  }
  return files;
}

const mdFiles = getFiles('.');
console.log(`[Link Integrity] Auditing links across ${mdFiles.length} markdown file(s)...`);

const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;
let brokenLinks = 0;
let totalChecked = 0;

for (const f of mdFiles) {
  const content = readFileSync(f, 'utf8');
  const dir = path.dirname(f);

  let match;
  while ((match = LINK_REGEX.exec(content)) !== null) {
    const target = match[2].trim();
    if (target.startsWith('#') || target.startsWith('http://') || target.startsWith('https://') || target.startsWith('mailto:')) {
      continue;
    }
    totalChecked++;
    const cleanTarget = target.split('#')[0];
    if (!cleanTarget) continue;

    const resolved = path.normalize(path.join(dir, cleanTarget));
    if (!existsSync(resolved)) {
      console.error(`❌ [BROKEN LINK] In ${f}: "${target}" -> "${resolved}" does not exist.`);
      brokenLinks++;
    }
  }
}

if (brokenLinks > 0) {
  console.error(`\n❌ [FAILED] Found ${brokenLinks} broken relative link(s).`);
  process.exit(1);
}

console.log(`✅ [PASSED] All ${totalChecked} relative links resolved successfully.`);
process.exit(0);
