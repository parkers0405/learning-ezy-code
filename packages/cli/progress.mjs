import { createHash } from "node:crypto";

export function fingerprint(parts) {
  const hash = createHash("sha256");
  for (const [label, content] of parts) {
    hash.update(`${label}\0${Buffer.byteLength(content)}\0`);
    hash.update(content);
  }
  return hash.digest("hex");
}

export function calculateRoadmap(chapters, completions, fingerprints) {
  const entries = chapters.map((chapter, index) => {
    const completion = completions[chapter.id];
    const valid = completion?.fingerprint === fingerprints[chapter.id];
    return {
      ...chapter,
      index,
      completion,
      valid,
      stale: Boolean(completion) && !valid,
    };
  });
  const firstIncomplete = entries.findIndex((entry) => !entry.valid);
  const frontierIndex =
    firstIncomplete === -1 ? entries.length - 1 : firstIncomplete;
  for (const entry of entries) {
    entry.unlocked = entry.index <= frontierIndex;
    entry.current = firstIncomplete !== -1 && entry.index === firstIncomplete;
    entry.status = entry.stale
      ? "stale"
      : entry.valid
        ? "passed"
        : entry.current
          ? "current"
          : "locked";
  }
  return {
    entries,
    frontierIndex,
    complete: firstIncomplete === -1,
    validCount: entries.filter((entry) => entry.valid).length,
    staleCount: entries.filter((entry) => entry.stale).length,
  };
}

export function recordCompletion(
  completions,
  chapterId,
  submittedFingerprint,
  submittedAt = new Date().toISOString(),
) {
  return {
    ...completions,
    [chapterId]: { submittedAt, fingerprint: submittedFingerprint },
  };
}

export function progressBar(completed, total, width = 20) {
  const ratio = total === 0 ? 0 : Math.min(1, Math.max(0, completed / total));
  const filled = Math.round(ratio * width);
  return `[${"#".repeat(filled)}${"-".repeat(width - filled)}]`;
}
