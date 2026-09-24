#!/usr/bin/env node
import { mkdtempSync, writeFileSync, readFileSync, existsSync } from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import {
  parseSimpleYaml,
  validateManifest,
  validateIcmContract,
  validateIcmReceipt
} from "../scripts/schema-validator.mjs";

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
// TEST 1: Self-Contained Downstream Project Init & Doctor
// ----------------------------------------------------
console.log("\n--- Test 1: Self-Contained Downstream Project Init ---");
try {
  const newProjectDir = mkdtempSync(path.join(os.tmpdir(), "gm-new-"));
  console.log(`Target: ${newProjectDir}`);
  
  execSync(`node "${GITMONEY_CLI}" init "${newProjectDir}" --with-vault`, { stdio: "ignore" });

  // Verify standalone files exist in downstream project
  assert(existsSync(path.join(newProjectDir, "AGENTS.md")), "AGENTS.md was created in new project");
  assert(existsSync(path.join(newProjectDir, "00_COCKPIT.md")), "00_COCKPIT.md was created in new project");
  assert(existsSync(path.join(newProjectDir, "gitmoney.yaml")), "gitmoney.yaml manifest was created");
  assert(existsSync(path.join(newProjectDir, ".agents", "skills", "gitmoney-public-operator", "SKILL.md")), "gitmoney-public-operator installed");
  assert(existsSync(path.join(newProjectDir, "vault", "START_HERE.md")), "Source Memory Starter Vault copied into vault/");
  assert(existsSync(path.join(newProjectDir, "scripts", "gitmoney.mjs")), "Downstream scripts/gitmoney.mjs exists (self-contained)");
  assert(existsSync(path.join(newProjectDir, "scripts", "schema-validator.mjs")), "Downstream scripts/schema-validator.mjs exists (self-contained)");
  assert(existsSync(path.join(newProjectDir, "schemas", "gitmoney-manifest.schema.json")), "Downstream schemas/ manifest schema exists");
  assert(existsSync(path.join(newProjectDir, "schemas", "icm-contract.schema.json")), "Downstream schemas/ contract schema exists");
  assert(existsSync(path.join(newProjectDir, "schemas", "icm-receipt.schema.json")), "Downstream schemas/ receipt schema exists");

  // Add a conformant JSON contract and receipt
  const contractDir = path.join(newProjectDir, "02_architecture", "contracts");
  execSync(`mkdir -p "${contractDir}"`, { stdio: "ignore" });
  writeFileSync(
    path.join(contractDir, "TASK-001.json"),
    JSON.stringify({
      task_id: "TASK-001",
      title: "Initialize AI Office Infrastructure",
      job_to_be_done: "Establish boundary files and self-contained workspace tooling.",
      business_reason: "Enable autonomous agent operations under governed boundary conditions.",
      owner: "Project Owner",
      executor: "gitmoney-public-operator",
      allowed_inputs: ["gitmoney.yaml", "AGENTS.md"],
      expected_outputs: ["00_COCKPIT.md", "vault/START_HERE.md"]
    }, null, 2)
  );

  const receiptDir = path.join(newProjectDir, "03_build", "receipts");
  execSync(`mkdir -p "${receiptDir}"`, { stdio: "ignore" });
  writeFileSync(
    path.join(receiptDir, "RECEIPT-001.json"),
    JSON.stringify({
      task_id: "TASK-001",
      owner: "Project Owner",
      executor: "gitmoney-public-operator",
      date: "2026-09-24",
      commit_sha: "8dfa357aa48de2c076b462b439b3e8b4efd72a02",
      status: "VERIFIED",
      modifications: [
        { file: "AGENTS.md", action: "created", summary: "Boundary setup" },
        { file: "00_COCKPIT.md", action: "created", summary: "Active priority anchor" }
      ],
      verification_gates: {
        classification_guard: "PASSED",
        copy_rails: "PASSED",
        link_integrity: "PASSED"
      }
    }, null, 2)
  );

  // CRITICAL PROOF: Run doctor LOCALLY INSIDE newProjectDir using downstream scripts/gitmoney.mjs
  // without referencing any upstream framework repository paths!
  let downstreamDoctorOutput = "";
  try {
    downstreamDoctorOutput = execSync("node scripts/gitmoney.mjs doctor", {
      cwd: newProjectDir,
      encoding: "utf8"
    });
  } catch (err) {
    downstreamDoctorOutput = err.stdout ? err.stdout.toString() : err.message;
  }
  assert(
    downstreamDoctorOutput.includes("[DOCTOR PASSED]"),
    "Downstream project runs node scripts/gitmoney.mjs doctor standalone and PASSES"
  );
  assert(
    downstreamDoctorOutput.includes("ICM Contract schema conformant: TASK-001.json"),
    "Downstream doctor validates TASK-001.json against canonical Draft-07 schema"
  );
  assert(
    downstreamDoctorOutput.includes("ICM Receipt schema conformant: RECEIPT-001.json"),
    "Downstream doctor validates RECEIPT-001.json against canonical Draft-07 schema"
  );
} catch (e) {
  assert(false, `Test 1 encountered exception: ${e.message}`);
}

