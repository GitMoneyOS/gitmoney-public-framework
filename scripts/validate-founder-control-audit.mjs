import { readFileSync } from 'node:fs';

const contractPath = new URL('../docs/founder-control-audit/audit-contract.json', import.meta.url);
const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
const expectedDimensions = [
  'ip-organization',
  'access-control',
  'documentation-quality',
  'ai-agent-governance',
  'security-baseline',
  'change-history',
  'founder-visibility',
  'handoff-readiness'
];

const fail = (message) => {
  console.error(`Founder Control Audit contract failed: ${message}`);
  process.exit(1);
};

if (contract.schemaVersion !== '0.1.0') fail('schemaVersion must be 0.1.0');
if (contract.publicSubmission !== false) fail('publicSubmission must remain false');
if (contract.scoreScale?.minimum !== 0 || contract.scoreScale?.maximum !== 5) {
  fail('scoreScale must remain 0 through 5');
}

if (!Array.isArray(contract.dimensions) || contract.dimensions.length !== expectedDimensions.length) {
  fail('dimensions must contain exactly eight entries');
}

if (new Set(contract.dimensions).size !== contract.dimensions.length) {
  fail('dimensions must be unique');
}

for (const dimension of expectedDimensions) {
  if (!contract.dimensions.includes(dimension)) fail(`missing ${dimension}`);
}

if (!Array.isArray(contract.resultBands) || contract.resultBands.length !== 5) {
  fail('resultBands must contain five routes');
}

const expectedBands = [[0, 10], [11, 20], [21, 30], [31, 36], [37, 40]];
for (const [index, [minimum, maximum]] of expectedBands.entries()) {
  const band = contract.resultBands[index];
  if (band?.minimum !== minimum || band?.maximum !== maximum || !band.route) {
    fail(`result band ${index + 1} must cover ${minimum} through ${maximum}`);
  }
}

console.log('Founder Control Audit contract passed: 8 dimensions, 5 routes, no public submission.');
