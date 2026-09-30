import { randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { canonicalDirectory, canonicalFile } from "../filesystem.mjs";
import { fingerprint } from "../progress.mjs";
import { runProcess } from "../process-runner.mjs";

const INFRASTRUCTURE_PATTERN =
  /No test files found|Failed to load url|failed to load config|ERR_MODULE_NOT_FOUND|Cannot find module ['"]?@exercise|Cannot find type definition file/i;
const SYNTAX_DIAGNOSTIC_PATTERN = /error TS1\d{3}:/;
const CORRUPT_TOOL_PATTERN =
  /SyntaxError|ERR_MODULE_NOT_FOUND|Cannot find module|ENOENT/i;

function processDetail(result) {
  return result.detail || `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
}

function infrastructure(result, phase) {
  return {
    ok: false,
    kind: "infrastructure",
    phase,
    category: result.phase,
    detail: processDetail(result),
  };
}

function learnerFailure(result, phase, category) {
  return {
    ok: false,
    kind: "learner",
    phase,
    category,
    detail: processDetail(result),
  };
}

function success(phase, result = {}) {
  return {
    ok: true,
    kind: "success",
    phase,
    category: "passed",
    detail: processDetail(result),
  };
}

function toolFailure(error, phase) {
  return {
    ok: false,
    kind: "infrastructure",
    phase,
    category: "tooling",
    detail: `TypeScript adapter infrastructure: ${error.message}`,
  };
}

async function requiredTool(root, chapter, name, phase) {
  const candidate = chapter.adapterData.tools?.[name];
  if (typeof candidate !== "string") {
    return {
      result: toolFailure(
        new Error(`missing validated ${name} entry point`),
        phase,
      ),
    };
  }
  try {
    return {
      file: await canonicalFile(
        candidate,
        root,
        `TypeScript adapter ${name} entry point`,
      ),
    };
  } catch (error) {
    return { result: toolFailure(error, phase) };
  }
}

function isToolLaunchFailure(result, tool) {
  const detail = processDetail(result);
  return detail.includes(tool) && CORRUPT_TOOL_PATTERN.test(detail);
}

function targetFile(chapter, target) {
  if (target === "starter") return chapter.adapterData.starter;
  if (target === "validation-starter")
    return chapter.adapterData.validationStarter ?? chapter.adapterData.starter;
  if (target === "solution") return chapter.adapterData.solution;
  throw new Error(`Unknown TypeScript exercise target: ${target}`);
}

async function sourceFiles(chapter) {
  const entries = await readdir(chapter.absolutePath);
  const files = [];
  for (const name of entries.sort()) {
    if (!name.endsWith(".ts") || name.endsWith(".test.ts")) continue;
    files.push(
      await canonicalFile(
        path.join(chapter.absolutePath, name),
        chapter.absolutePath,
        `${chapter.id} learner source ${name}`,
      ),
    );
  }
  return files;
}

export function createTypeScriptAdapter({ execute = runProcess } = {}) {
  return {
    id: "typescript",

    async validateChapter({ root, language, chapter }) {
      const solutionDirectory = await canonicalDirectory(
        path.join(chapter.absolutePath, ".solution"),
        chapter.absolutePath,
        `${chapter.id} solution directory`,
      );
      chapter.adapterData = {
        starter: await canonicalFile(
          path.join(chapter.absolutePath, "starter.ts"),
          chapter.absolutePath,
          `${chapter.id} starter`,
        ),
        test: await canonicalFile(
          path.join(chapter.absolutePath, "exercise.test.ts"),
          chapter.absolutePath,
          `${chapter.id} visible test`,
        ),
        readme: await canonicalFile(
          path.join(chapter.absolutePath, "README.md"),
          chapter.absolutePath,
          `${chapter.id} exercise README`,
        ),
        solution: await canonicalFile(
          path.join(solutionDirectory, "solution.ts"),
          solutionDirectory,
          `${chapter.id} solution`,
        ),
        trackConfig: await canonicalFile(
          path.join(language.trackRoot, "tsconfig.json"),
          language.trackRoot,
          `${language.id} TypeScript config`,
        ),
        vitestConfig: await canonicalFile(
          path.join(root, "packages", "cli", "vitest.config.mjs"),
          root,
          "TypeScript test-runner config",
        ),
      };
      if (chapter.validationStarter) {
        chapter.adapterData.validationStarter = await canonicalFile(
          path.join(chapter.absolutePath, chapter.validationStarter),
          chapter.absolutePath,
          `${chapter.id} validation starter`,
        );
      }
      try {
        chapter.adapterData.tools = {
          tsc: await canonicalFile(
            path.join(root, "node_modules", "typescript", "bin", "tsc"),
            root,
            "TypeScript compiler entry point",
          ),
          vitest: await canonicalFile(
            path.join(root, "node_modules", "vitest", "vitest.mjs"),
            root,
            "Vitest entry point",
          ),
          tsx: await canonicalFile(
            path.join(root, "node_modules", "tsx", "dist", "cli.mjs"),
            root,
            "tsx entry point",
          ),
        };
      } catch (error) {
        const infrastructureError = new Error(
          `TypeScript adapter infrastructure: ${error.message}`,
          { cause: error },
        );
        infrastructureError.kind = "infrastructure";
        throw infrastructureError;
      }
      chapter.adapterData.sources = await sourceFiles(chapter);
    },

    async fingerprintChapter({ chapter }) {
      const parts = [];
      for (const file of chapter.adapterData.sources) {
        parts.push([
          `source:${path.relative(chapter.absolutePath, file)}`,
          await readFile(file),
        ]);
      }
      parts.push([
        "tests:exercise.test.ts",
        await readFile(chapter.adapterData.test),
      ]);
      parts.push([
        "contract:README.md",
        await readFile(chapter.adapterData.readme),
      ]);
      return fingerprint(parts);
    },

    async test({ root, chapter, target = "starter" }) {
      const compiler = await requiredTool(root, chapter, "tsc", "typecheck");
      if (compiler.result) return compiler.result;
      const exerciseFile = targetFile(chapter, target);
      const temporaryDirectory = path.join(root, ".learn-code", "tmp");
      const configFile = path.join(
        temporaryDirectory,
        `tsconfig-${randomUUID()}.json`,
      );
      await mkdir(temporaryDirectory, { recursive: true });
      try {
        await writeFile(
          configFile,
          JSON.stringify({
            extends: chapter.adapterData.trackConfig,
            compilerOptions: {
              baseUrl: root,
              noEmit: true,
              paths: { "@exercise": [exerciseFile] },
              types: ["vitest/globals"],
            },
            include: [exerciseFile, chapter.adapterData.test],
          }),
          { flag: "wx" },
        );
        const checked = await execute(
          process.execPath,
          [compiler.file, "--project", configFile, "--pretty", "false"],
          { cwd: root },
        );
        if (!checked.ok) {
          const detail = processDetail(checked);
          if (
            checked.kind === "infrastructure" ||
            isToolLaunchFailure(checked, compiler.file) ||
            INFRASTRUCTURE_PATTERN.test(detail)
          )
            return infrastructure(checked, "typecheck");
          return learnerFailure(
            checked,
            "typecheck",
            SYNTAX_DIAGNOSTIC_PATTERN.test(detail) ? "syntax" : "compile",
          );
        }

        const testRunner = await requiredTool(root, chapter, "vitest", "tests");
        if (testRunner.result) return testRunner.result;
        const tested = await execute(
          process.execPath,
          [
            testRunner.file,
            "run",
            chapter.adapterData.test,
            "--config",
            chapter.adapterData.vitestConfig,
            "--no-color",
          ],
          {
            cwd: root,
            env: { LEARN_TS_EXERCISE: exerciseFile },
          },
        );
        if (!tested.ok) {
          const detail = processDetail(tested);
          if (
            tested.kind === "infrastructure" ||
            isToolLaunchFailure(tested, testRunner.file) ||
            INFRASTRUCTURE_PATTERN.test(detail)
          )
            return infrastructure(tested, "tests");
          return learnerFailure(tested, "tests", "assertion");
        }
        return success("tests", tested);
      } finally {
        await rm(configFile, { force: true });
      }
    },

    async typecheck({ root, chapter, target = "starter" }) {
      const compiler = await requiredTool(root, chapter, "tsc", "typecheck");
      if (compiler.result) return compiler.result;
      const result = await execute(
        process.execPath,
        [
          compiler.file,
          "--noEmit",
          "--strict",
          "--noUncheckedIndexedAccess",
          "--exactOptionalPropertyTypes",
          "--useUnknownInCatchVariables",
          "--target",
          "ES2022",
          "--module",
          "NodeNext",
          "--moduleResolution",
          "NodeNext",
          "--experimentalDecorators",
          "--skipLibCheck",
          targetFile(chapter, target),
        ],
        { cwd: root },
      );
      if (result.ok) return success("typecheck", result);
      if (
        result.kind === "infrastructure" ||
        isToolLaunchFailure(result, compiler.file)
      )
        return infrastructure(result, "typecheck");
      return learnerFailure(
        result,
        "typecheck",
        SYNTAX_DIAGNOSTIC_PATTERN.test(processDetail(result))
          ? "syntax"
          : "compile",
      );
    },

    async run({ root, chapter }) {
      const runner = await requiredTool(root, chapter, "tsx", "run");
      if (runner.result) return runner.result;
      const result = await execute(
        process.execPath,
        [
          runner.file,
          "--tsconfig",
          chapter.adapterData.trackConfig,
          chapter.adapterData.starter,
        ],
        { cwd: root },
      );
      if (result.ok) return success("run", result);
      if (
        result.kind === "infrastructure" ||
        isToolLaunchFailure(result, runner.file)
      )
        return infrastructure(result, "run");
      return learnerFailure(result, "run", "runtime");
    },

    async solution({ chapter }) {
      return readFile(chapter.adapterData.solution, "utf8");
    },
  };
}

export const typescriptAdapter = createTypeScriptAdapter();