// ----------------------------------------------------
// TEST 2: Existing Project Init (--here)
// ----------------------------------------------------
console.log("\n--- Test 2: Existing Project Init (--here) ---");
try {
  const existingDir = mkdtempSync(path.join(os.tmpdir(), "gm-existing-"));
  writeFileSync(path.join(existingDir, "package.json"), JSON.stringify({ name: "legacy-service" }));
  
  execSync(`node "${GITMONEY_CLI}" init --here`, { cwd: existingDir, stdio: "ignore" });

  assert(existsSync(path.join(existingDir, "package.json")), "Pre-existing package.json preserved");
  assert(existsSync(path.join(existingDir, "AGENTS.md")), "AGENTS.md scaffolded into existing project");
  assert(existsSync(path.join(existingDir, "gitmoney.yaml")), "gitmoney.yaml manifest added to existing project");
  assert(existsSync(path.join(existingDir, "scripts", "gitmoney.mjs")), "scripts/gitmoney.mjs scaffolded into existing project");
  assert(existsSync(path.join(existingDir, ".agents", "skills", "gitmoney-public-operator", "SKILL.md")), "gitmoney-public-operator added to existing project");
} catch (e) {
  assert(false, `Test 2 encountered exception: ${e.message}`);
}

// ----------------------------------------------------
// TEST 2B: Collision Preflight Guard (Non-Destructive Proof)
// ----------------------------------------------------
console.log("\n--- Test 2B: Collision Preflight Guard (Non-Destructive Proof) ---");
try {
  const collisionDir = mkdtempSync(path.join(os.tmpdir(), "gm-collision-"));
  const sentinelContent = "# SENTINEL: DO NOT TOUCH THIS SENTINEL\nCustom owner rules that must never be overwritten.";
  writeFileSync(path.join(collisionDir, "AGENTS.md"), sentinelContent, "utf8");

  let abortedAsExpected = false;
  try {
    execSync(`node "${GITMONEY_CLI}" init --here`, { cwd: collisionDir, stdio: "pipe" });
  } catch (err) {
    abortedAsExpected = true;
  }

  assert(abortedAsExpected, "init --here aborts when preflight detects collision with existing AGENTS.md");
  const preservedContent = readFileSync(path.join(collisionDir, "AGENTS.md"), "utf8");
  assert(preservedContent === sentinelContent, "AGENTS.md preserved byte-for-byte with zero overwrite");
  assert(!existsSync(path.join(collisionDir, "00_COCKPIT.md")), "No partial starter files written after preflight collision abort");

  // Verify --force allows intentional overwrite when explicitly authorized
  let forceSucceeded = false;
  try {
    execSync(`node "${GITMONEY_CLI}" init --here --force`, { cwd: collisionDir, stdio: "pipe" });
    forceSucceeded = true;
  } catch (err) {
    forceSucceeded = false;
  }
  assert(forceSucceeded, "init --here --force succeeds when intentional overwrite is explicitly authorized");
  assert(existsSync(path.join(collisionDir, "00_COCKPIT.md")), "Files scaffolded after explicit --force authorization");
} catch (e) {
  assert(false, `Test 2B encountered exception: ${e.message}`);
}

