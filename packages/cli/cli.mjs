#!/usr/bin/env node
import path from "node:path";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  assertAdapterResult,
  getAdapter,
  registeredAdapterIds,
} from "./adapters/index.mjs";
import { loadCatalog, resolveChapter, resolveLanguage } from "./manifest.mjs";
import {
  calculateRoadmap,
  progressBar,
  recordCompletion,
} from "./progress.mjs";
import { loadState, trackState, transactState } from "./state.mjs";

const root = path.resolve(
  process.env.EZY_ROOT ??
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.."),
);
const stateFile = process.env.EZY_STATE_FILE
  ? path.resolve(process.env.EZY_STATE_FILE)
  : undefined;

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function extractLanguage(arguments_) {
  const args = [...arguments_];
  const index = args.indexOf("--language");
  if (index === -1) return { args };
  const languageId = args[index + 1];
  if (!languageId) throw new Error("--language requires an id");
  args.splice(index, 2);
  return { args, languageId };
}

async function fingerprints(language, adapter) {
  return Object.fromEntries(
    await Promise.all(
      language.chapters.map(async (chapter) => [
        chapter.id,
        await adapter.fingerprintChapter({ root, language, chapter }),
      ]),
    ),
  );
}

function chooseChapter(language, requested, roadmap) {
  const frontier = roadmap.entries[roadmap.frontierIndex];
  if (!frontier) throw new Error(`Language '${language.id}' has no chapters.`);
  if (requested) {
    const explicit = resolveChapter(language, requested);
    if (!explicit) throw new Error(`No chapter matches '${requested}'.`);
    const entry = roadmap.entries.find(({ id }) => id === explicit.id);
    if (!entry.unlocked) {
      throw new Error(
        `${explicit.number}. ${explicit.title} is locked. Current chapter: ${frontier.number}. ${frontier.title}.`,
      );
    }
    return explicit;
  }
  return frontier;
}

function printResult(result) {
  if (result.detail) console.log(result.detail);
  return result.ok;
}

