import { spawn } from "node:child_process";

const DEFAULT_TIMEOUT_MS = 120_000;
const DEFAULT_MAX_OUTPUT_BYTES = 1_048_576;

function detailFor(result) {
  const output = `${result.stdout}${result.stderr}`.trim();
  if (output) return output;
  if (result.signal) return `Process terminated by signal ${result.signal}.`;
  if (result.code !== 0 && result.code !== null) {
    return `Process exited with code ${result.code}.`;
  }
  return "";
}

export function runProcess(
  command,
  args,
  {
    cwd,
    env = {},
    timeoutMs = DEFAULT_TIMEOUT_MS,
    maxOutputBytes = DEFAULT_MAX_OUTPUT_BYTES,
    spawnImplementation = spawn,
  } = {},
) {
  return new Promise((resolve) => {
    let child;
    try {
      child = spawnImplementation(command, args, {
        cwd,
        env: { ...process.env, ...env },
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (error) {
      resolve({
        ok: false,
        kind: "infrastructure",
        phase: "spawn",
        code: null,
        signal: null,
        stdout: "",
        stderr: "",
        detail: `Unable to start ${command}: ${error.message}`,
      });
      return;
    }

    let settled = false;
    let stdout = Buffer.alloc(0);
    let stderr = Buffer.alloc(0);
    let outputExceeded = false;
    let timedOut = false;
    let timer;

    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ ...result, detail: result.detail ?? detailFor(result) });
    };

    const append = (stream, chunk) => {
      const current = stream === "stdout" ? stdout : stderr;
      const remaining = Math.max(
        0,
        maxOutputBytes - stdout.length - stderr.length,
      );
      const next = Buffer.concat([
        current,
        Buffer.from(chunk).subarray(0, remaining),
      ]);
      if (stream === "stdout") stdout = next;
      else stderr = next;
      if (Buffer.byteLength(chunk) > remaining && !outputExceeded) {
        outputExceeded = true;
        child.kill("SIGKILL");
      }
    };

    child.stdout?.on("data", (chunk) => append("stdout", chunk));
    child.stderr?.on("data", (chunk) => append("stderr", chunk));
    child.once("error", (error) =>
      finish({
        ok: false,
        kind: "infrastructure",
        phase: "spawn",
        code: null,
        signal: null,
        stdout: stdout.toString(),
        stderr: stderr.toString(),
        detail: `Unable to start ${command}: ${error.message}`,
      }),
    );
    child.once("close", (code, signal) => {
      const output = {
        code,
        signal,
        stdout: stdout.toString(),
        stderr: stderr.toString(),
      };
      if (timedOut) {
        finish({
          ...output,
          ok: false,
          kind: "infrastructure",
          phase: "timeout",
          detail: `${command} timed out after ${timeoutMs}ms`,
        });
      } else if (outputExceeded) {
        finish({
          ...output,
          ok: false,
          kind: "infrastructure",
          phase: "output-limit",
          detail: `${command} exceeded the ${maxOutputBytes}-byte output limit`,
        });
      } else {
        finish({
          ...output,
          ok: code === 0,
          kind: code === 0 ? "success" : "process",
          phase: "process",
        });
      }
    });

    timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, timeoutMs);
    timer.unref?.();
  });
}