// ----------------------------------------------------
// TEST 3: Manifest Schema-Driven Draft-07 Validation Proof
// ----------------------------------------------------
console.log("\n--- Test 3: Manifest Schema-Driven Draft-07 Validation Proof ---");
try {
  // Positive Manifest with 0.9.0-beta.1
  const validManifestYaml = `spec_version: "0.9.0-beta.1"
installed_spec_version: "0.9.0-beta.1"
owner: "Test Owner"
profile: "ai-office"
source_memory: "vault"
operator_version: "0.1.0"
schema_version: "0.1.0"
required_artifacts:
  - "AGENTS.md"
  - "00_COCKPIT.md"
`;
  const parsedValid = parseSimpleYaml(validManifestYaml);
  const valResult = validateManifest(parsedValid);
  assert(valResult.valid, "Valid gitmoney.yaml parses and passes schema-driven Draft-07 validation");

  // Positive: SemVer 2.0 with build metadata
  const buildMetaManifest = { ...parsedValid, spec_version: "1.0.0+build.42" };
  const buildMetaRes = validateManifest(buildMetaManifest);
  assert(buildMetaRes.valid, "SemVer 2.0 with build metadata (1.0.0+build.42) passes schema");

  // Negative 3A: Illegal Profile
  const badProfile = { ...parsedValid, profile: "hyper-enterprise-illegal" };
  const badProfileRes = validateManifest(badProfile);
  assert(!badProfileRes.valid && badProfileRes.errors.some(e => e.includes("profile")), "Rejects illegal profile enum value against schema");

  // Negative 3B: Malformed Semver
  const badSemver = { ...parsedValid, spec_version: "v1.0" };
  const badSemverRes = validateManifest(badSemver);
  assert(!badSemverRes.valid && badSemverRes.errors.some(e => e.includes("spec_version")), "Rejects non-semver spec_version pattern against schema");

  // Negative 3C: Missing Required Field
  const missingField = { ...parsedValid };
  delete missingField.owner;
  const missingFieldRes = validateManifest(missingField);
  assert(!missingFieldRes.valid && missingFieldRes.errors.some(e => e.includes("owner")), "Rejects manifest missing required property against schema");

  // Negative 3D: Missing on-disk artifact fails doctor
  const testDir = mkdtempSync(path.join(os.tmpdir(), "gm-art-"));
  execSync(`node "${GITMONEY_CLI}" init "${testDir}"`, { stdio: "ignore" });
  const manifestFile = path.join(testDir, "gitmoney.yaml");
  writeFileSync(manifestFile, readFileSync(manifestFile, "utf8") + "  - \"nonexistent_artifact.md\"\n");
  let doctorFailed = false;
  try {
    execSync("node scripts/gitmoney.mjs doctor", { cwd: testDir, stdio: "pipe" });
  } catch {
    doctorFailed = true;
  }
  assert(doctorFailed, "Doctor fails when required_artifact listed in manifest is missing on disk");

  // Positive 3E: SCHEMA_VERSION_MATCH & OPERATOR_VERSION_MATCH = PASS
  const matchDir = mkdtempSync(path.join(os.tmpdir(), "gm-ver-match-"));
  execSync(`node "${GITMONEY_CLI}" init "${matchDir}"`, { stdio: "ignore" });
  let matchPassed = true;
  try {
    execSync("node scripts/gitmoney.mjs doctor", { cwd: matchDir, stdio: "pipe" });
  } catch {
    matchPassed = false;
  }
  assert(matchPassed, "SCHEMA_VERSION_MATCH & OPERATOR_VERSION_MATCH = PASS");

  // Negative 3F: SCHEMA_VERSION_MISMATCH = FAIL
  const schemaMismatchDir = mkdtempSync(path.join(os.tmpdir(), "gm-schema-mismatch-"));
  execSync(`node "${GITMONEY_CLI}" init "${schemaMismatchDir}"`, { stdio: "ignore" });
  const smManifestFile = path.join(schemaMismatchDir, "gitmoney.yaml");
  let smManifestContent = readFileSync(smManifestFile, "utf8");
  smManifestContent = smManifestContent.replace('schema_version: "0.1.0"', 'schema_version: "99.0.0"');
  writeFileSync(smManifestFile, smManifestContent, "utf8");
  let schemaMismatchFailed = false;
  try {
    execSync("node scripts/gitmoney.mjs doctor", { cwd: schemaMismatchDir, stdio: "pipe" });
  } catch {
    schemaMismatchFailed = true;
  }
  assert(schemaMismatchFailed, "SCHEMA_VERSION_MISMATCH = FAIL");

  // Negative 3G: OPERATOR_VERSION_MISMATCH = FAIL
  const opMismatchDir = mkdtempSync(path.join(os.tmpdir(), "gm-op-mismatch-"));
  execSync(`node "${GITMONEY_CLI}" init "${opMismatchDir}"`, { stdio: "ignore" });
  const opManifestFile = path.join(opMismatchDir, "gitmoney.yaml");
  let opManifestContent = readFileSync(opManifestFile, "utf8");
  opManifestContent = opManifestContent.replace('operator_version: "0.1.0"', 'operator_version: "99.0.0"');
  writeFileSync(opManifestFile, opManifestContent, "utf8");
  let opMismatchFailed = false;
  try {
    execSync("node scripts/gitmoney.mjs doctor", { cwd: opMismatchDir, stdio: "pipe" });
  } catch {
    opMismatchFailed = true;
  }
  assert(opMismatchFailed, "OPERATOR_VERSION_MISMATCH = FAIL");
} catch (e) {
  assert(false, `Test 3 encountered exception: ${e.message}`);
}

