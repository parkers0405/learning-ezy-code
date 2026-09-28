import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);
const cli = path.join(root, "packages", "cli", "cli.mjs");
const stateFile = path.join(root, ".learn-code", "state.json");

function execute(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: root,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    child.stdout.on("data", (chunk) => (output += chunk));
    child.stderr.on("data", (chunk) => (output += chunk));
    child.on("close", (code) => resolve({ code, output }));
  });
}

async function stateSnapshot() {
  try {
    const metadata = await stat(stateFile, { bigint: true });
    return {
      exists: true,
      contents: await readFile(stateFile, "utf8"),
      mtimeNs: metadata.mtimeNs,
    };
  } catch (error) {
    if (error.code === "ENOENT") {
      return { exists: false, contents: undefined, mtimeNs: undefined };
    }
    throw error;
  }
}

test("explicit chapter typos fail before test or submission and preserve state", async () => {
  const before = await stateSnapshot();
  for (const command of ["chapter", "test", "submit"]) {
    const result = await execute(process.execPath, [
      cli,
      command,
      "definitely-not-a-chapter",
      "--language",
      "typescript",
    ]);
    assert.notEqual(result.code, 0, `${command} unexpectedly succeeded`);
    assert.match(
      result.output,
      /No chapter matches 'definitely-not-a-chapter'/,
    );
    assert.deepEqual(await stateSnapshot(), before);
  }
});

test("the root chapter script forwards the chapter subcommand", async () => {
  const before = await stateSnapshot();
  const result = await execute("corepack", [
    "yarn",
    "chapter",
    "definitely-not-a-chapter",
    "--language",
    "typescript",
  ]);
  assert.notEqual(result.code, 0);
  assert.match(result.output, /No chapter matches 'definitely-not-a-chapter'/);
  assert.doesNotMatch(result.output, /Unknown command/);
  assert.deepEqual(await stateSnapshot(), before);
});
