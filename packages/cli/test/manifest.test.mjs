import assert from "node:assert/strict";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { getAdapter } from "../adapters/index.mjs";
import { loadCatalog } from "../manifest.mjs";

test("the real curriculum has prerequisite-safe 27/16/8 sections", async () => {
  const root = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../..",
  );
  const catalog = await loadCatalog(root);
  const language = catalog.languages.find(({ id }) => id === "typescript");
  assert.ok(language);

  const counts = Object.fromEntries(
    [
      "javascript-foundations",
      "typescript-foundations",
      "advanced-typescript",
    ].map((sectionId) => [
      sectionId,
      language.chapters.filter((chapter) => chapter.sectionId === sectionId)
        .length,
    ]),
  );
  assert.deepEqual(counts, {
    "javascript-foundations": 27,
    "typescript-foundations": 16,
    "advanced-typescript": 8,
  });
  assert.equal(language.chapters.length, 51);
  assert.equal(
    language.chapters.filter(({ legacySlug }) => legacySlug).length,
    29,
  );
  assert.deepEqual(
    language.chapters
      .filter(({ sectionId }) => sectionId === "typescript-foundations")
      .map(({ id }) => id),
    [
      "ts-annotations-inference",
      "ts-composite-types",
      "ts-unions-intersections",
      "ts-guards",
      "ts-aliases",
      "ts-interfaces",
      "ts-literal-types",
      "ts-tuples",
      "ts-type-assertions",
      "ts-keyof-typeof",
      "ts-generics",
      "ts-index-types",
      "ts-enum",
      "ts-classes",
      "ts-inheritance",
      "ts-abstract-classes",
    ],
  );
});

