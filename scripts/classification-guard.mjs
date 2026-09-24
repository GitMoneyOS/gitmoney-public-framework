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
console.log(`[Classification Guard] Auditing ${mdFiles.length} markdown file(s)...`);

const BLOCKED = new Set(['internal', 'confidential', 'restricted']);
let violations = 0;

for (const f of mdFiles) {
  try {
    const text = readFileSync(f, 'utf8');
    const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    const cm = fm[1].match(/^classification:\s*["\']?([^"\'\n]+)/m);
    if (!cm) continue;
    const cls = cm[1].trim().toLowerCase();
    if (BLOCKED.has(cls)) {
      console.error(`❌ [VIOLATION] ${f} declares restricted classification: "${cls}"`);
      violations++;
    }
  } catch (err) {
    console.error(`Error reading ${f}:`, err.message);
  }
}

if (violations > 0) {
  console.error(`\n❌ [FAILED] Found ${violations} classification violation(s).`);
  process.exit(1);
}

console.log('✅ [PASSED] Zero restricted classification tags detected.');
process.exit(0);
