import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  assertAdapterContract,
  assertAdapterResult,
} from "../adapters/index.mjs";
import { createTypeScriptAdapter } from "../adapters/typescript.mjs";

function chapterFixture(root) {
  return {
    id: "fixture",
    absolutePath: path.join(root, "chapter"),
    adapterData: {
      starter: path.join(root, "chapter", "starter.ts"),
      solution: path.join(root, "chapter", ".solution", "solution.ts"),
      test: path.join(root, "chapter", "exercise.test.ts"),
      trackConfig: path.join(root, "tsconfig.json"),
      vitestConfig: path.join(root, "vitest.config.mjs"),
      tools: {
        tsc: path.join(root, "tools", "tsc"),
        vitest: path.join(root, "tools", "vitest.mjs"),
        tsx: path.join(root, "tools", "tsx.mjs"),
      },
    },
  };
}

async function writeFakeTools(root) {
  await mkdir(path.join(root, "tools"), { recursive: true });
  await Promise.all(
    ["tsc", "vitest.mjs", "tsx.mjs"].map((name) =>
      writeFile(path.join(root, "tools", name), "export {}\n"),
    ),
  );
}

test("trusted adapters satisfy the generic adapter contract", () => {
  assert.equal(
    assertAdapterContract(createTypeScriptAdapter()).id,
    "typescript",
  );
  assert.throws(
    () => assertAdapterContract({ id: "broken" }),
    /missing validateChapter/,
  );
  assert.throws(
    () => assertAdapterResult({ ok: true }, "test"),
    /invalid result/,
  );
  assert.throws(
    () =>
      assertAdapterResult(
        {
          ok: true,
          kind: "learner",
          phase: "tests",
          category: "assertion",
          detail: "contradictory",
        },
        "test",
      ),
    /invalid result/,
  );
});

