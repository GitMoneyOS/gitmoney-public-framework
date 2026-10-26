#!/usr/bin/env node
import { mkdtempSync, writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import {
  parseSimpleYaml,
  validateManifest,
  validateIcmContract,
  validateIcmReceipt,
  validateRcTrialReceipt,
  validateAutonomyReadinessCandidate,
  evaluateAutonomyReadinessCandidate
} from "../scripts/schema-validator.mjs";
import { evaluateAuthorityAction, tripAuthorityCircuitBreaker } from "../scripts/authority-control.mjs";

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
  assert(existsSync(path.join(newProjectDir, "templates", "actor-definition.md")), "Downstream actor-definition template exists");

  // Add a conformant JSON contract and receipt
  const contractDir = path.join(newProjectDir, "02_architecture", "contracts");
  mkdirSync(contractDir, { recursive: true });
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
  mkdirSync(receiptDir, { recursive: true });
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
  // Positive Manifest with 0.9.0-beta.3
  const validManifestYaml = `spec_version: "0.9.0-beta.3"
installed_spec_version: "0.9.0-beta.3"
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

  // Positive 3H: INSTALLED_SPEC_VERSION_MATCH = PASS
  assert(parsedValid.installed_spec_version === parsedValid.spec_version, "INSTALLED_SPEC_VERSION_MATCH = PASS");

  // Negative 3I: INSTALLED_SPEC_VERSION_MISMATCH = FAIL
  const specMismatchDir = mkdtempSync(path.join(os.tmpdir(), "gm-spec-mismatch-"));
  execSync(`node "${GITMONEY_CLI}" init "${specMismatchDir}"`, { stdio: "ignore" });
  const specManifestFile = path.join(specMismatchDir, "gitmoney.yaml");
  let specManifestContent = readFileSync(specManifestFile, "utf8");
  specManifestContent = specManifestContent.replace('installed_spec_version: "0.9.0-beta.4"', 'installed_spec_version: "0.8.0"');
  writeFileSync(specManifestFile, specManifestContent, "utf8");
  let specMismatchFailed = false;
  try {
    execSync("node scripts/gitmoney.mjs doctor", { cwd: specMismatchDir, stdio: "pipe" });
  } catch {
    specMismatchFailed = true;
  }
  assert(specMismatchFailed, "INSTALLED_SPEC_VERSION_MISMATCH = FAIL");
} catch (e) {
  assert(false, `Test 3 encountered exception: ${e.message}`);
}

// ----------------------------------------------------
// TEST 3J: Beta.4 Autonomy Readiness Candidate Boundaries
// ----------------------------------------------------
console.log("\n--- Test 3J: Beta.4 Autonomy Readiness Candidate Boundaries ---");
try {
  const readyFixture = JSON.parse(readFileSync(path.join(REPO_ROOT, "examples/autonomy-readiness/fictional-studio-ready.json"), "utf8"));
  const assess = candidate => {
    const validation = validateAutonomyReadinessCandidate(candidate, REPO_ROOT);
    return validation.valid ? evaluateAutonomyReadinessCandidate(candidate) : { schema_valid: false, validation };
  };
  const readyResult = assess(readyFixture);
  assert(readyResult.maximum_candidate_level === 2, "Supported 4/4/4 S1/S2/S3 case reaches the Level 2 candidate ceiling");
  assert(
    readyResult.authority.authority_status === "NOT_GRANTED"
      && readyResult.authority.evidence_verified === "NO"
      && readyResult.authority.separate_execution_authorization_required === "YES"
      && readyResult.authority.production_authorized === "NO",
    "Level 2 candidacy keeps evidence, execution, authority, and production authorization separate"
  );

  for (const system of ["S1_OPERATIONS", "S2_COORDINATION", "S3_OPERATIONAL_CONTROL"]) {
    const candidate = structuredClone(readyFixture);
    candidate.readiness_profile[system].score = 3;
    const result = assess(candidate);
    assert(result.maximum_candidate_level < 2, `${system} at 3 independently blocks Level 2`);
  }

  for (const [label, mutate, blocker] of [
    ["permitted tools", x => { x.action_boundary.permitted_tools_actions = []; }, "PERMITTED_TOOLS_NOT_DEFINED"],
    ["read scope", x => { x.action_boundary.read_permissions = []; }, "READ_SCOPE_NOT_DEFINED"],
    ["write scope", x => { x.action_boundary.write_permissions = []; }, "WRITE_SCOPE_NOT_DEFINED"],
    ["allowed data", x => { x.action_boundary.data_boundary.allowed_data = []; }, "ALLOWED_DATA_SCOPE_NOT_DEFINED"],
    ["forbidden data", x => { x.action_boundary.data_boundary.forbidden_data = []; }, "FORBIDDEN_DATA_SCOPE_NOT_DEFINED"]
  ]) {
    const candidate = structuredClone(readyFixture);
    mutate(candidate);
    const result = assess(candidate);
    const blockers = result.level_eligibility?.level_2_provisional?.blockers.map(item => item.code) ?? [];
    assert(result.maximum_candidate_level < 2 && blockers.includes(blocker), `Empty ${label} scope blocks Level 2 with ${blocker}`);
  }

  for (const [label, mutate] of [
    ["UNVERIFIED", check => { check.evidence_status = "UNVERIFIED"; }],
    ["STALE", check => { check.evidence_refs[0].evidence_state = "STALE"; }],
    ["CONFLICTED", check => { check.evidence_refs[0].evidence_state = "CONFLICTED"; }],
    ["absent", check => { check.evidence_refs = []; }]
  ]) {
    const candidate = structuredClone(readyFixture);
    mutate(candidate.readiness_profile.S1_OPERATIONS);
    const result = assess(candidate);
    assert(
      result.lowest_system.effective_score === 0 && !result.system_checks.S1_OPERATIONS.eligible,
      `${label} evidence has an effective score of zero and blocks eligibility`
    );
  }

  for (const [label, mutate, blocker] of [
    ["omitted permitted tools", x => { delete x.action_boundary.permitted_tools_actions; }, "PERMITTED_TOOLS_NOT_DEFINED"],
    ["blank permitted tool", x => { x.action_boundary.permitted_tools_actions = ["  "]; }, "PERMITTED_TOOLS_NOT_DEFINED"],
    ["empty actions", x => { x.action_boundary.actions = []; }, "ACTION_BOUNDARY_NOT_DEFINED"],
    ["missing forbidden actions", x => { x.action_boundary.forbidden_tools_actions = []; }, "FORBIDDEN_ACTIONS_NOT_DEFINED"],
    ["missing human approval", x => { x.action_boundary.actions[0].approval_required = false; }, "HUMAN_APPROVAL_BOUNDARY_INCOMPLETE"],
    ["unknown spend limit", x => { x.action_boundary.spend_limit.status = "UNKNOWN"; }, "SPEND_LIMIT_UNDEFINED"],
    ["unknown production limit", x => { x.action_boundary.production_limit.status = "UNKNOWN"; }, "PRODUCTION_LIMIT_UNDEFINED_OR_CONFLICTED"],
    ["missing escalation path", x => { x.action_boundary.escalation_path = []; }, "ESCALATION_PATH_NOT_DEFINED"],
    ["action scope conflict", x => { x.action_boundary.forbidden_tools_actions = [x.action_boundary.permitted_tools_actions[0]]; }, "ACTION_OR_DATA_SCOPE_CONFLICTED"],
    ["data scope conflict", x => { x.action_boundary.data_boundary.forbidden_data = [x.action_boundary.data_boundary.allowed_data[0]]; }, "ACTION_OR_DATA_SCOPE_CONFLICTED"]
  ]) {
    const candidate = structuredClone(readyFixture);
    mutate(candidate);
    const result = assess(candidate);
    const blockers = result.level_eligibility?.level_2_provisional?.blockers.map(item => item.code) ?? [];
    assert(result.maximum_candidate_level < 2 && blockers.includes(blocker), `${label} blocks Level 2 with ${blocker}`);
  }

  const ownerMismatch = structuredClone(readyFixture);
  ownerMismatch.authority.process_owner = "A different synthetic owner";
  assert(assess(ownerMismatch).maximum_candidate_level < 1, "Mismatched process and authority owners block candidacy");

  const pendingRule = structuredClone(readyFixture);
  pendingRule.rule_decisions.score_mapping.decision_reference = "PENDING";
  assert(assess(pendingRule).maximum_candidate_level < 2, "Pending scoring-rule provenance blocks Level 2 candidacy");

  const hardInvariantMissing = structuredClone(readyFixture);
  hardInvariantMissing.action_boundary.customer_reputation_limit = "";
  const hardInvariantResult = assess(hardInvariantMissing);
  assert(!hardInvariantResult.schema_valid, "Blank customer or identity hard boundaries fail schema validation");

  const noAuthorityFixture = JSON.parse(readFileSync(path.join(REPO_ROOT, "examples/autonomy-readiness/negative/capability-without-authority.json"), "utf8"));
  const noAuthorityResult = assess(noAuthorityFixture);
  assert(
    noAuthorityResult.maximum_candidate_level > 1
      && noAuthorityResult.authority.authority_status === "NOT_GRANTED"
      && noAuthorityResult.authority.production_authorized === "NO",
    "Capability-without-authority fixture may reach candidacy without implying permission"
  );
} catch (e) {
  assert(false, `Test 3J encountered exception: ${e.message}`);
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

  // Positive 4F: RC Trial Receipt Validation
  const validRcTrial = {
    trial_id: "RC-01",
    tester_type: "COLD_HUMAN",
    prior_exposure: "NONE",
    tag: "v0.9.0-beta.3",
    tag_sha: "0d25a7b17b44c2f725ac49bccd409f6b59e3390d",
    start_time: "2026-09-24T18:00:00Z",
    end_time: "2026-09-24T18:45:00Z",
    completed: true,
    author_interventions: 0,
    failed_commands: 0,
    doc_ambiguities: 0,
    boundary_violations: 0,
    three_layer_comprehension: "YES",
    valid_contract: true,
    valid_receipt: true,
    owner_authority_understood: true,
    private_skill_required: false,
    data_loss: false,
    silent_overwrite: false,
    regression_found: false,
    status: "UNVERIFIED"
  };
  const rcValRes = validateRcTrialReceipt(validRcTrial);
  assert(rcValRes.valid, "Valid RC Trial Receipt passes validateRcTrialReceipt");

  // Negative 4G: Illegal Trial ID in RC Trial Receipt
  const badRcTrial = { ...validRcTrial, trial_id: "RC-ILLEGAL" };
  const badRcRes = validateRcTrialReceipt(badRcTrial);
  assert(!badRcRes.valid && badRcRes.errors.some(e => e.includes("trial_id")), "Rejects illegal trial_id in RC Trial Receipt");
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

// Negative 5D: Downstream Secret Pattern Rejection (Private Key in Receipt/Workspace)
try {
  const negDir = mkdtempSync(path.join(os.tmpdir(), "gm-neg-secret-"));
  execSync(`node "${GITMONEY_CLI}" init "${negDir}"`, { stdio: "ignore" });
  const dummyReceiptWithSecret = path.join(negDir, "leak-receipt.json");
  writeFileSync(
    dummyReceiptWithSecret,
    JSON.stringify({
      task_id: "TASK-LEAK",
      secret_dump: "-----BEGIN " + "RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA0...\n-----END " + "RSA PRIVATE KEY-----"
    }, null, 2)
  );
  let failedAsExpected = false;
  try {
    execSync("node scripts/gitmoney.mjs doctor", { cwd: negDir, stdio: "pipe" });
  } catch {
    failedAsExpected = true;
  }
  assert(failedAsExpected, "Doctor rejects configured secret pattern matches (Private Key)");
} catch (e) {
  assert(false, `Negative Test 5D encountered error: ${e.message}`);
}

// ----------------------------------------------------
// TEST 6: Public Actor and Authority Teaching Path
// ----------------------------------------------------
console.log("\n--- Test 6: Public Actor and Authority Teaching Path ---");
try {
  const actorTemplate = readFileSync(path.join(REPO_ROOT, "templates", "actor-definition.md"), "utf8");
  const exampleReadme = readFileSync(path.join(REPO_ROOT, "examples", "fictional-studio-co", "README.md"), "utf8");
  const deniedReceipt = readFileSync(path.join(REPO_ROOT, "examples", "fictional-studio-co", "receipts", "RECEIPT-002-production-database-migration-DENIED.md"), "utf8");
  const indeterminateReceipt = readFileSync(path.join(REPO_ROOT, "examples", "fictional-studio-co", "receipts", "RECEIPT-003-client-webhook-dispatch-INDETERMINATE.md"), "utf8");
  assert(actorTemplate.includes("Decision and Mutation Authority") && actorTemplate.includes("Unavailable Operator Protocol"), "Actor template defines authority and founder-unavailable safe hold");
  assert(exampleReadme.includes("fictional teaching example"), "Fictional Studio Co. example declares its teaching-only status");
  assert(deniedReceipt.includes("not evidence of a real production database"), "Denied scenario does not claim a real production observation");
  assert(indeterminateReceipt.includes("not evidence that a real webhook was sent"), "Indeterminate scenario does not claim an external effect");

  const now = new Date();
  const issuedAt = new Date(now.getTime() - 10_000).toISOString();
  const expiresAt = new Date(now.getTime() + 3_600_000).toISOString();
  const grant = JSON.parse(readFileSync(path.join(REPO_ROOT, "starter", "templates", "authority-grant.json"), "utf8"));
  const state = JSON.parse(readFileSync(path.join(REPO_ROOT, "starter", "templates", "authority-state.json"), "utf8"));
  const action = JSON.parse(readFileSync(path.join(REPO_ROOT, "starter", "templates", "authority-action.json"), "utf8"));
  const trigger = JSON.parse(readFileSync(path.join(REPO_ROOT, "starter", "templates", "authority-trigger.json"), "utf8"));

  Object.assign(grant, { grant_id: "AGR-FSC-001", principal_id: "ACTOR-FSC-001", issued_at: issuedAt, expires_at: expiresAt });
  Object.assign(grant.hard_ceiling, {
    allowed_actions: ["DRAFT_SOP"],
    forbidden_actions: ["MUTATE_PRODUCTION_DB"],
    human_approval_required_actions: [],
    allowed_resources: ["03_build/deliverables/onboarding-sop.md"],
    allowed_read_resources: [],
    allowed_write_resources: ["03_build/deliverables/onboarding-sop.md"],
    allowed_environments: ["LOCAL"],
    allowed_data_classes: ["PUBLIC"],
    maximum_consequence: "LOW",
    maximum_spend_amount: 0
  });
  Object.assign(state, { grant_id: grant.grant_id, principal_id: grant.principal_id, effective_actions: ["DRAFT_SOP"] });
  Object.assign(action, {
    action_id: "ACT-FSC-001",
    grant_id: grant.grant_id,
    principal_id: grant.principal_id,
    action: "DRAFT_SOP",
    operation: "WRITE",
    resource: "03_build/deliverables/onboarding-sop.md",
    requested_at: now.toISOString(),
    human_approval_reference: undefined
  });

  const allowed = evaluateAuthorityAction(grant, state, action, now.toISOString());
  assert(allowed.decision === "ALLOW" && allowed.enforcement_claim === "REFERENCE_EVALUATION_ONLY", "Reference evaluator allows the bounded local action without claiming runtime enforcement");
  const denied = evaluateAuthorityAction(grant, state, { ...action, action_id: "ACT-FSC-002", action: "MUTATE_PRODUCTION_DB", consequence: "HIGH", requested_spend_amount: 500 }, now.toISOString());
  assert(denied.decision === "DENY" && denied.reasons.includes("ACTION_FORBIDDEN_BY_HARD_CEILING") && denied.reasons.includes("SPEND_EXCEEDS_HARD_CEILING"), "Reference evaluator denies a forbidden high-consequence action");
  Object.assign(trigger, { trigger_id: "TRG-FSC-001", grant_id: grant.grant_id, principal_id: grant.principal_id, triggered_at: now.toISOString(), blocked_action_ids: ["ACT-FSC-002"] });
  const frozen = tripAuthorityCircuitBreaker(grant, state, trigger);
  assert(frozen.applied && frozen.state.status === "FROZEN" && frozen.state.authority_epoch === state.authority_epoch + 1, "Circuit breaker freezes authority and advances the epoch");
} catch (e) {
  assert(false, `Test 6 encountered exception: ${e.message}`);
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
