import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, readFile, readlink, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);
const cli = path.join(root, "packages", "cli", "cli.mjs");
const launcher = path.join(root, "ezy");
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

test("the ezy launcher exposes concise commands from outside the repository", async () => {
  const result = await new Promise((resolve) => {
    const child = spawn(process.execPath, [launcher, "--help"], {
      cwd: os.tmpdir(),
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    child.stdout.on("data", (chunk) => (output += chunk));
    child.stderr.on("data", (chunk) => (output += chunk));
    child.on("close", (code) => resolve({ code, output }));
  });
  assert.equal(result.code, 0);
  assert.match(result.output, /ezy start \[chapter\]/);
  assert.match(result.output, /ezy path \[chapter\]/);
  assert.match(result.output, /ezy submit \[chapter\]/);
});

test("the generated shell hook delegates start and enters its selected path", async () => {
  const result = await execute(process.execPath, [launcher, "init", "bash"]);
  assert.equal(result.code, 0, result.output);
  assert.match(result.output, /command ezy "\$@"/);
  assert.match(result.output, /command ezy path "\$\{@:2\}" --absolute/);
  assert.match(result.output, /builtin cd -- "\$ezy_directory"/);
});

test("the launcher installs and removes only its own ezy symlink", async () => {
  const binDirectory = await mkdtemp(path.join(os.tmpdir(), "ezy-bin-"));
  try {
    const environment = { ...process.env, EZY_BIN_DIR: binDirectory };
    const installed = await new Promise((resolve) => {
      const child = spawn(process.execPath, [launcher, "install"], {
        cwd: root,
        env: environment,
        stdio: ["ignore", "pipe", "pipe"],
      });
      let output = "";
      child.stdout.on("data", (chunk) => (output += chunk));
      child.stderr.on("data", (chunk) => (output += chunk));
      child.on("close", (code) => resolve({ code, output }));
    });
    assert.equal(installed.code, 0, installed.output);
    assert.equal(
      path.resolve(
        binDirectory,
        await readlink(path.join(binDirectory, "ezy")),
      ),
      launcher,
    );

    const removed = await new Promise((resolve) => {
      const child = spawn(process.execPath, [launcher, "uninstall"], {
        cwd: root,
        env: environment,
        stdio: ["ignore", "pipe", "pipe"],
      });
      let output = "";
      child.stdout.on("data", (chunk) => (output += chunk));
      child.stderr.on("data", (chunk) => (output += chunk));
      child.on("close", (code) => resolve({ code, output }));
    });
    assert.equal(removed.code, 0, removed.output);
    await assert.rejects(stat(path.join(binDirectory, "ezy")), {
      code: "ENOENT",
    });
  } finally {
    await rm(binDirectory, { recursive: true, force: true });
  }
});

test("the installer manages an idempotent shell hook", async () => {
  const homeDirectory = await mkdtemp(path.join(os.tmpdir(), "ezy-home-"));
  const binDirectory = path.join(homeDirectory, "bin");
  const environment = {
    ...process.env,
    EZY_BIN_DIR: binDirectory,
    EZY_HOME: homeDirectory,
    SHELL: "/bin/bash",
  };
  const run = (args) =>
    new Promise((resolve) => {
      const child = spawn(process.execPath, [launcher, ...args], {
        cwd: root,
        env: environment,
        stdio: ["ignore", "pipe", "pipe"],
      });
      let output = "";
      child.stdout.on("data", (chunk) => (output += chunk));
      child.stderr.on("data", (chunk) => (output += chunk));
      child.on("close", (code) => resolve({ code, output }));
    });
  try {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const installed = await run(["install", "--shell"]);
      assert.equal(installed.code, 0, installed.output);
    }
    const bashrc = await readFile(path.join(homeDirectory, ".bashrc"), "utf8");
    assert.equal((bashrc.match(/>>> Learning Ezy Code >>>/g) ?? []).length, 1);
    assert.match(bashrc, /ezy" init bash/);

    const removed = await run(["uninstall", "--shell"]);
    assert.equal(removed.code, 0, removed.output);
    assert.doesNotMatch(
      await readFile(path.join(homeDirectory, ".bashrc"), "utf8"),
      /Learning Ezy Code/,
    );
  } finally {
    await rm(homeDirectory, { recursive: true, force: true });
  }
});

test("ezy start rejects invalid chapters without changing progress", async () => {
  const before = await stateSnapshot();
  const result = await execute(process.execPath, [
    launcher,
    "start",
    "definitely-not-a-chapter",
    "--language",
    "typescript",
  ]);
  assert.notEqual(result.code, 0);
  assert.match(result.output, /No chapter matches 'definitely-not-a-chapter'/);
  assert.deepEqual(await stateSnapshot(), before);
});
