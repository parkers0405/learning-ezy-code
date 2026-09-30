import { randomUUID } from "node:crypto";
import {
  mkdir,
  open,
  readFile,
  rename,
  rm,
  stat,
  utimes,
} from "node:fs/promises";
import { hostname } from "node:os";
import path from "node:path";

export const STATE_VERSION = 2;
export const emptyState = (activeLanguage) => ({
  version: STATE_VERSION,
  activeLanguage,
  tracks: {},
});

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
const isObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);
const LOCK_VERSION = 1;

function catalogModel(catalog) {
  if (Array.isArray(catalog)) {
    return {
      ids: catalog,
      languages: new Map(catalog.map((id) => [id, undefined])),
    };
  }
  return {
    ids: catalog.languages.map((language) => language.id),
    languages: new Map(
      catalog.languages.map((language) => [language.id, language]),
    ),
  };
}

function validCompletion(value) {
  return (
    isObject(value) &&
    typeof value.fingerprint === "string" &&
    value.fingerprint.length > 0 &&
    typeof value.submittedAt === "string" &&
    !Number.isNaN(Date.parse(value.submittedAt))
  );
}

export function parseState(text, catalog, file = ".learn-code/state.json") {
  const model = catalogModel(catalog);
  const issues = [];
  let value;
  try {
    value = JSON.parse(text);
  } catch (error) {
    return {
      state: emptyState(model.ids[0]),
      warning: `${file} is corrupt JSON; no entries could be salvaged (${error.message}).`,
      issues: [error.message],
      corrupt: true,
    };
  }
  if (!isObject(value) || value.version !== STATE_VERSION) {
    return {
      state: emptyState(model.ids[0]),
      warning: `${file} uses an unsupported or malformed state schema; no entries could be salvaged.`,
      issues: ["unsupported state schema"],
      corrupt: true,
    };
  }

  const activeLanguage = model.ids.includes(value.activeLanguage)
    ? value.activeLanguage
    : model.ids[0];
  if (activeLanguage !== value.activeLanguage)
    issues.push(`unknown active language '${value.activeLanguage}'`);
  const salvaged = emptyState(activeLanguage);
  if (!isObject(value.tracks)) {
    issues.push("tracks must be an object");
  } else {
    for (const [languageId, track] of Object.entries(value.tracks)) {
      const language = model.languages.get(languageId);
      if (!model.languages.has(languageId)) {
        issues.push(`unknown track '${languageId}'`);
        continue;
      }
      if (!isObject(track)) {
        issues.push(`track '${languageId}' is malformed`);
        continue;
      }
      const chapterIds = language
        ? new Set(language.chapters.map((chapter) => chapter.id))
        : undefined;
      let selectedChapter;
      if (track.selectedChapter !== undefined) {
        if (
          typeof track.selectedChapter === "string" &&
          (!chapterIds || chapterIds.has(track.selectedChapter))
        ) {
          selectedChapter = track.selectedChapter;
        } else {
          issues.push(
            `track '${languageId}' selected unknown chapter '${track.selectedChapter}'`,
          );
        }
      }
      const completions = {};
      if (!isObject(track.completions)) {
        issues.push(`track '${languageId}' completions must be an object`);
      } else {
        for (const [chapterId, completion] of Object.entries(
          track.completions,
        )) {
          if (chapterIds && !chapterIds.has(chapterId)) {
            issues.push(
              `track '${languageId}' contains unknown completion '${chapterId}'`,
            );
          } else if (!validCompletion(completion)) {
            issues.push(
              `track '${languageId}' completion '${chapterId}' is malformed`,
            );
          } else {
            completions[chapterId] = completion;
          }
        }
      }
      salvaged.tracks[languageId] = { selectedChapter, completions };
    }
  }
  return {
    state: salvaged,
    warning:
      issues.length === 0
        ? null
        : `${file} contained invalid entries; safe entries were salvaged: ${issues.join("; ")}.`,
    issues,
    corrupt: issues.length > 0,
  };
}

export function migrateLegacyState({
  legacyProgress,
  legacySelection,
  language,
  fallbackLanguage,
  diagnostics = [],
}) {
  const state = emptyState(fallbackLanguage);
  const completions = {};
  const byLegacySlug = new Map(
    language.chapters
      .filter((chapter) => chapter.legacySlug)
      .map((chapter) => [chapter.legacySlug, chapter]),
  );
  if (legacyProgress !== undefined) {
    if (
      !isObject(legacyProgress) ||
      legacyProgress.version !== 1 ||
      !isObject(legacyProgress.completions)
    ) {
      diagnostics.push("legacy progress has an unsupported schema");
    } else {
      for (const [legacySlug, completion] of Object.entries(
        legacyProgress.completions,
      )) {
        const chapter = byLegacySlug.get(legacySlug);
        if (!chapter) {
          diagnostics.push(
            `legacy progress references unknown '${legacySlug}'`,
          );
        } else if (!validCompletion(completion)) {
          diagnostics.push(`legacy completion '${legacySlug}' is malformed`);
        } else {
          completions[chapter.id] = completion;
        }
      }
    }
  }
  let selectedChapter;
  if (legacySelection) {
    selectedChapter = byLegacySlug.get(legacySelection)?.id;
    if (!selectedChapter)
      diagnostics.push(`legacy selection '${legacySelection}' is unknown`);
  }
  state.activeLanguage = language.id;
  state.tracks[language.id] = { selectedChapter, completions };
  return state;
}