test("the TypeScript adapter normalizes typecheck and assertion failures", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-adapter-"));
  try {
    await mkdir(path.join(root, ".learn-code", "tmp"), { recursive: true });
    await writeFakeTools(root);
    const chapter = chapterFixture(root);
    let calls = 0;
    const compileAdapter = createTypeScriptAdapter({
      execute: async () => ({
        ok: false,
        kind: "process",
        phase: "process",
        stdout: "error TS2322: Type mismatch",
        stderr: "",
        detail: "error TS2322: Type mismatch",
      }),
    });
    const compile = await compileAdapter.test({ root, chapter });
    assert.deepEqual(
      { kind: compile.kind, phase: compile.phase, category: compile.category },
      { kind: "learner", phase: "typecheck", category: "compile" },
    );

    const syntaxAdapter = createTypeScriptAdapter({
      execute: async () => ({
        ok: false,
        kind: "process",
        phase: "process",
        stdout: "error TS1005: Expression expected",
        stderr: "",
        detail: "error TS1005: Expression expected",
      }),
    });
    const syntax = await syntaxAdapter.typecheck({ root, chapter });
    assert.deepEqual(
      { kind: syntax.kind, phase: syntax.phase, category: syntax.category },
      { kind: "learner", phase: "typecheck", category: "syntax" },
    );

    const infrastructureAdapter = createTypeScriptAdapter({
      execute: async () => ({
        ok: false,
        kind: "process",
        phase: "process",
        stdout: "Cannot find type definition file for 'vitest'",
        stderr: "",
        detail: "Cannot find type definition file for 'vitest'",
      }),
    });
    const infrastructure = await infrastructureAdapter.test({ root, chapter });
    assert.equal(infrastructure.kind, "infrastructure");
    assert.equal(infrastructure.phase, "typecheck");

    const assertionAdapter = createTypeScriptAdapter({
      execute: async () => {
        calls += 1;
        return calls === 1
          ? {
              ok: true,
              kind: "success",
              phase: "process",
              stdout: "",
              stderr: "",
              detail: "",
            }
          : {
              ok: false,
              kind: "process",
              phase: "process",
              stdout: "expected 1 to be 2",
              stderr: "",
              detail: "expected 1 to be 2",
            };
      },
    });
    const assertion = await assertionAdapter.test({ root, chapter });
    assert.deepEqual(
      {
        kind: assertion.kind,
        phase: assertion.phase,
        category: assertion.category,
      },
      { kind: "learner", phase: "tests", category: "assertion" },
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("missing or wrong-type tool entry points are infrastructure failures", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-tools-"));
  try {
    await writeFakeTools(root);
    const chapter = chapterFixture(root);
    await rm(chapter.adapterData.tools.tsc);
    const missingCompiler = await createTypeScriptAdapter().typecheck({
      root,
      chapter,
    });
    assert.deepEqual(
      {
        kind: missingCompiler.kind,
        phase: missingCompiler.phase,
        category: missingCompiler.category,
      },
      { kind: "infrastructure", phase: "typecheck", category: "tooling" },
    );

    await mkdir(chapter.adapterData.tools.tsc);
    let launches = 0;
    const adapter = createTypeScriptAdapter({
      execute: async () => {
        launches += 1;
        return {
          ok: true,
          kind: "success",
          phase: "process",
          stdout: "",
          stderr: "",
          detail: "",
        };
      },
    });
    const wrongCompilerType = await adapter.test({ root, chapter });
    assert.equal(wrongCompilerType.kind, "infrastructure");
    assert.equal(launches, 0);

    await rm(chapter.adapterData.tools.tsc, { recursive: true });
    await writeFile(chapter.adapterData.tools.tsc, "export {}\n");
    await rm(chapter.adapterData.tools.vitest);
    const missingVitest = await adapter.test({ root, chapter });
    assert.equal(missingVitest.kind, "infrastructure");
    assert.equal(missingVitest.phase, "tests");
    assert.equal(launches, 1);

    await writeFile(chapter.adapterData.tools.vitest, "export {}\n");
    const corruptCompilerAdapter = createTypeScriptAdapter({
      execute: async (_command, args) => ({
        ok: false,
        kind: "process",
        phase: "process",
        stdout: "",
        stderr: `SyntaxError: Unexpected token in ${args[0]}`,
        detail: `SyntaxError: Unexpected token in ${args[0]}`,
      }),
    });
    const corruptCompiler = await corruptCompilerAdapter.typecheck({
      root,
      chapter,
    });
    assert.equal(corruptCompiler.kind, "infrastructure");
    assert.equal(corruptCompiler.phase, "typecheck");

    let corruptCalls = 0;
    const corruptAdapter = createTypeScriptAdapter({
      execute: async (_command, args) => {
        corruptCalls += 1;
        if (corruptCalls === 1) {
          return {
            ok: true,
            kind: "success",
            phase: "process",
            stdout: "",
            stderr: "",
            detail: "",
          };
        }
        return {
          ok: false,
          kind: "process",
          phase: "process",
          stdout: "",
          stderr: `SyntaxError: Unexpected token in ${args[0]}`,
          detail: `SyntaxError: Unexpected token in ${args[0]}`,
        };
      },
    });
    const corruptVitest = await corruptAdapter.test({ root, chapter });
    assert.equal(corruptVitest.kind, "infrastructure");
    assert.equal(corruptVitest.phase, "tests");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("chapter validation canonicalizes tool entry points as contained regular files", async () => {
  const root = await mkdtemp(
    path.join(os.tmpdir(), "learn-code-tool-contract-"),
  );
  try {
    const chapterPath = path.join(root, "chapter");
    await mkdir(path.join(chapterPath, ".solution"), { recursive: true });
    await Promise.all([
      writeFile(path.join(chapterPath, "starter.ts"), "export {}\n"),
      writeFile(path.join(chapterPath, "exercise.test.ts"), "export {}\n"),
      writeFile(path.join(chapterPath, "README.md"), "# Exercise\n"),
      writeFile(
        path.join(chapterPath, ".solution", "solution.ts"),
        "export {}\n",
      ),
      writeFile(path.join(root, "tsconfig.json"), "{}\n"),
    ]);
    await mkdir(path.join(root, "packages", "cli"), { recursive: true });
    await writeFile(
      path.join(root, "packages", "cli", "vitest.config.mjs"),
      "export default {}\n",
    );
    await mkdir(path.join(root, "node_modules", "typescript", "bin"), {
      recursive: true,
    });
    await mkdir(path.join(root, "node_modules", "vitest"), { recursive: true });
    await mkdir(path.join(root, "node_modules", "tsx", "dist"), {
      recursive: true,
    });
    await mkdir(path.join(root, "node_modules", "typescript", "bin", "tsc"));
    await writeFile(
      path.join(root, "node_modules", "vitest", "vitest.mjs"),
      "export {}\n",
    );
    await writeFile(
      path.join(root, "node_modules", "tsx", "dist", "cli.mjs"),
      "export {}\n",
    );
    const adapter = createTypeScriptAdapter();
    await assert.rejects(
      adapter.validateChapter({
        root,
        language: { id: "typescript", trackRoot: root },
        chapter: { id: "fixture", absolutePath: chapterPath },
      }),
      (error) =>
        error.kind === "infrastructure" &&
        /compiler entry point must be a regular file/.test(error.message),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("TypeScript contract validation rejects source symlink escapes", async (context) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-adapter-"));
  const outside = await mkdtemp(path.join(os.tmpdir(), "learn-code-source-"));
  try {
    const chapterPath = path.join(root, "chapter");
    await mkdir(path.join(chapterPath, ".solution"), { recursive: true });
    await writeFile(path.join(outside, "starter.ts"), "export {}\n");
    try {
      await symlink(
        path.join(outside, "starter.ts"),
        path.join(chapterPath, "starter.ts"),
        "file",
      );
    } catch (error) {
      if (["EPERM", "EACCES", "ENOTSUP"].includes(error.code)) {
        context.skip(`symlink creation unavailable: ${error.code}`);
        return;
      }
      throw error;
    }
    await writeFile(path.join(chapterPath, "exercise.test.ts"), "export {}\n");
    await writeFile(path.join(chapterPath, "README.md"), "# Exercise\n");
    await writeFile(
      path.join(chapterPath, ".solution", "solution.ts"),
      "export {}\n",
    );
    await writeFile(path.join(root, "tsconfig.json"), "{}\n");
    await mkdir(path.join(root, "packages", "cli"), { recursive: true });
    await writeFile(
      path.join(root, "packages", "cli", "vitest.config.mjs"),
      "export default {}\n",
    );
    const adapter = createTypeScriptAdapter();
    await assert.rejects(
      adapter.validateChapter({
        root,
        language: { id: "typescript", trackRoot: root },
        chapter: { id: "fixture", absolutePath: chapterPath },
      }),
      /fixture starter escapes/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
    await rm(outside, { recursive: true, force: true });
  }
});