test("every exercise README separates observable contracts from specific practice", async () => {
  const root = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../..",
  );
  const catalog = await loadCatalog(root);
  const language = catalog.languages.find(({ id }) => id === "typescript");
  assert.ok(language);
  assert.equal(language.chapters.length, 51);

  const retiredDisclaimer =
    "Follow the chapter’s requested technique as deliberate practice";
  for (const chapter of language.chapters) {
    const readme = await readFile(
      path.join(chapter.absolutePath, "README.md"),
      "utf8",
    );
    assert.doesNotMatch(readme, new RegExp(retiredDisclaimer), chapter.id);
    const behavioralHeadings = readme.match(/^## Behavioral contract$/gm) ?? [];
    const practiceHeadings = readme.match(/^## Practice instruction$/gm) ?? [];
    assert.equal(behavioralHeadings.length, 1, chapter.id);
    assert.equal(practiceHeadings.length, 1, chapter.id);
    const behavioralStart = readme.indexOf("## Behavioral contract");
    const practiceStart = readme.indexOf("## Practice instruction");
    assert.ok(behavioralStart < practiceStart, chapter.id);
    const behavioral = readme
      .slice(behavioralStart + "## Behavioral contract".length, practiceStart)
      .trim();
    const practice = readme
      .slice(practiceStart + "## Practice instruction".length)
      .split(/^## /m, 1)[0]
      .trim();
    assert.ok(behavioral === "None" || behavioral.length > 0, chapter.id);
    assert.ok(practice === "None" || practice.length > 0, chapter.id);
  }
});

test("manifest adapter names cannot become arbitrary commands", () => {
  assert.throws(() => getAdapter("../../bin/sh"), /No trusted runner adapter/);
});

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-manifest-"));
  await mkdir(path.join(root, "tracks", "mock", "textbook"), {
    recursive: true,
  });
  await mkdir(path.join(root, "tracks", "mock", "exercise"), {
    recursive: true,
  });
  await writeFile(
    path.join(root, "tracks", "mock", "exercise", "starter.ts"),
    "export {}\n",
  );
  await writeFile(
    path.join(root, "tracks", "mock", "exercise", "exercise.test.ts"),
    "export {}\n",
  );
  await writeFile(
    path.join(root, "tracks", "mock", "textbook", "one.md"),
    "# One\n",
  );
  await writeFile(
    path.join(root, "languages.json"),
    JSON.stringify({
      version: 1,
      languages: [
        {
          id: "mock",
          name: "Mock",
          manifest: "tracks/mock/track.json",
          adapter: "mock",
        },
      ],
    }),
  );
  await writeFile(path.join(root, "ROADMAP.md"), "# Roadmap\n");
  await writeFile(
    path.join(root, "tracks", "mock", "textbook", "index.json"),
    JSON.stringify({
      version: 1,
      readings: [{ id: "read-one", title: "One", path: "one.md" }],
    }),
  );
  await writeFile(
    path.join(root, "tracks", "mock", "track.json"),
    JSON.stringify({
      version: 1,
      id: "mock",
      adapter: "mock",
      textbook: "textbook/index.json",
      handoff: "ROADMAP.md",
      readingPolicy: { ordering: "within-exercise", unused: "error" },
      starterValidation: {
        default: { phase: "tests", category: "assertion" },
        chapters: {},
      },
      sections: [
        {
          id: "foundation",
          title: "Foundation",
          chapters: [
            {
              id: "mock-one",
              slug: "one",
              title: "One",
              path: "exercise",
              readings: ["read-one"],
            },
          ],
        },
      ],
    }),
  );
  return root;
}

test("discovery works for a non-TypeScript track without hardcoded sections or counts", async () => {
  const root = await fixture();
  try {
    const catalog = await loadCatalog(root);
    assert.equal(catalog.languages[0].id, "mock");
    assert.equal(catalog.languages[0].chapters.length, 1);
    assert.equal(
      catalog.languages[0].chapters[0].readingsResolved[0].title,
      "One",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("one canonical reading may be reused by multiple exercises", async () => {
  const root = await fixture();
  try {
    const second = path.join(root, "tracks", "mock", "exercise-two");
    await mkdir(second);
    await writeFile(path.join(second, "starter.rs"), "fn main() {}\n");
    const trackFile = path.join(root, "tracks", "mock", "track.json");
    const track = JSON.parse(await readFile(trackFile, "utf8"));
    track.sections[0].chapters.push({
      id: "mock-two",
      slug: "two",
      title: "Two",
      path: "exercise-two",
      readings: ["read-one"],
    });
    await writeFile(trackFile, JSON.stringify(track));
    const catalog = await loadCatalog(root);
    assert.equal(catalog.languages[0].chapters.length, 2);
    assert.equal(
      catalog.languages[0].chapters[1].readingsResolved[0].id,
      "read-one",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("unknown reading references fail manifest validation", async () => {
  const root = await fixture();
  try {
    const trackFile = path.join(root, "tracks", "mock", "track.json");
    const track = JSON.parse(await readFile(trackFile, "utf8"));
    track.sections[0].chapters[0].readings = ["missing"];
    await writeFile(trackFile, JSON.stringify(track));
    await assert.rejects(loadCatalog(root), /unknown reading missing/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("an exercise's multiple readings must follow textbook order", async () => {
  const root = await fixture();
  try {
    const textbookFile = path.join(
      root,
      "tracks",
      "mock",
      "textbook",
      "index.json",
    );
    const trackFile = path.join(root, "tracks", "mock", "track.json");
    await writeFile(
      path.join(root, "tracks", "mock", "textbook", "two.md"),
      "# Two\n",
    );
    const textbook = JSON.parse(await readFile(textbookFile, "utf8"));
    textbook.readings.push({ id: "read-two", title: "Two", path: "two.md" });
    await writeFile(textbookFile, JSON.stringify(textbook));
    const track = JSON.parse(await readFile(trackFile, "utf8"));
    track.sections[0].chapters[0].readings = ["read-two", "read-one"];
    await writeFile(trackFile, JSON.stringify(track));
    await assert.rejects(
      loadCatalog(root),
      /readings are out of textbook order/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("reading reuse may move backward between different exercises", async () => {
  const root = await fixture();
  try {
    const textbookFile = path.join(
      root,
      "tracks",
      "mock",
      "textbook",
      "index.json",
    );
    const trackFile = path.join(root, "tracks", "mock", "track.json");
    await writeFile(
      path.join(root, "tracks", "mock", "textbook", "two.md"),
      "# Two\n",
    );
    const textbook = JSON.parse(await readFile(textbookFile, "utf8"));
    textbook.readings.push({ id: "read-two", title: "Two", path: "two.md" });
    await writeFile(textbookFile, JSON.stringify(textbook));
    await mkdir(path.join(root, "tracks", "mock", "exercise-two"));
    const track = JSON.parse(await readFile(trackFile, "utf8"));
    track.sections[0].chapters[0].readings = ["read-two"];
    track.sections[0].chapters.push({
      id: "mock-two",
      slug: "two",
      title: "Two",
      path: "exercise-two",
      readings: ["read-one"],
    });
    await writeFile(trackFile, JSON.stringify(track));
    const loaded = await loadCatalog(root);
    assert.deepEqual(
      loaded.languages[0].chapters.map((chapter) => chapter.readings[0]),
      ["read-two", "read-one"],
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("reading and starter-validation policies are mandatory and closed", async () => {
  const root = await fixture();
  try {
    const trackFile = path.join(root, "tracks", "mock", "track.json");
    const track = JSON.parse(await readFile(trackFile, "utf8"));
    delete track.readingPolicy;
    await writeFile(trackFile, JSON.stringify(track));
    await assert.rejects(loadCatalog(root), /readingPolicy/);

    track.readingPolicy = { ordering: "global", unused: "ignore" };
    await writeFile(trackFile, JSON.stringify(track));
    await assert.rejects(loadCatalog(root), /readingPolicy/);

    track.readingPolicy = { ordering: "within-exercise", unused: "error" };
    track.starterValidation.chapters.missing = {
      phase: "tests",
      category: "assertion",
    };
    await writeFile(trackFile, JSON.stringify(track));
    await assert.rejects(loadCatalog(root), /unknown chapter missing/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("selector aliases cannot collide across chapters", async () => {
  const root = await fixture();
  try {
    const trackFile = path.join(root, "tracks", "mock", "track.json");
    const track = JSON.parse(await readFile(trackFile, "utf8"));
    track.sections[0].chapters[0].legacySlug = "two";
    track.sections[0].chapters.push({
      ...track.sections[0].chapters[0],
      id: "mock-two",
      slug: "two",
      path: "exercise-two",
    });
    await mkdir(path.join(root, "tracks", "mock", "exercise-two"));
    await writeFile(
      path.join(root, "tracks", "mock", "exercise-two", "starter.rs"),
      "fn main() {}\n",
    );
    await writeFile(trackFile, JSON.stringify(track));
    await assert.rejects(
      loadCatalog(root),
      /selector alias 'two' refers to both mock-one and mock-two/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("an id, slug, and legacy slug may share one chapter alias", async () => {
  const root = await fixture();
  try {
    const trackFile = path.join(root, "tracks", "mock", "track.json");
    const track = JSON.parse(await readFile(trackFile, "utf8"));
    track.sections[0].chapters[0].slug = "mock-one";
    track.sections[0].chapters[0].legacySlug = "mock-one";
    await writeFile(trackFile, JSON.stringify(track));
    const catalog = await loadCatalog(root);
    assert.equal(
      catalog.languages[0].selectorAliases.get("mock-one"),
      "mock-one",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("unused readings are rejected by the declared policy", async () => {
  const root = await fixture();
  try {
    const textbookFile = path.join(
      root,
      "tracks",
      "mock",
      "textbook",
      "index.json",
    );
    await writeFile(
      path.join(root, "tracks", "mock", "textbook", "unused.md"),
      "# Unused\n",
    );
    const textbook = JSON.parse(await readFile(textbookFile, "utf8"));
    textbook.readings.push({
      id: "read-unused",
      title: "Unused",
      path: "unused.md",
    });
    await writeFile(textbookFile, JSON.stringify(textbook));
    await assert.rejects(loadCatalog(root), /unused textbook readings/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("chapter paths must resolve to directories and readings to regular files", async () => {
  const root = await fixture();
  try {
    const trackFile = path.join(root, "tracks", "mock", "track.json");
    const track = JSON.parse(await readFile(trackFile, "utf8"));
    track.sections[0].chapters[0].path = "textbook/one.md";
    await writeFile(trackFile, JSON.stringify(track));
    await assert.rejects(
      loadCatalog(root),
      /chapter mock-one must be a directory/,
    );

    track.sections[0].chapters[0].path = "exercise";
    await writeFile(trackFile, JSON.stringify(track));
    await rm(path.join(root, "tracks", "mock", "textbook", "one.md"));
    await mkdir(path.join(root, "tracks", "mock", "textbook", "one.md"));
    await assert.rejects(
      loadCatalog(root),
      /reading read-one must be a regular file/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("canonical containment rejects symlink escapes", async (context) => {
  const root = await fixture();
  const outside = await mkdtemp(path.join(os.tmpdir(), "learn-code-outside-"));
  try {
    await writeFile(path.join(outside, "reading.md"), "# Outside\n");
    const link = path.join(root, "tracks", "mock", "textbook", "one.md");
    await rm(link);
    try {
      await symlink(path.join(outside, "reading.md"), link, "file");
    } catch (error) {
      if (["EPERM", "EACCES", "ENOTSUP"].includes(error.code)) {
        context.skip(`symlink creation unavailable: ${error.code}`);
        return;
      }
      throw error;
    }
    await assert.rejects(loadCatalog(root), /reading read-one escapes/);
  } finally {
    await rm(root, { recursive: true, force: true });
    await rm(outside, { recursive: true, force: true });
  }
});
