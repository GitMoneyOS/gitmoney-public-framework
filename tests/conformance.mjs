#!/usr/bin/env node
import { mkdtempSync, writeFileSync, readFileSync, existsSync } from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const GITMONEY_CLI = path.join(REPO_ROOT, "scripts", "gitmoney.mjs");

console.log("==================================================");
console.log("   GitMoney OS Conformance & Verification Suite   ");
console.log("==================================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

// ----------------------------------------------------
// TEST 1: New Project Init + Doctor Conformance
// ----------------------------------------------------
console.log("\n--- Test 1: New Project Init with Source Memory Vault ---");
try {
  const newProjectDir = mkdtempSync(path.join(os.tmpdir(), "gm-new-"));
  console.log(`Target: ${newProjectDir}`);
  
  execSync(`node "${GITMONEY_CLI}" init "${newProjectDir}" --with-vault`, { stdio: "ignore" });

  assert(existsSync(path.join(newProjectDir, "AGENTS.md")), "AGENTS.md was created in new project");
  assert(existsSync(path.join(newProjectDir, "00_COCKPIT.md")), "00_COCKPIT.md was created in new project");
  assert(existsSync(path.join(newProjectDir, "gitmoney.yaml")), "gitmoney.yaml manifest was created");
  assert(existsSync(path.join(newProjectDir, ".agents", "skills", "gitmoney-public-operator", "SKILL.md")), "gitmoney-public-operator installed");
  assert(existsSync(path.join(newProjectDir, "vault", "START_HERE.md")), "Source Memory Starter Vault copied into vault/");

  // Add a bounded contract and valid receipt
  const contractDir = path.join(newProjectDir, "02_architecture", "contracts");
  execSync(`mkdir -p "${contractDir}"`, { stdio: "ignore" });
  writeFileSync(path.join(contractDir, "TASK-001.md"), `# Task Contract\n\nTask ID: TASK-001\nTitle: Setup initial repo\n`);

  const receiptDir = path.join(newProjectDir, "03_build", "receipts");
  execSync(`mkdir -p "${receiptDir}"`, { stdio: "ignore" });
  writeFileSync(
    path.join(receiptDir, "RECEIPT-001.md"),
    `# ICM Receipt: TASK-001\n\n## Header\n- **Task ID:** TASK-001\n- **Job:** Initialize AI Office\n- **Owner:** Test Lead\n- **Status:** VERIFIED\n\n## 1. What changed (Modifications Executed)\n| File | Action | Summary |\n|---|---|---|\n| AGENTS.md | Created | Boundary setup |\n\n## 2. Verification Gates Passed\n- [x] Verification: PASSED\n`
  );

  // Run doctor on new project
  let doctorOutput = "";
  try {
    doctorOutput = execSync(`node "${GITMONEY_CLI}" doctor "${newProjectDir}"`, { encoding: "utf8" });
  } catch (err) {
    doctorOutput = err.stdout ? err.stdout.toString() : err.message;
  }
  assert(doctorOutput.includes("[DOCTOR PASSED]"), "Doctor passes on newly initialized project");
} catch (e) {
  assert(false, `Test 1 encountered exception: ${e.message}`);
}

// ----------------------------------------------------
// TEST 2: Existing Project Init (--here)
// ----------------------------------------------------
console.log("\n--- Test 2: Existing Project Init (--here) ---");
try {
  const existingDir = mkdtempSync(path.join(os.tmpdir(), "gm-existing-"));
  writeFileSync(path.join(existingDir, "package.json"), `{\"name\": \"legacy-service\"}`);
  
  execSync(`node "${GITMONEY_CLI}" init --here`, { cwd: existingDir, stdio: "ignore" });

  assert(existsSync(path.join(existingDir, "package.json")), "Pre-existing package.json preserved");
  assert(existsSync(path.join(existingDir, "AGENTS.md")), "AGENTS.md scaffolded into existing project");
  assert(existsSync(path.join(existingDir, "gitmoney.yaml")), "gitmoney.yaml manifest added to existing project");
  assert(existsSync(path.join(existingDir, ".agents", "skills", "gitmoney-public-operator", "SKILL.md")), "gitmoney-public-operator added to existing project");
} catch (e) {
  assert(false, `Test 2 encountered exception: ${e.message}`);
}

// ----------------------------------------------------
// TEST 3: Negative Fixtures (Must Fail)
// ----------------------------------------------------
console.log("\n--- Test 3: Negative Fixtures (Must Fail) ---");

// Negative A: Classification Leak
try {
  const negDir = mkdtempSync(path.join(os.tmpdir(), "gm-neg-class-"));
  execSync(`node "${GITMONEY_CLI}" init "${negDir}"`, { stdio: "ignore" });
  writeFileSync(
    path.join(negDir, "leak.md"),
    `---\nclassification: internal\n---\n# Secret Note\n`
  );
  let failedAsExpected = false;
  try {
    execSync(`node "${GITMONEY_CLI}" doctor "${negDir}"`, { stdio: "pipe" });
  } catch {
    failedAsExpected = true;
  }
  assert(failedAsExpected, "Doctor rejects restricted classification tag (internal)");
} catch (e) {
  assert(false, `Negative Test A encountered error: ${e.message}`);
}

// Negative B: Private Source String Exposure
try {
  const negDir = mkdtempSync(path.join(os.tmpdir(), "gm-neg-priv-"));
  execSync(`node "${GITMONEY_CLI}" init "${negDir}"`, { stdio: "ignore" });
  writeFileSync(
    path.join(negDir, "docs-leak.md"),
    `Refer to gitmoney-ai-office/SKILL.md for execution rules.\n`
  );
  let failedAsExpected = false;
  try {
    execSync(`node "${GITMONEY_CLI}" doctor "${negDir}"`, { stdio: "pipe" });
  } catch {
    failedAsExpected = true;
  }
  assert(failedAsExpected, "Doctor rejects forbidden private source identifier");
} catch (e) {
  assert(false, `Negative Test B encountered error: ${e.message}`);
}

// Negative C: Broken Relative Link
try {
  const negDir = mkdtempSync(path.join(os.tmpdir(), "gm-neg-link-"));
  execSync(`node "${GITMONEY_CLI}" init "${negDir}"`, { stdio: "ignore" });
  writeFileSync(
    path.join(negDir, "broken.md"),
    `# Broken Link Test\n\nSee [Nonexistent](does-not-exist.md).\n`
  );
  let failedAsExpected = false;
  try {
    execSync(`node "${GITMONEY_CLI}" doctor "${negDir}"`, { stdio: "pipe" });
  } catch {
    failedAsExpected = true;
  }
  assert(failedAsExpected, "Doctor rejects broken relative Markdown link");
} catch (e) {
  assert(false, `Negative Test C encountered error: ${e.message}`);
}

// ----------------------------------------------------
// Summary
// ----------------------------------------------------
console.log("\n==================================================");
console.log(`Conformance Results: ${passed} passed, ${failed} failed.`);
console.log("==================================================");

if (failed === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
