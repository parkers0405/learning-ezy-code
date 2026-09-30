import assert from "node:assert/strict";
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  stat,
  utimes,
  writeFile,
} from "node:fs/promises";
import os, { hostname } from "node:os";
import path from "node:path";
import test from "node:test";
import {
  emptyState,
  loadState,
  migrateLegacyState,
  parseState,
  trackState,
  transactState,
  writeStateAtomic,
} from "../state.mjs";

const catalog = {
  languages: [
    {
      id: "typescript",
      chapters: [
        { id: "one", legacySlug: "legacy-one" },
        { id: "two", legacySlug: "legacy-two" },
      ],
    },
    { id: "rust", chapters: [{ id: "rust-one" }] },
  ],
};
const completion = (fingerprint) => ({
  fingerprint,
  submittedAt: "2026-01-02T03:04:05.000Z",
});

test("corrupt state is distinguished and safe entries are salvaged", () => {
  const invalidJson = parseState("not json", catalog, "/tmp/state.json");
  assert.equal(invalidJson.corrupt, true);
  assert.match(invalidJson.warning, /\/tmp\/state.json is corrupt JSON/);

  const partial = parseState(
    JSON.stringify({
      version: 2,
      activeLanguage: "unknown",
      tracks: {
        typescript: {
          selectedChapter: "missing",
          completions: {
            one: completion("kept"),
            missing: completion("dropped"),
            two: { fingerprint: "broken" },
          },
        },
      },
    }),
    catalog,
    "/tmp/state.json",
  );
  assert.equal(partial.state.activeLanguage, "typescript");
  assert.equal(partial.state.tracks.typescript.selectedChapter, undefined);
  assert.deepEqual(partial.state.tracks.typescript.completions, {
    one: completion("kept"),
  });
  assert.match(partial.warning, /unknown completion 'missing'/);
});

test("track state never leaks completions between languages", () => {
  const state = {
    version: 2,
    activeLanguage: "typescript",
    tracks: {
      typescript: {
        selectedChapter: "one",
        completions: { one: completion("x") },
      },
    },
  };
  assert.deepEqual(trackState(state, "rust"), {
    selectedChapter: undefined,
    completions: {},
  });
});

test("legacy state validates completion schema and reports recoverable errors", () => {
  const diagnostics = [];
  const state = migrateLegacyState({
    language: catalog.languages[0],
    fallbackLanguage: "typescript",
    legacySelection: "missing",
    legacyProgress: {
      version: 1,
      completions: {
        "legacy-one": completion("old"),
        "legacy-two": { fingerprint: "invalid" },
        missing: completion("unknown"),
      },
    },
    diagnostics,
  });
  assert.deepEqual(state.tracks.typescript.completions, {
    one: completion("old"),
  });
  assert.equal(state.tracks.typescript.selectedChapter, undefined);
  assert.match(diagnostics.join(" "), /legacy completion 'legacy-two'/);
  assert.match(diagnostics.join(" "), /legacy selection 'missing'/);
});

