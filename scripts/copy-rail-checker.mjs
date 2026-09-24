#!/usr/bin/env node
import { readdirSync, statSync, readFileSync } from 'fs';
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
console.log(`[Copy Rail Checker] Scanning ${mdFiles.length} markdown file(s)...`);

const EM_DASH = '\u2014';
const BANNED_WORDS = [
  'delve', 'tapestry', 'unlock', 'landscape', 'bespoke',
  'elevate', 'foster', 'harness', 'crucial', 'vital'
];
const BANNED_REGEX = new RegExp(`\\b(${BANNED_WORDS.join('|')})\\b`, 'i');

let emDashCount = 0;
let bannedWordCount = 0;

for (const f of mdFiles) {
  // Allow scripts themselves or schema files to avoid self-flagging
  if (f.startsWith('scripts') || f.startsWith('schemas')) continue;

  const content = readFileSync(f, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    if (line.includes(EM_DASH)) {
      console.error(`❌ [EM DASH] ${f}:${idx + 1} contains an em dash.`);
      emDashCount++;
    }
    // Check banned words only in prose (ignore markdown surface contract rule definition line)
    if (f !== 'docs/markdown-surface-contract.md' && BANNED_REGEX.test(line)) {
      const match = line.match(BANNED_REGEX);
      console.error(`❌ [BANNED WORD] ${f}:${idx + 1} contains prohibited word "${match[0]}".`);
      bannedWordCount++;
    }
  });
}

if (emDashCount > 0 || bannedWordCount > 0) {
  console.error(`\n❌ [FAILED] Copy rails breached: ${emDashCount} em dashes, ${bannedWordCount} banned words.`);
  process.exit(1);
}

console.log('✅ [PASSED] Zero em dashes and zero prohibited buzzwords detected.');
process.exit(0);