// ----------------------------------------------------
// TEST 4: ICM Contract & Receipt Schema-Driven Validation Proof
// ----------------------------------------------------
console.log("\n--- Test 4: ICM Contract & Receipt Schema-Driven Validation Proof ---");
try {
  // Positive Contract
  const validContract = {
    task_id: "GOV-101",
    title: "Enforce Schema Integrity",
    job_to_be_done: "Validate all incoming action contracts against Draft-07 schema definitions.",
    business_reason: "Guarantee repeatable operational contracts between autonomous operators and human reviewers.",
    owner: "Lead Architect",
    executor: "gitmoney-public-operator",
    allowed_inputs: ["schemas/icm-contract.schema.json"],
    expected_outputs: ["tests/conformance.mjs"]
  };
  const contractRes = validateIcmContract(validContract);
  assert(contractRes.valid, "Valid contract passes schema-driven validateIcmContract");

  // Negative 4A: Malformed Task ID
  const badTaskId = { ...validContract, task_id: "lowercase-bad-id" };
  const badTaskIdRes = validateIcmContract(badTaskId);
  assert(!badTaskIdRes.valid && badTaskIdRes.errors.some(e => e.includes("task_id")), "Rejects malformed task_id not matching schema pattern ^[A-Z0-9]+-[0-9]+$");

  // Negative 4B: Missing Expected Outputs
  const missingOutputs = { ...validContract, expected_outputs: [] };
  const missingOutputsRes = validateIcmContract(missingOutputs);
  assert(!missingOutputsRes.valid && missingOutputsRes.errors.some(e => e.includes("expected_outputs")), "Rejects contract with empty expected_outputs (< minItems 1)");

  // Positive Receipt
  const validReceipt = {
    task_id: "GOV-101",
    owner: "Lead Architect",
    executor: "gitmoney-public-operator",
    date: "2026-09-24",
    commit_sha: "8dfa357aa48de2c076b462b439b3e8b4efd72a02",
    status: "VERIFIED",
    modifications: [
      { file: "scripts/schema-validator.mjs", action: "created", summary: "Added schema-driven engine" }
    ],
    verification_gates: {
      classification_guard: "PASSED",
      copy_rails: "PASSED",
      link_integrity: "PASSED"
    }
  };
  const receiptRes = validateIcmReceipt(validReceipt);
  assert(receiptRes.valid, "Valid receipt passes schema-driven validateIcmReceipt");

  // Negative 4C: Illegal Status Enum
  const badStatus = { ...validReceipt, status: "UNAUDITED_YOLO" };
  const badStatusRes = validateIcmReceipt(badStatus);
  assert(!badStatusRes.valid && badStatusRes.errors.some(e => e.includes("status")), "Rejects illegal receipt status not in schema enum");

  // Negative 4D: Malformed Commit SHA
  const badSha = { ...validReceipt, commit_sha: "not-a-sha" };
  const badShaRes = validateIcmReceipt(badSha);
  assert(!badShaRes.valid && badShaRes.errors.some(e => e.includes("commit_sha")), "Rejects non-hex commit_sha not matching schema pattern");

  // Negative 4E: Missing Verification Gate
  const missingGate = {
    ...validReceipt,
    verification_gates: {
      classification_guard: "PASSED",
      copy_rails: "PASSED"
      // link_integrity omitted
    }
  };
  const missingGateRes = validateIcmReceipt(missingGate);
  assert(!missingGateRes.valid && missingGateRes.errors.some(e => e.includes("link_integrity")), "Rejects receipt missing required verification gate in schema");
} catch (e) {
  assert(false, `Test 4 encountered exception: ${e.message}`);
}