async function main() {
  const extracted = extractLanguage(process.argv.slice(2));
  const [requestedCommand = "status", ...requestedArgs] = extracted.args;
  if (["help", "--help", "-h"].includes(requestedCommand)) {
    console.log(`Learning Ezy Code

Usage:
  ezy tracks
  ezy use <language>
  ezy start [chapter]
  ezy path [chapter] [--absolute]
  ezy status
  ezy read [chapter] [--print]
  ezy run [chapter]
  ezy test [chapter]
  ezy submit [chapter]
  ezy solution [chapter]

Add --language <id> to target a track without changing the active language.`);
    return;
  }
  if (requestedCommand === "init") {
    const shell = requestedArgs[0];
    if (!["bash", "zsh"].includes(shell)) {
      throw new Error("Usage: ezy init <bash | zsh>");
    }
    console.log(`ezy() {
  if [ "\${1-}" = "start" ]; then
    command ezy "$@" || return $?
    local ezy_directory
    ezy_directory="$(command ezy path "\${@:2}" --absolute)" || return $?
    builtin cd -- "$ezy_directory" || return $?
    printf 'Entered %s\\n' "$PWD"
  else
    command ezy "$@"
  fi
}`);
    return;
  }
  const aliases = new Map([
    ["tracks", "languages"],
    ["status", "roadmap"],
  ]);
  let command = aliases.get(requestedCommand) ?? requestedCommand;
  let args = requestedArgs;
  if (requestedCommand === "use") {
    command = "language";
    args = ["use", ...requestedArgs];
  }
  const catalog = await loadCatalog(root);
  for (const candidate of catalog.languages) {
    const candidateAdapter = getAdapter(candidate.adapter);
    if (candidateAdapter.validateChapter) {
      for (const chapter of candidate.chapters) {
        await candidateAdapter.validateChapter({
          root,
          language: candidate,
          chapter,
        });
      }
    }
  }
  const loaded = await loadState({ root, catalog, stateFile });
  if (loaded.warning) console.warn(loaded.warning);
  if (loaded.migrated)
    console.log("Migrated legacy progress to .learn-code/state.json.");
  const languageId = extracted.languageId ?? loaded.state.activeLanguage;
  const language = resolveLanguage(catalog, languageId);
  if (!language)
    throw new Error(`Unknown language '${languageId}'. Run 'yarn languages'.`);
  const adapter = getAdapter(language.adapter);
  let navigation;
  async function getNavigation() {
    if (!navigation) {
      const allFingerprints = await fingerprints(language, adapter);
      const track = trackState(loaded.state, language.id);
      navigation = {
        allFingerprints,
        roadmap: calculateRoadmap(
          language.chapters,
          track.completions ?? {},
          allFingerprints,
        ),
      };
    }
    return navigation;
  }
  async function navigatedChapter(requested, { normalize = true } = {}) {
    const { roadmap } = await getNavigation();
    const chapter = chooseChapter(language, requested, roadmap);
    if (!requested && normalize) {
      const track = trackState(loaded.state, language.id);
      if (track.selectedChapter !== chapter.id) {
        const updated = await transactState({
          root,
          catalog,
          stateFile,
          mutate: async (state) => {
            state.tracks[language.id] = {
              ...trackState(state, language.id),
              selectedChapter: chapter.id,
            };
            return { state };
          },
        });
        loaded.state = updated.state;
        if (updated.warning) console.warn(updated.warning);
      }
    }
    return chapter;
  }

  if (command === "languages") {
    for (const item of catalog.languages)
      console.log(
        `${item.id === loaded.state.activeLanguage ? "*" : " "} ${item.id.padEnd(12)} ${item.name}`,
      );
    return;
  }
  if (command === "language") {
    if (args[0] === "show" || !args[0]) {
      console.log(
        `${language.name} (${language.id})\nManifest: ${path.relative(root, language.manifestPath)}\nAdapter: ${language.adapter}`,
      );
      return;
    }
    if (args[0] === "use") {
      const chosen = resolveLanguage(catalog, args[1]);
      if (!chosen) throw new Error(`Unknown language '${args[1]}'.`);
      getAdapter(chosen.adapter);
      const updated = await transactState({
        root,
        catalog,
        stateFile,
        mutate: async (state) => {
          state.activeLanguage = chosen.id;
          return { state };
        },
      });
      if (updated.warning) console.warn(updated.warning);
      console.log(`Active language: ${chosen.name}`);
      return;
    }
    throw new Error("Usage: yarn language [show | use <id>]");
  }
  if (command === "validate-manifests") {
    console.log(
      `Validated ${catalog.languages.length} language(s); trusted adapters: ${registeredAdapterIds().join(", ")}.`,
    );
    return;
  }
  if (command === "list" || command === "chapters") {
    for (const chapter of language.chapters)
      console.log(
        `${String(chapter.number).padStart(2)}  ${chapter.id.padEnd(30)} ${chapter.title}`,
      );
    return;
  }
  if (command === "path") {
    const chapter = await navigatedChapter(
      args.find((arg) => !arg.startsWith("--")),
    );
    console.log(
      args.includes("--absolute")
        ? chapter.absolutePath
        : path.relative(root, chapter.absolutePath),
    );
    return;
  }
  if (command === "chapter" || command === "start") {
    const chapter = await navigatedChapter(args[0], { normalize: false });
    const updated = await transactState({
      root,
      catalog,
      stateFile,
      mutate: async (state) => {
        state.tracks[language.id] = {
          ...trackState(state, language.id),
          selectedChapter: chapter.id,
        };
        return { state };
      },
    });
    if (updated.warning) console.warn(updated.warning);
    const exercisePath = path.relative(root, chapter.absolutePath);
    if (command === "chapter") {
      console.log(
        `Selected ${chapter.number}. ${chapter.title}\n${exercisePath}`,
      );
      return;
    }
    console.log(`Started ${chapter.number}. ${chapter.title}`);
    console.log(`Exercise: ${exercisePath}`);
    console.log(`Edit: ${path.join(exercisePath, "starter.ts")}`);
    console.log("Required reading:");
    for (const reading of chapter.readingsResolved) {
      console.log(
        `- ${reading.title}: ${path.relative(root, reading.absolutePath)}`,
      );
    }
    console.log("\nNext commands: ezy read, ezy test, ezy submit");
    return;
  }
  if (command === "read") {
    const chapter = await navigatedChapter(
      args.find((arg) => !arg.startsWith("--")),
    );
    console.log(`Required reading for ${chapter.number}. ${chapter.title}:`);
    for (const reading of chapter.readingsResolved) {
      console.log(
        `- ${reading.title}: ${path.relative(root, reading.absolutePath)}`,
      );
      if (args.includes("--print"))
        console.log(`\n${await readFile(reading.absolutePath, "utf8")}`);
    }
    return;
  }
  if (command === "roadmap") {
    const { roadmap } = await getNavigation();
    console.log(
      `${language.name}: ${progressBar(roadmap.validCount, language.chapters.length)} ${roadmap.validCount}/${language.chapters.length}`,
    );
    for (const entry of roadmap.entries) {
      const marker = { passed: "✓", current: "→", stale: "!", locked: "·" }[
        entry.status
      ];
      console.log(
        `${marker} ${String(entry.number).padStart(2)} ${entry.title} [${entry.status}]`,
      );
      if (entry.current)
        for (const reading of entry.readingsResolved)
          console.log(
            `     read: ${reading.title} (${path.relative(root, reading.absolutePath)})`,
          );
    }
    return;
  }
  if (
    command === "test" &&
    (args.includes("--all") || args.includes("--section"))
  ) {
    const sectionFlag = args.indexOf("--section");
    const sectionId = sectionFlag === -1 ? undefined : args[sectionFlag + 1];
    if (sectionFlag !== -1 && !sectionId) {
      throw new Error("test --section requires a section id");
    }
    const selected = sectionId
      ? language.chapters.filter((chapter) => chapter.sectionId === sectionId)
      : language.chapters;
    if (selected.length === 0)
      throw new Error(`Unknown section '${sectionId}'.`);
    let failures = 0;
    for (const chapter of selected) {
      const result = assertAdapterResult(
        await adapter.test({
          root,
          language,
          chapter,
          target: "starter",
        }),
        "test",
      );
      console.log(`${result.ok ? "✓" : "✗"} ${chapter.id}`);
      if (!result.ok) {
        failures += 1;
        console.error(result.detail);
      }
    }
    console.log(
      `${selected.length - failures}/${selected.length} exercises passed.`,
    );
    if (failures > 0) process.exitCode = 1;
    return;
  }
  if (["run", "test", "typecheck", "submit", "solution"].includes(command)) {
    const chapter = await navigatedChapter(
      args.find((arg) => !arg.startsWith("--")),
    );
    if (command === "solution") {
      console.log(await adapter.solution({ root, language, chapter }));
      return;
    }
    if (command === "run") {
      const result = assertAdapterResult(
        await adapter.run({ root, language, chapter }),
        "run",
      );
      if (result.detail) console.log(result.detail);
      if (!result.ok) process.exitCode = 1;
      return;
    }
    if (command === "typecheck") {
      const result = assertAdapterResult(
        await adapter.typecheck({ root, language, chapter }),
        "typecheck",
      );
      if (result.detail) console.log(result.detail);
      if (!result.ok) process.exitCode = 1;
      return;
    }
    if (command === "submit") {
      const { roadmap } = await getNavigation();
      const entry = roadmap.entries.find(({ id }) => id === chapter.id);
      if (!entry.unlocked) {
        const frontier = roadmap.entries[roadmap.frontierIndex];
        throw new Error(
          `${chapter.number}. ${chapter.title} is locked. Current chapter: ${frontier.number}. ${frontier.title}.`,
        );
      }
    }
    const result = assertAdapterResult(
      await adapter.test({
        root,
        language,
        chapter,
        target: "starter",
      }),
      command,
    );
    if (!printResult(result))
      return fail(`${chapter.title}: ${result.phase} failed.`);
    if (command === "submit") {
      const nextChapter = language.chapters[chapter.number];
      const { allFingerprints } = await getNavigation();
      const updated = await transactState({
        root,
        catalog,
        stateFile,
        mutate: async (state) => {
          const track = trackState(state, language.id);
          const roadmap = calculateRoadmap(
            language.chapters,
            track.completions ?? {},
            allFingerprints,
          );
          const entry = roadmap.entries.find(
            (candidate) => candidate.id === chapter.id,
          );
          if (!entry.unlocked)
            throw new Error(
              "This chapter is locked. Submit earlier chapters first.",
            );
          state.tracks[language.id] = {
            ...track,
            selectedChapter: nextChapter?.id ?? chapter.id,
            completions: recordCompletion(
              track.completions ?? {},
              chapter.id,
              allFingerprints[chapter.id],
            ),
          };
          return { state };
        },
      });
      if (updated.warning) console.warn(updated.warning);
      console.log(`Recorded completion for ${chapter.title}.`);
      if (nextChapter) {
        console.log(
          `Next: ${nextChapter.number}. ${nextChapter.title}\nRun 'ezy start' when you are ready.`,
        );
      } else {
        console.log(
          "TypeScript track complete. Run 'ezy status' to review it.",
        );
      }
    }
    return;
  }
  if (
    ["validate-starters", "validate-solutions", "typecheck-all"].includes(
      command,
    )
  ) {
    let correct = 0;
    let infrastructure = 0;
    for (const chapter of language.chapters) {
      let okay;
      if (command === "typecheck-all") {
        const result = assertAdapterResult(
          await adapter.typecheck({ root, language, chapter }),
          "typecheck",
        );
        okay = result.ok;
        if (!okay) console.error(result.detail);
      } else {
        const target =
          command === "validate-solutions" ? "solution" : "validation-starter";
        const result = assertAdapterResult(
          await adapter.test({ root, language, chapter, target }),
          command,
        );
        if (result.kind === "infrastructure") infrastructure += 1;
        okay = target === "solution" ? result.ok : false;
        if (target === "validation-starter") {
          okay =
            result.kind === "learner" &&
            result.phase === chapter.expectedFailure.phase &&
            result.category === chapter.expectedFailure.category;
        }
        if (!okay)
          console.error(
            `${chapter.id}: got ${result.kind}/${result.phase}/${result.category}; expected ${
              target === "validation-starter"
                ? `learner/${chapter.expectedFailure.phase}/${chapter.expectedFailure.category}`
                : "success"
            }\n${result.detail}`,
          );
      }
      if (okay) correct += 1;
      console.log(`${okay ? "✓" : "✗"} ${chapter.id}`);
    }
    console.log(
      `${correct}/${language.chapters.length} expected outcomes; ${infrastructure} infrastructure failures.`,
    );
    if (correct !== language.chapters.length || infrastructure > 0)
      process.exitCode = 1;
    return;
  }
  throw new Error(`Unknown command '${command}'.`);
}

main().catch((error) => fail(error.stack ?? error.message));
