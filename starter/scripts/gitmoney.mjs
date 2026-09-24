#!/usr/bin/env node
import { readdirSync, statSync, readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { parseSimpleYaml, validateManifest, validateIcmContract, validateIcmReceipt } from "./schema-validator.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCRIPT_DIR = __dirname;
// If starter/ exists, we are in the framework repo root; otherwise we are in an installed project
const REPO_ROOT = existsSync(path.join(SCRIPT_DIR, "..", "starter"))
  ? path.resolve(SCRIPT_DIR, "..")
  : path.resolve(SCRIPT_DIR, "..");

function copyRecursive(src, dest) {
  if (!existsSync(src)) return;
  const stats = statSync(src);
  if (stats.isDirectory()) {
    if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
    for (const item of readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    copyFileSync(src, dest);
  }
}

function getMdFiles(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const item of readdirSync(dir)) {
    if (item === "node_modules" || item === ".git") continue;
    const p = path.join(dir, item);
    try {
      const s = statSync(p);
      if (s.isDirectory()) {
        getMdFiles(p, files);
      } else if (p.endsWith(".md")) {
        files.push(p);
      }
    } catch {
      // Ignore unreadable entries
    }
  }
  return files;
}

// ----------------------------------------------------
// COMMAND: init
// ----------------------------------------------------
function runInit(args) {
  const isHere = args.includes("--here");
  const withVault = args.includes("--with-vault");
  let targetDir = process.cwd();

  if (!isHere) {
    const nonFlagArgs = args.filter(a => !a.startsWith("--"));
    if (nonFlagArgs.length === 0) {
      console.error("Usage: node scripts/gitmoney.mjs init <dir> [--with-vault]");
      console.error("       node scripts/gitmoney.mjs init --here [--with-vault]");
      process.exit(1);
    }
    targetDir = path.resolve(process.cwd(), nonFlagArgs[0]);
  }

  console.log(`[GitMoney Init] Initializing self-contained AI Office scaffold in: ${targetDir}`);
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  const starterSource = existsSync(path.join(REPO_ROOT, "starter"))
    ? path.join(REPO_ROOT, "starter")
    : REPO_ROOT;

  // Copy starter files (including scripts/ and schemas/)
  copyRecursive(starterSource, targetDir);

  // Configure project manifest
  const manifestDest = path.join(targetDir, "gitmoney.yaml");
  const manifestContent = `# GitMoney AI Office Project Manifest
spec_version: "1.0.0"
installed_spec_version: "1.0.0"
owner: "Project Owner"
profile: "ai-office"
source_memory: "${withVault ? "vault" : "none"}"
operator_version: "1.0.0"
schema_version: "Draft-07"
required_artifacts:
  - "AGENTS.md"
  - "00_COCKPIT.md"
  - ".agents/skills/gitmoney-public-operator/SKILL.md"
  - "scripts/gitmoney.mjs"
`;
  writeFileSync(manifestDest, manifestContent, "utf8");

  // Copy Starter Vault if requested
  if (withVault) {
    let vaultSource = path.join(REPO_ROOT, "templates", "starter-vault");
    if (!existsSync(vaultSource) && existsSync(path.join(REPO_ROOT, "vault"))) {
      vaultSource = path.join(REPO_ROOT, "vault");
    }
    const vaultDest = path.join(targetDir, "vault");
    if (existsSync(vaultSource)) {
      console.log(`[GitMoney Init] Copying canonical Starter Vault into: ${vaultDest}`);
      copyRecursive(vaultSource, vaultDest);

      // Adapt vault cross-links for the downstream project layout
      const vaultMdFiles = getMdFiles(vaultDest);
      for (const f of vaultMdFiles) {
        let content = readFileSync(f, "utf8");
        const relToTarget = path.relative(path.dirname(f), targetDir);
        const skillPath = path.join(relToTarget, ".agents/skills/gitmoney-public-operator/SKILL.md").replace(/\\/g, "/");
        content = content.replace(/\.\.\/\.\.\/\.\.\/starter\/\.agents\/skills\/gitmoney-public-operator\/SKILL\.md/g, skillPath);
        content = content.replace(/\.\.\/\.\.\/starter\/\.agents\/skills\/gitmoney-public-operator\/SKILL\.md/g, skillPath);
        content = content.replace(/\.\.\/\.\.\/starter\//g, relToTarget ? relToTarget + "/" : "./");
        content = content.replace(/\[\.\.\/AGENTS\.md\]\(\.\.\/AGENTS\.md\)/g, "[AGENTS.md](" + (relToTarget ? relToTarget + "/" : "./") + "AGENTS.md)");
        content = content.replace(/\(\.\.\/icm-execution-contract\.md\)/g, "(https://github.com/GitMoneyOS/gitmoney-public-framework/blob/main/templates/icm-execution-contract.md)");
        content = content.replace(/\(\.\.\/icm-receipt\.md\)/g, "(https://github.com/GitMoneyOS/gitmoney-public-framework/blob/main/templates/icm-receipt.md)");
        content = content.replace(/\(\.\.\/\.\.\/icm-receipt\.md\)/g, "(https://github.com/GitMoneyOS/gitmoney-public-framework/blob/main/templates/icm-receipt.md)");
        content = content.replace(/\(\.\.\/\.\.\/docs\/quickstart\.md\)/g, "(https://github.com/GitMoneyOS/gitmoney-public-framework/blob/main/docs/quickstart.md)");
        writeFileSync(f, content, "utf8");
      }
    } else {
      console.log("[GitMoney Init] Note: Starter vault source template not found; skipped.");
    }
  }

  // Initialize git repo if not already in one
  try {
    const isGit = existsSync(path.join(targetDir, ".git"));
    if (!isGit) {
      execSync("git init", { cwd: targetDir, stdio: "ignore" });
      console.log("[GitMoney Init] Initialized fresh Git repository.");
    }
  } catch {
    console.log("[GitMoney Init] Note: Git initialization skipped or unavailable.");
  }

  console.log("\n[GitMoney Init] Complete. This installation is fully self-contained.");
  console.log("Next steps:");
  console.log("  1. Review AGENTS.md and customize allowed boundaries.");
  console.log("  2. Review 00_COCKPIT.md to set your active priority.");
  if (withVault) {
    console.log("  3. Open the vault/ folder in Obsidian as your private Source Memory.");
  }
  console.log("  4. Run `node scripts/gitmoney.mjs doctor` to verify health locally.");
}

// ----------------------------------------------------
// COMMAND: doctor
// ----------------------------------------------------
export function runDoctor(targetDir = process.cwd()) {
  console.log("==================================================");
  console.log("   GitMoney OS Architecture & Governance Doctor   ");
  console.log("==================================================");
  console.log(`Auditing target directory: ${targetDir}\n`);

  let failures = 0;
  let warnings = 0;

  // 1. Structure Check
  console.log("--- 1. Structure & Essential Files ---");
  const isFramework = existsSync(path.join(targetDir, "starter")) && existsSync(path.join(targetDir, "templates", "starter-vault"));
  
  const coreFiles = isFramework
    ? ["AGENTS.md", "README.md", "START-HERE.md", "SECURITY.md", "SPEC_VERSION", "gitmoney.yaml", "scripts/gitmoney.mjs", "scripts/schema-validator.mjs"]
    : ["AGENTS.md", "00_COCKPIT.md", "gitmoney.yaml", "scripts/gitmoney.mjs", "scripts/schema-validator.mjs"];

  for (const cf of coreFiles) {
    const p = path.join(targetDir, cf);
    if (existsSync(p)) {
      console.log(`  [OK] ${cf} is present.`);
    } else {
      console.error(`  [FAIL] Missing required file: ${cf}`);
      failures++;
    }
  }

  // 2. Public Operator Presence
  console.log("\n--- 2. Public Operator Skill ---");
  const operatorPath = isFramework
    ? path.join(targetDir, "starter", ".agents", "skills", "gitmoney-public-operator", "SKILL.md")
    : path.join(targetDir, ".agents", "skills", "gitmoney-public-operator", "SKILL.md");

  if (existsSync(operatorPath)) {
    const opContent = readFileSync(operatorPath, "utf8");
    if (opContent.includes("gitmoney-public-operator") && opContent.length > 200) {
      console.log(`  [OK] gitmoney-public-operator verified (${path.relative(targetDir, operatorPath)}).`);
    } else {
      console.error(`  [FAIL] gitmoney-public-operator skill is empty or invalid.`);
      failures++;
    }
  } else {
    console.error(`  [FAIL] gitmoney-public-operator not found at: ${path.relative(targetDir, operatorPath)}`);
    failures++;
  }

  // 3. Draft-07 Manifest Schema Validation (gitmoney.yaml)
  console.log("\n--- 3. Manifest Draft-07 Schema Validation (gitmoney.yaml) ---");
  const manifestPath = path.join(targetDir, "gitmoney.yaml");
  if (existsSync(manifestPath)) {
    try {
      const rawText = readFileSync(manifestPath, "utf8");
      const parsedData = parseSimpleYaml(rawText);
      const valResult = validateManifest(parsedData);
      if (!valResult.valid) {
        for (const err of valResult.errors) {
          console.error(`  [FAIL] ${err}`);
          failures++;
        }
      } else {
        console.log(`  [OK] Manifest parsed successfully (profile: "${parsedData.profile}", spec: ${parsedData.spec_version}).`);
        // Verify required artifacts exist on disk
        for (const artifact of parsedData.required_artifacts) {
          const artPath = path.join(targetDir, artifact);
          if (existsSync(artPath)) {
            console.log(`  [OK] Required artifact verified on disk: ${artifact}`);
          } else {
            console.error(`  [FAIL] Required artifact missing on disk: ${artifact}`);
            failures++;
          }
        }
      }
    } catch (err) {
      console.error(`  [FAIL] Error parsing gitmoney.yaml: ${err.message}`);
      failures++;
    }
  } else {
    console.error("  [FAIL] gitmoney.yaml not found.");
    failures++;
  }

  // 4. ICM Contracts and Receipts Schema Validation
  console.log("\n--- 4. ICM Contract & Receipt Schema Conformance ---");
  const contractsDir = path.join(targetDir, "02_architecture", "contracts");
  if (existsSync(contractsDir)) {
    const files = readdirSync(contractsDir).filter(f => f.endsWith(".json"));
    if (files.length === 0) {
      console.log("  [INFO] No JSON contracts found in 02_architecture/contracts/.");
    }
    for (const f of files) {
      try {
        const data = JSON.parse(readFileSync(path.join(contractsDir, f), "utf8"));
        const res = validateIcmContract(data);
        if (res.valid) {
          console.log(`  [OK] ICM Contract schema conformant: ${f}`);
        } else {
          for (const err of res.errors) {
            console.error(`  [FAIL] Contract ${f}: ${err}`);
            failures++;
          }
        }
      } catch (err) {
        console.error(`  [FAIL] Malformed contract JSON ${f}: ${err.message}`);
        failures++;
      }
    }
  } else {
    console.log("  [INFO] No contracts directory in target; skipping contract schema check.");
  }

  const receiptsDir = path.join(targetDir, "03_build", "receipts");
  if (existsSync(receiptsDir)) {
    const files = readdirSync(receiptsDir).filter(f => f.endsWith(".json"));
    if (files.length === 0) {
      console.log("  [INFO] No JSON receipts found in 03_build/receipts/.");
    }
    for (const f of files) {
      try {
        const data = JSON.parse(readFileSync(path.join(receiptsDir, f), "utf8"));
        const res = validateIcmReceipt(data);
        if (res.valid) {
          console.log(`  [OK] ICM Receipt schema conformant: ${f}`);
        } else {
          for (const err of res.errors) {
            console.error(`  [FAIL] Receipt ${f}: ${err}`);
            failures++;
          }
        }
      } catch (err) {
        console.error(`  [FAIL] Malformed receipt JSON ${f}: ${err.message}`);
        failures++;
      }
    }
  } else {
    console.log("  [INFO] No receipts directory in target; skipping receipt schema check.");
  }

  // 5. Classification Guard
  console.log("\n--- 5. Classification Guard ---");
  const mdFiles = getMdFiles(targetDir);
  const BLOCKED = new Set(["internal", "confidential", "restricted"]);
  let classViolations = 0;
  for (const f of mdFiles) {
    try {
      const text = readFileSync(f, "utf8");
      const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!fm) continue;
      const cm = fm[1].match(/^classification:\s*["\x27]?([^"\x27\n]+)/m);
      if (!cm) continue;
      const cls = cm[1].trim().toLowerCase();
      if (BLOCKED.has(cls)) {
        console.error(`  [FAIL] Restricted classification "${cls}" in ${path.relative(targetDir, f)}`);
        classViolations++;
      }
    } catch {}
  }
  if (classViolations === 0) {
    console.log(`  [OK] Zero restricted classifications detected across ${mdFiles.length} markdown file(s).`);
  } else {
    failures += classViolations;
  }

  // 6. Private Source Exposure Scan
  console.log("\n--- 6. Private Source Exposure Scan ---");
  const FORBIDDEN_STRINGS = [
    "gitmoney-ai-office/SKILL.md",
    "cac-operator/SKILL.md",
    "mothership-skills/",
    "identity-forensics-audit/SKILL.md"
  ];
  let exposureCount = 0;
  for (const f of mdFiles) {
    const text = readFileSync(f, "utf8");
    for (const fs of FORBIDDEN_STRINGS) {
      if (text.includes(fs)) {
        console.error(`  [FAIL] Forbidden private source string "${fs}" in ${path.relative(targetDir, f)}`);
        exposureCount++;
      }
    }
  }
  if (exposureCount === 0) {
    console.log("  [OK] Zero private source exposures detected.");
  } else {
    failures += exposureCount;
  }

  // 7. Link Integrity Check
  console.log("\n--- 7. Link Integrity Check ---");
  const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;
  let brokenLinks = 0;
  let checkedLinks = 0;
  for (const f of mdFiles) {
    if (f.includes("node_modules")) continue;
    const content = readFileSync(f, "utf8");
    let match;
    while ((match = LINK_REGEX.exec(content)) !== null) {
      const link = match[2].trim();
      if (link.startsWith("http://") || link.startsWith("https://") || link.startsWith("#") || link.startsWith("mailto:")) {
        continue;
      }
      const cleanLink = link.split("#")[0].split("?")[0];
      if (!cleanLink) continue;
      const targetPath = path.resolve(path.dirname(f), cleanLink);
      checkedLinks++;
      if (!existsSync(targetPath)) {
        console.error(`  [FAIL] Broken link in ${path.relative(targetDir, f)}: "${link}" -> not found`);
        brokenLinks++;
      }
    }
  }
  if (brokenLinks === 0) {
    console.log(`  [OK] All ${checkedLinks} relative links resolved successfully.`);
  } else {
    failures += brokenLinks;
  }

  // 8. Git State Check
  console.log("\n--- 8. Git Repository State ---");
  try {
    const branch = execSync("git branch --show-current", { cwd: targetDir, encoding: "utf8" }).trim();
    const status = execSync("git status --short", { cwd: targetDir, encoding: "utf8" }).trim();
    console.log(`  [INFO] Active branch: ${branch || "HEAD (detached)"}`);
    if (status.length === 0) {
      console.log("  [OK] Working directory is clean.");
    } else {
      console.log(`  [WARN] Working directory has uncommitted modifications.`);
      warnings++;
    }
  } catch {
    console.log("  [WARN] Target is not a git repository.");
    warnings++;
  }

  // Summary Verdict
  console.log("\n==================================================");
  if (failures === 0) {
    console.log(`✅ [DOCTOR PASSED] All checks green. Warnings: ${warnings}`);
    console.log("==================================================");
    if (process.env.TEST_HARNESS !== "true") {
      process.exit(0);
    }
    return true;
  } else {
    console.error(`❌ [DOCTOR FAILED] Failures: ${failures}, Warnings: ${warnings}`);
    console.log("==================================================");
    if (process.env.TEST_HARNESS !== "true") {
      process.exit(1);
    }
    return false;
  }
}

// ----------------------------------------------------
// CLI Dispatcher
// ----------------------------------------------------
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === "--help" || command === "-h") {
  console.log("Usage: node scripts/gitmoney.mjs <command> [options]");
  console.log("");
  console.log("Commands:");
  console.log("  init <dir> [--with-vault]   Initialize a self-contained AI Office in <dir>");
  console.log("  init --here [--with-vault]  Initialize an AI Office in the current directory");
  console.log("  doctor [dir]                Audit repository architecture, boundaries, and health");
  process.exit(0);
}

if (command === "init") {
  runInit(args.slice(1));
} else if (command === "doctor") {
  const target = args[1] ? path.resolve(process.cwd(), args[1]) : process.cwd();
  runDoctor(target);
} else {
  console.error(`Unknown command: ${command}`);
  console.error("Run `node scripts/gitmoney.mjs --help` for available options.");
  process.exit(1);
}
