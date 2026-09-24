#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';

const receiptPath = process.argv[2];
if (!receiptPath) {
  console.log('Usage: node scripts/receipt-checker.mjs <path-to-receipt.md>');
  process.exit(1);
}

if (!existsSync(receiptPath)) {
  console.error(`File not found: ${receiptPath}`);
  process.exit(1);
}

const content = readFileSync(receiptPath, 'utf8');
const REQUIRED_SECTIONS = [
  'Job',
  'Owner',
  'Status',
  'What changed',
  'Verification'
];

let missing = [];
for (const section of REQUIRED_SECTIONS) {
  if (!content.toLowerCase().includes(section.toLowerCase())) {
    missing.push(section);
  }
}

if (missing.length > 0) {
  console.error(`❌ [INCOMPLETE RECEIPT] Missing required sections: ${missing.join(', ')}`);
  process.exit(1);
}

console.log(`✅ [RECEIPT CONFORMANT] ${receiptPath} contains all required verification sections.`);
process.exit(0);