// ----------------------------------------------------
// TEST 5: Negative Boundary Fixtures (Doctor Rejection)
// ----------------------------------------------------
console.log("\n--- Test 5: Negative Boundary Fixtures (Doctor Rejection) ---");

// Negative 5A: Classification Leak
try {
  const negDir = mkdtempSync(path.join(os.tmpdir(), "gm-neg-class-"));
  execSync(`node "${GITMONEY_CLI}" init "${negDir}"`, { stdio: "ignore" });
  writeFileSync(
    path.join(negDir, "leak.md"),
    "---\nclassification: internal\n---\n# Secret Note\n"
  );
  let failedAsExpected = false;
  try {
    execSync("node scripts/gitmoney.mjs doctor", { cwd: negDir, stdio: "pipe" });
  } catch {
    failedAsExpected = true;
  }
  assert(failedAsExpected, "Doctor rejects restricted classification tag (internal)");
} catch (e) {
  assert(false, `Negative Test 5A encountered error: ${e.message}`);
}

// Negative 5B: Private Source String Exposure
try {
  const negDir = mkdtempSync(path.join(os.tmpdir(), "gm-neg-priv-"));
  execSync(`node "${GITMONEY_CLI}" init "${negDir}"`, { stdio: "ignore" });
  writeFileSync(
    path.join(negDir, "docs-leak.md"),
    "Refer to " + ["gitmoney-ai-office", "SKILL.md"].join("/") + " for execution rules.\n"
  );
  let failedAsExpected = false;
  try {
    execSync("node scripts/gitmoney.mjs doctor", { cwd: negDir, stdio: "pipe" });
  } catch {
    failedAsExpected = true;
  }
  assert(failedAsExpected, "Doctor rejects forbidden private source identifier");
} catch (e) {
  assert(false, `Negative Test 5B encountered error: ${e.message}`);
}

// Negative 5C: Broken Relative Link
try {
  const negDir = mkdtempSync(path.join(os.tmpdir(), "gm-neg-link-"));
  execSync(`node "${GITMONEY_CLI}" init "${negDir}"`, { stdio: "ignore" });
  writeFileSync(
    path.join(negDir, "broken.md"),
    "# Broken Link Test\n\nSee [Nonexistent](does-not-exist.md).\n"
  );
  let failedAsExpected = false;
  try {
    execSync("node scripts/gitmoney.mjs doctor", { cwd: negDir, stdio: "pipe" });
  } catch {
    failedAsExpected = true;
  }
  assert(failedAsExpected, "Doctor rejects broken relative Markdown link");
} catch (e) {
  assert(false, `Negative Test 5C encountered error: ${e.message}`);
}

// ----------------------------------------------------
// Summary Verdict
// ----------------------------------------------------
console.log("\n==================================================");
console.log(`Conformance Results: ${passed} passed, ${failed} failed.`);
console.log("==================================================");

if (failed === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