test("atomic writes fsync and replace versioned JSON without temporary files", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "learn-code-state-"));
  try {
    const file = path.join(directory, ".learn-code", "state.json");
    const state = { version: 2, activeLanguage: "typescript", tracks: {} };
    await writeStateAtomic(file, state);
    assert.deepEqual(JSON.parse(await readFile(file, "utf8")), state);
    assert.deepEqual(
      (await readdir(path.dirname(file))).filter((name) =>
        name.endsWith(".tmp"),
      ),
      [],
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("an injected state file is isolated from root legacy files and locks beside itself", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-root-"));
  const isolated = await mkdtemp(
    path.join(os.tmpdir(), "learn-code-isolated-"),
  );
  const stateFile = path.join(isolated, "progress.json");
  try {
    await mkdir(path.join(root, ".learn-ts"), { recursive: true });
    await writeFile(
      path.join(root, ".learn-ts", "progress.json"),
      JSON.stringify({
        version: 1,
        completions: { "legacy-one": completion("legacy") },
      }),
    );

    const loaded = await loadState({ root, catalog, stateFile });
    assert.deepEqual(loaded.state, emptyState("typescript"));
    await assert.rejects(access(stateFile));

    await transactState({
      root,
      catalog,
      stateFile,
      mutate: async (state) => {
        state.tracks.typescript = {
          selectedChapter: "one",
          completions: {},
        };
        return { state };
      },
    });
    assert.equal(
      JSON.parse(await readFile(stateFile, "utf8")).tracks.typescript
        .selectedChapter,
      "one",
    );
    await assert.rejects(access(path.join(isolated, "state.lock")));
    await assert.rejects(access(path.join(root, ".learn-code", "state.lock")));
  } finally {
    await Promise.all([
      rm(root, { recursive: true, force: true }),
      rm(isolated, { recursive: true, force: true }),
    ]);
  }
});

test("concurrent state transactions serialize without losing submissions", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-concurrent-"));
  try {
    const chapterIds = Array.from(
      { length: 20 },
      (_, index) => `chapter-${index}`,
    );
    const concurrentCatalog = {
      languages: [
        {
          id: "typescript",
          chapters: chapterIds.map((id) => ({ id })),
        },
      ],
    };
    await Promise.all(
      chapterIds.map((chapterId, index) =>
        transactState({
          root,
          catalog: concurrentCatalog,
          mutate: async (state) => {
            await new Promise((resolve) => setTimeout(resolve, index % 4));
            const track = trackState(state, "typescript");
            state.tracks.typescript = {
              selectedChapter: chapterId,
              completions: {
                ...track.completions,
                [chapterId]: completion(`fingerprint-${index}`),
              },
            };
            return { state };
          },
        }),
      ),
    );
    const loaded = await loadState({ root, catalog: concurrentCatalog });
    assert.equal(
      Object.keys(loaded.state.tracks.typescript.completions).length,
      chapterIds.length,
    );
    assert.ok(
      chapterIds.includes(loaded.state.tracks.typescript.selectedChapter),
    );
    await assert.rejects(access(path.join(root, ".learn-code", "state.lock")));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("a stale lock from a dead owner is recovered and cleaned up", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-stale-lock-"));
  try {
    const lock = path.join(root, ".learn-code", "state.lock");
    await mkdir(path.dirname(lock), { recursive: true });
    await writeFile(
      lock,
      JSON.stringify({
        version: 1,
        token: "abandoned",
        pid: 2_147_483_647,
        hostname: hostname(),
        createdAt: Date.now() - 60_000,
      }),
    );
    const old = new Date(Date.now() - 60_000);
    await utimes(lock, old, old);
    await transactState({
      root,
      catalog,
      lockOptions: { staleMs: 10, timeoutMs: 1_000, retryMs: 5 },
      mutate: async (state) => ({ state }),
    });
    await assert.rejects(access(lock));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("a heartbeat protects a long live transaction from stale recovery", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-heartbeat-"));
  let begin;
  let finish;
  const started = new Promise((resolve) => (begin = resolve));
  const release = new Promise((resolve) => (finish = resolve));
  try {
    const lock = path.join(root, ".learn-code", "state.lock");
    const first = transactState({
      root,
      catalog,
      lockOptions: { staleMs: 30, timeoutMs: 1_000, retryMs: 5 },
      mutate: async (state) => {
        begin();
        await release;
        return { state };
      },
    });
    await started;
    const initialMtime = (await stat(lock)).mtimeMs;
    await new Promise((resolve) => setTimeout(resolve, 80));
    assert.ok((await stat(lock)).mtimeMs > initialMtime);
    await assert.rejects(
      transactState({
        root,
        catalog,
        lockOptions: { staleMs: 30, timeoutMs: 30, retryMs: 5 },
        mutate: async (state) => ({ state }),
      }),
      /Timed out waiting for state lock/,
    );
    finish();
    await first;
    await assert.rejects(access(lock));
  } finally {
    finish?.();
    await rm(root, { recursive: true, force: true });
  }
});

test("ownership mismatch prevents writes and preserves the contender lock", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-lock-owner-"));
  try {
    const lock = path.join(root, ".learn-code", "state.lock");
    const contender = {
      version: 1,
      token: "contender",
      pid: process.pid,
      hostname: hostname(),
      createdAt: Date.now(),
    };
    await assert.rejects(
      transactState({
        root,
        catalog,
        mutate: async (state) => {
          await writeFile(lock, JSON.stringify(contender));
          return { state };
        },
      }),
      /State lock ownership lost/,
    );
    assert.deepEqual(JSON.parse(await readFile(lock, "utf8")), contender);
    await assert.rejects(access(path.join(root, ".learn-code", "state.json")));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("live locks time out without being removed", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-live-lock-"));
  try {
    const lock = path.join(root, ".learn-code", "state.lock");
    await mkdir(path.dirname(lock), { recursive: true });
    await writeFile(lock, "another-owner\n");
    await assert.rejects(
      transactState({
        root,
        catalog,
        lockOptions: { staleMs: 60_000, timeoutMs: 20, retryMs: 5 },
        mutate: async (state) => ({ state }),
      }),
      /Timed out waiting for state lock/,
    );
    assert.equal(await readFile(lock, "utf8"), "another-owner\n");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("failed mutations release their lock without writing state", async () => {
  const root = await mkdtemp(
    path.join(os.tmpdir(), "learn-code-failed-state-"),
  );
  try {
    await assert.rejects(
      transactState({
        root,
        catalog,
        mutate: async () => {
          throw new Error("intentional mutation failure");
        },
      }),
      /intentional mutation failure/,
    );
    assert.deepEqual(await readdir(path.join(root, ".learn-code")), []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("corrupt originals are backed up before a transaction repairs state", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-corrupt-"));
  try {
    const directory = path.join(root, ".learn-code");
    const file = path.join(directory, "state.json");
    await mkdir(directory, { recursive: true });
    const original = JSON.stringify({
      version: 2,
      activeLanguage: "typescript",
      tracks: {
        typescript: {
          selectedChapter: "missing",
          completions: { one: completion("safe") },
        },
      },
    });
    await writeFile(file, original);
    const updated = await transactState({
      root,
      catalog,
      mutate: async (state) => ({ state }),
    });
    assert.match(updated.warning, /Preserved corrupt state/);
    const backups = (await readdir(directory)).filter((name) =>
      name.startsWith("state.corrupt-"),
    );
    assert.equal(backups.length, 1);
    assert.equal(
      await readFile(path.join(directory, backups[0]), "utf8"),
      original,
    );
    assert.deepEqual(updated.state.tracks.typescript.completions, {
      one: completion("safe"),
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("legacy migration is serialized and malformed files produce diagnostics", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "learn-code-migration-"));
  try {
    await mkdir(path.join(root, ".learn-ts"), { recursive: true });
    await writeFile(path.join(root, ".learn-ts", "progress.json"), "not-json");
    await writeFile(path.join(root, ".current-chapter"), "legacy-one\n");
    const loaded = await loadState({ root, catalog });
    assert.equal(loaded.migrated, true);
    assert.equal(loaded.state.tracks.typescript.selectedChapter, "one");
    assert.match(loaded.warning, /progress.json could not be migrated/);
    assert.equal(
      JSON.parse(
        await readFile(path.join(root, ".learn-code", "state.json"), "utf8"),
      ).tracks.typescript.selectedChapter,
      "one",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
