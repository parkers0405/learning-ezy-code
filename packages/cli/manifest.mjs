import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  canonicalDirectory,
  canonicalFile,
  containedDirectory,
  containedFile,
} from "./filesystem.mjs";

const ID = /^[a-z][a-z0-9-]*$/;
const isStarterFailure = (value) =>
  (value?.phase === "tests" && value.category === "assertion") ||
  (value?.phase === "typecheck" && value.category === "compile");

function assert(condition, message) {
  if (!condition) throw new Error(`Manifest validation failed: ${message}`);
}

function safeRelative(value, label) {
  assert(
    typeof value === "string" && value.length > 0,
    `${label} must be a non-empty string`,
  );
  assert(
    !path.isAbsolute(value) && !value.split(/[\\/]/).includes(".."),
    `${label} must stay inside its owner directory`,
  );
}

export async function loadCatalog(
  root,
  catalogFile = path.join(root, "languages.json"),
) {
  const canonicalRoot = await canonicalDirectory(
    root,
    undefined,
    "course root",
  );
  const canonicalCatalogFile = await canonicalFile(
    catalogFile,
    canonicalRoot,
    "language catalog",
  );
  const catalog = JSON.parse(await readFile(canonicalCatalogFile, "utf8"));
  assert(catalog.version === 1, "languages.json version must be 1");
  assert(
    Array.isArray(catalog.languages) && catalog.languages.length > 0,
    "languages must be a non-empty array",
  );
  const languageIds = new Set();
  const languages = [];

  for (const language of catalog.languages) {
    assert(ID.test(language.id), `invalid language id ${language.id}`);
    assert(
      typeof language.name === "string" && language.name.length > 0,
      `${language.id}.name must be a non-empty string`,
    );
    assert(
      !languageIds.has(language.id),
      `duplicate language id ${language.id}`,
    );
    languageIds.add(language.id);
    safeRelative(language.manifest, `${language.id}.manifest`);
    assert(
      ID.test(language.adapter),
      `${language.id}.adapter must be a registered-style id`,
    );
    const manifestPath = await containedFile(
      canonicalRoot,
      language.manifest,
      `${language.id} manifest`,
    );
    const trackRoot = path.dirname(manifestPath);
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    assert(manifest.version === 1, `${language.id} track version must be 1`);
    assert(
      manifest.id === language.id,
      `${language.id} id does not match its track`,
    );
    assert(
      manifest.adapter === language.adapter,
      `${language.id} adapter does not match its track`,
    );
    safeRelative(manifest.textbook, `${language.id}.textbook`);
    safeRelative(manifest.handoff, `${language.id}.handoff`);
    assert(
      manifest.readingPolicy?.ordering === "within-exercise" &&
        manifest.readingPolicy?.unused === "error",
      `${language.id}.readingPolicy must require within-exercise ordering and reject unused readings`,
    );
    assert(
      isStarterFailure(manifest.starterValidation?.default) &&
        manifest.starterValidation?.chapters &&
        typeof manifest.starterValidation.chapters === "object" &&
        !Array.isArray(manifest.starterValidation.chapters),
      `${language.id}.starterValidation must declare a default and chapter overrides`,
    );

    const textbookPath = await containedFile(
      trackRoot,
      manifest.textbook,
      `${language.id} textbook index`,
    );
    const handoffPath = await containedFile(
      canonicalRoot,
      manifest.handoff,
      `${language.id} handoff`,
    );
    const textbook = JSON.parse(await readFile(textbookPath, "utf8"));
    assert(textbook.version === 1, `${language.id} textbook version must be 1`);
    assert(
      Array.isArray(textbook.readings),
      `${language.id} textbook readings must be an array`,
    );
    const readingById = new Map();
    const readingPaths = new Set();
    for (const [index, reading] of textbook.readings.entries()) {
      assert(ID.test(reading.id), `invalid reading id ${reading.id}`);
      assert(
        !readingById.has(reading.id),
        `duplicate reading id ${reading.id}`,
      );
      assert(
        typeof reading.title === "string" && reading.title.length > 0,
        `reading ${reading.id} needs a title`,
      );
      safeRelative(reading.path, `reading ${reading.id}.path`);
      assert(
        !readingPaths.has(reading.path),
        `duplicate reading path ${reading.path}`,
      );
      readingPaths.add(reading.path);
      const absolutePath = await containedFile(
        path.dirname(textbookPath),
        reading.path,
        `reading ${reading.id}`,
      );
      readingById.set(reading.id, { ...reading, index, absolutePath });
    }

    assert(
      Array.isArray(manifest.sections) && manifest.sections.length > 0,
      `${language.id} must have sections`,
    );
    const chapterIds = new Set();
    const slugs = new Set();
    const legacySlugs = new Set();
    const chapterPaths = new Set();
    const sectionIds = new Set();
    const selectorAliases = new Map();
    const chapters = [];
    for (const section of manifest.sections) {
      assert(ID.test(section.id), `invalid section id ${section.id}`);
      assert(
        typeof section.title === "string" && section.title.length > 0,
        `${section.id}.title must be a non-empty string`,
      );
      assert(!sectionIds.has(section.id), `duplicate section id ${section.id}`);
      sectionIds.add(section.id);
      assert(
        Array.isArray(section.chapters) && section.chapters.length > 0,
        `${section.id} must have chapters`,
      );
      for (const chapter of section.chapters) {
        assert(ID.test(chapter.id), `invalid chapter id ${chapter.id}`);
        assert(ID.test(chapter.slug), `invalid chapter slug ${chapter.slug}`);
        assert(
          chapter.legacySlug === undefined || ID.test(chapter.legacySlug),
          `invalid legacy slug for ${chapter.id}`,
        );
        assert(
          typeof chapter.title === "string" && chapter.title.length > 0,
          `${chapter.id}.title must be a non-empty string`,
        );
        for (const alias of [chapter.id, chapter.slug, chapter.legacySlug]) {
          if (alias === undefined) continue;
          const existingChapter = selectorAliases.get(alias);
          assert(
            existingChapter === undefined || existingChapter === chapter.id,
            `selector alias '${alias}' refers to both ${existingChapter} and ${chapter.id}`,
          );
          selectorAliases.set(alias, chapter.id);
        }
        assert(
          !chapterIds.has(chapter.id),
          `duplicate chapter id ${chapter.id}`,
        );
        assert(
          !slugs.has(chapter.slug),
          `duplicate chapter slug ${chapter.slug}`,
        );
        assert(
          chapter.legacySlug === undefined ||
            !legacySlugs.has(chapter.legacySlug),
          `duplicate legacy slug ${chapter.legacySlug}`,
        );
        chapterIds.add(chapter.id);
        slugs.add(chapter.slug);
        if (chapter.legacySlug) legacySlugs.add(chapter.legacySlug);
        safeRelative(chapter.path, `chapter ${chapter.id}.path`);
        assert(
          !chapterPaths.has(chapter.path),
          `duplicate chapter path ${chapter.path}`,
        );
        chapterPaths.add(chapter.path);
        assert(
          Array.isArray(chapter.readings) && chapter.readings.length > 0,
          `${chapter.id} must declare readings`,
        );
        assert(
          new Set(chapter.readings).size === chapter.readings.length,
          `${chapter.id} repeats a reading`,
        );
        const resolvedReadings = chapter.readings.map((id) => {
          assert(
            readingById.has(id),
            `${chapter.id} references unknown reading ${id}`,
          );
          return readingById.get(id);
        });
        for (let index = 1; index < resolvedReadings.length; index += 1) {
          assert(
            resolvedReadings[index - 1].index <= resolvedReadings[index].index,
            `${chapter.id} readings are out of textbook order`,
          );
        }
        const absolutePath = await containedDirectory(
          trackRoot,
          chapter.path,
          `chapter ${chapter.id}`,
        );
        const expectedFailure =
          manifest.starterValidation.chapters[chapter.id] ??
          manifest.starterValidation.default;
        assert(
          isStarterFailure(expectedFailure),
          `${chapter.id} has invalid starter failure metadata`,
        );
        chapters.push({
          ...chapter,
          number: chapters.length + 1,
          sectionId: section.id,
          sectionTitle: section.title,
          absolutePath,
          readingsResolved: resolvedReadings,
          expectedFailure,
        });
      }
    }
    for (const id of Object.keys(manifest.starterValidation.chapters)) {
      assert(
        chapterIds.has(id),
        `starter validation references unknown chapter ${id}`,
      );
    }
    const usedReadings = new Set(
      chapters.flatMap((chapter) => chapter.readings),
    );
    const unusedReadings = [...readingById.keys()].filter(
      (id) => !usedReadings.has(id),
    );
    assert(
      unusedReadings.length === 0,
      `unused textbook readings: ${unusedReadings.join(", ")}`,
    );
    languages.push({
      ...language,
      manifest,
      manifestPath,
      trackRoot,
      textbook,
      textbookPath,
      handoffPath,
      chapters,
      selectorAliases,
    });
  }
  return { version: catalog.version, languages };
}

export function resolveLanguage(catalog, id) {
  return catalog.languages.find((language) => language.id === id);
}

export function resolveChapter(language, value) {
  if (!value) return undefined;
  const number = Number(value);
  const aliasId = language.selectorAliases?.get(value);
  return language.chapters.find(
    (chapter) =>
      chapter.id === aliasId ||
      (!language.selectorAliases &&
        (chapter.id === value ||
          chapter.slug === value ||
          chapter.legacySlug === value)) ||
      (Number.isInteger(number) && chapter.number === number),
  );
}