async function readLegacy(root, catalog) {
  const diagnostics = [];
  const progressFile = path.join(root, ".learn-ts", "progress.json");
  const selectionFile = path.join(root, ".current-chapter");
  let legacyProgress;
  let legacySelection;
  let present = false;
  try {
    present = true;
    legacyProgress = JSON.parse(await readFile(progressFile, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") present = false;
    else
      diagnostics.push(
        `${progressFile} could not be migrated (${error.message})`,
      );
  }
  try {
    legacySelection = (await readFile(selectionFile, "utf8")).trim();
    present = true;
  } catch (error) {
    if (error.code !== "ENOENT")
      diagnostics.push(
        `${selectionFile} could not be migrated (${error.message})`,
      );
  }
  const language = catalog.languages.find(
    (candidate) => candidate.id === "typescript",
  );
  if (!present || !language) {
    return {
      present,
      state: emptyState(catalog.languages[0].id),
      diagnostics,
    };
  }
  return {
    present,
    state: migrateLegacyState({
      legacyProgress,
      legacySelection,
      language,
      fallbackLanguage: catalog.languages[0].id,
      diagnostics,
    }),
    diagnostics,
  };
}

async function syncDirectory(directory) {
  let handle;
  try {
    handle = await open(directory, "r");
    await handle.sync();
  } catch (error) {
    if (!["EINVAL", "ENOTSUP", "EISDIR", "EPERM"].includes(error.code))
      throw error;
  } finally {
    await handle?.close();
  }
}

export async function writeStateAtomic(file, state) {
  const directory = path.dirname(file);
  await mkdir(directory, { recursive: true });
  const temporary = path.join(directory, `.state-${randomUUID()}.tmp`);
  let handle;
  try {
    handle = await open(temporary, "wx", 0o600);
    await handle.writeFile(`${JSON.stringify(state, null, 2)}\n`);
    await handle.sync();
    await handle.close();
    handle = undefined;
    await rename(temporary, file);
    await syncDirectory(directory);
  } finally {
    await handle?.close();
    await rm(temporary, { force: true });
  }
}

async function preserveCorruptState(file, contents) {
  const stamp = new Date().toISOString().replaceAll(":", "-");
  const backup = path.join(
    path.dirname(file),
    `state.corrupt-${stamp}-${randomUUID()}.json`,
  );
  let handle;
  try {
    handle = await open(backup, "wx", 0o600);
    await handle.writeFile(contents);
    await handle.sync();
  } finally {
    await handle?.close();
  }
  await syncDirectory(path.dirname(file));
  return backup;
}

function parseLockMetadata(contents) {
  try {
    const metadata = JSON.parse(contents);
    if (
      !isObject(metadata) ||
      metadata.version !== LOCK_VERSION ||
      typeof metadata.token !== "string" ||
      !Number.isInteger(metadata.pid) ||
      typeof metadata.hostname !== "string" ||
      typeof metadata.createdAt !== "number"
    ) {
      return undefined;
    }
    return metadata;
  } catch {
    return undefined;
  }
}

async function readLockSnapshot(lockFile) {
  const [contents, details] = await Promise.all([
    readFile(lockFile, "utf8"),
    stat(lockFile),
  ]);
  return { contents, details, metadata: parseLockMetadata(contents) };
}

function localOwnerIsAlive(metadata) {
  if (!metadata || metadata.hostname !== hostname()) return false;
  try {
    process.kill(metadata.pid, 0);
    return true;
  } catch (error) {
    if (error.code === "ESRCH") return false;
    return true;
  }
}

async function staleLockCandidate(lockFile, staleMs) {
  const snapshot = await readLockSnapshot(lockFile);
  if (Date.now() - snapshot.details.mtimeMs <= staleMs) return undefined;
  if (localOwnerIsAlive(snapshot.metadata)) return undefined;
  return snapshot;
}

async function reclaimStaleLock(lockFile, staleMs) {
  const first = await staleLockCandidate(lockFile, staleMs);
  if (!first) return false;
  const confirmed = await staleLockCandidate(lockFile, staleMs);
  if (!confirmed) return false;
  if (
    confirmed.details.dev !== first.details.dev ||
    confirmed.details.ino !== first.details.ino ||
    confirmed.metadata?.token !== first.metadata?.token ||
    confirmed.contents !== first.contents
  ) {
    return false;
  }

  const staleFile = `${lockFile}.stale-${randomUUID()}`;
  await rename(lockFile, staleFile);
  const moved = await readLockSnapshot(staleFile);
  if (
    moved.details.dev !== confirmed.details.dev ||
    moved.details.ino !== confirmed.details.ino ||
    moved.contents !== confirmed.contents
  ) {
    throw new Error(
      `State lock changed during stale recovery; preserved contender lock as ${staleFile}.`,
    );
  }
  await rm(staleFile, { force: true });
  return true;
}

async function assertLockOwnership(lockFile, lock) {
  if (lock.heartbeatError) throw lock.heartbeatError;
  let metadata;
  try {
    metadata = parseLockMetadata(await readFile(lockFile, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (metadata?.token !== lock.token) {
    throw new Error(`State lock ownership lost for ${lockFile}.`);
  }
}

function startLockHeartbeat(lockFile, lock, staleMs) {
  const heartbeatMs = Math.max(5, Math.floor(staleMs / 3));
  lock.heartbeatTask = Promise.resolve();
  lock.timer = setInterval(() => {
    lock.heartbeatTask = lock.heartbeatTask
      .then(async () => {
        await assertLockOwnership(lockFile, lock);
        const now = new Date();
        await utimes(lockFile, now, now);
      })
      .catch((error) => {
        lock.heartbeatError ??= error;
      });
  }, heartbeatMs);
  lock.timer.unref?.();
}

async function acquireLock(
  lockFile,
  { timeoutMs = 5_000, retryMs = 25, staleMs = 30_000 } = {},
) {
  await mkdir(path.dirname(lockFile), { recursive: true });
  const started = Date.now();
  const token = randomUUID();
  while (Date.now() - started <= timeoutMs) {
    let handle;
    try {
      handle = await open(lockFile, "wx", 0o600);
      await handle.writeFile(
        JSON.stringify({
          version: LOCK_VERSION,
          token,
          pid: process.pid,
          hostname: hostname(),
          createdAt: Date.now(),
        }),
      );
      await handle.sync();
      await handle.close();
      handle = undefined;
      const lock = { token };
      startLockHeartbeat(lockFile, lock, staleMs);
      return lock;
    } catch (error) {
      await handle?.close();
      if (error.code !== "EEXIST") {
        if (handle) await rm(lockFile, { force: true });
        throw error;
      }
      try {
        if (await reclaimStaleLock(lockFile, staleMs)) continue;
      } catch (staleError) {
        if (staleError.code !== "ENOENT") throw staleError;
      }
      await sleep(retryMs);
    }
  }
  throw new Error(`Timed out waiting for state lock ${lockFile}.`);
}

async function releaseLock(lockFile, lock) {
  clearInterval(lock.timer);
  await lock.heartbeatTask;
  await assertLockOwnership(lockFile, lock);
  await rm(lockFile, { force: true });
}

async function readCurrent(file, catalog) {
  try {
    const contents = await readFile(file, "utf8");
    return {
      exists: true,
      contents,
      ...parseState(contents, catalog, file),
      migrated: false,
    };
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return {
      exists: false,
      contents: undefined,
      state: emptyState(catalog.languages[0].id),
      warning: null,
      issues: [],
      corrupt: false,
      migrated: false,
    };
  }
}

export async function transactState({
  root,
  catalog,
  mutate,
  lockOptions,
  stateFile,
}) {
  const file = stateFile ?? path.join(root, ".learn-code", "state.json");
  const lockFile = path.join(path.dirname(file), "state.lock");
  const lock = await acquireLock(lockFile, lockOptions);
  try {
    const current = await readCurrent(file, catalog);
    const warnings = current.warning ? [current.warning] : [];
    let state = current.state;
    let migrated = false;
    if (!current.exists && !stateFile) {
      const legacy = await readLegacy(root, catalog);
      warnings.push(...legacy.diagnostics);
      if (legacy.present) {
        state = legacy.state;
        migrated = true;
      }
    }
    const result = await mutate(state);
    await assertLockOwnership(lockFile, lock);
    const nextState = result?.state ?? state;
    const checked = parseState(JSON.stringify(nextState), catalog, file);
    if (checked.corrupt) {
      throw new Error(`Refusing to write invalid state: ${checked.warning}`);
    }
    let backup;
    if (current.exists && current.corrupt) {
      backup = await preserveCorruptState(file, current.contents);
      warnings.push(`Preserved corrupt state as ${backup}.`);
    }
    await writeStateAtomic(file, checked.state);
    return {
      state: checked.state,
      file,
      migrated,
      warning: warnings.length > 0 ? warnings.join(" ") : null,
      backup,
      value: result?.value,
    };
  } finally {
    await releaseLock(lockFile, lock);
  }
}

export async function loadState({ root, catalog, stateFile }) {
  const file = stateFile ?? path.join(root, ".learn-code", "state.json");
  const current = await readCurrent(file, catalog);
  if (current.exists) return { ...current, file };
  // An injected state path is an isolated store. Legacy files under the course
  // root belong to the default store and must never leak into it.
  if (stateFile) return { ...current, file };
  const legacy = await readLegacy(root, catalog);
  if (!legacy.present) {
    return {
      ...current,
      warning:
        legacy.diagnostics.length > 0 ? legacy.diagnostics.join(" ") : null,
      file,
    };
  }
  return transactState({
    root,
    catalog,
    stateFile,
    mutate: async (state) => ({ state }),
  });
}

export function trackState(state, languageId) {
  return (
    state.tracks[languageId] ?? { selectedChapter: undefined, completions: {} }
  );
}
