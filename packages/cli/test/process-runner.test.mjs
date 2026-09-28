import assert from "node:assert/strict";
import test from "node:test";
import { runProcess } from "../process-runner.mjs";

test("missing executables are normalized as infrastructure failures", async () => {
  const result = await runProcess(`missing-learn-code-${Date.now()}`, []);
  assert.equal(result.ok, false);
  assert.equal(result.kind, "infrastructure");
  assert.equal(result.phase, "spawn");
  assert.match(result.detail, /Unable to start/);
});

test("timeouts terminate the child and report infrastructure failure", async () => {
  const result = await runProcess(
    process.execPath,
    ["-e", "setTimeout(() => {}, 10_000)"],
    { timeoutMs: 30 },
  );
  assert.equal(result.ok, false);
  assert.equal(result.kind, "infrastructure");
  assert.equal(result.phase, "timeout");
});

test("nonzero exits preserve bounded diagnostics", async () => {
  const result = await runProcess(process.execPath, [
    "-e",
    "console.error('learner failure'); process.exit(7)",
  ]);
  assert.equal(result.ok, false);
  assert.equal(result.kind, "process");
  assert.equal(result.code, 7);
  assert.match(result.detail, /learner failure/);
});

test("output limits terminate noisy children without retaining unbounded data", async () => {
  const result = await runProcess(
    process.execPath,
    ["-e", "process.stdout.write('x'.repeat(100_000))"],
    { maxOutputBytes: 1_024 },
  );
  assert.equal(result.ok, false);
  assert.equal(result.kind, "infrastructure");
  assert.equal(result.phase, "output-limit");
  assert.ok(Buffer.byteLength(result.stdout) <= 1_024);
});

test("signal exits are normalized without an exit code", async (context) => {
  if (process.platform === "win32") {
    context.skip("POSIX signal semantics are unavailable on Windows");
    return;
  }
  const result = await runProcess(process.execPath, [
    "-e",
    "process.kill(process.pid, 'SIGTERM')",
  ]);
  assert.equal(result.ok, false);
  assert.equal(result.kind, "process");
  assert.equal(result.code, null);
  assert.equal(result.signal, "SIGTERM");
  assert.match(result.detail, /signal SIGTERM/);
});
