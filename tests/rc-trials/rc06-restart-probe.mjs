#!/usr/bin/env node
// Child-process probe used only by rc06-isolated-adapter.mjs.
import { readFileSync } from "node:fs";
import { evaluateAuthorityAction } from "../../scripts/authority-control.mjs";

const [authorityPath, grantPath, actionPath, repoRoot] = process.argv.slice(2);
if (!authorityPath || !grantPath || !actionPath || !repoRoot) {
  throw new Error("Usage: rc06-restart-probe <authority-store> <grant> <action> <repo-root>");
}
const envelope = JSON.parse(readFileSync(authorityPath, "utf8"));
const grant = JSON.parse(readFileSync(grantPath, "utf8"));
const action = JSON.parse(readFileSync(actionPath, "utf8"));
const decision = evaluateAuthorityAction(grant, envelope.state, action, new Date().toISOString(), repoRoot);
if (decision.decision !== "DENY") process.exitCode = 1;
console.log(JSON.stringify({ decision: decision.decision, reasons: decision.reasons, state: envelope.state }));
