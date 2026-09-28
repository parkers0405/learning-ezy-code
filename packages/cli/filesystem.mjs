import { realpath, stat } from "node:fs/promises";
import path from "node:path";

export function isContained(owner, candidate) {
  const relative = path.relative(owner, candidate);
  return (
    relative === "" ||
    (!relative.startsWith(`..${path.sep}`) &&
      relative !== ".." &&
      !path.isAbsolute(relative))
  );
}

async function canonicalEntry(candidate, owner, label, expected) {
  let canonical;
  try {
    canonical = await realpath(candidate);
  } catch (error) {
    throw new Error(
      `${label} cannot be resolved (${error.code ?? error.message})`,
    );
  }
  if (owner && !isContained(owner, canonical)) {
    throw new Error(`${label} escapes ${owner}`);
  }
  const details = await stat(canonical);
  if (expected === "file" && !details.isFile()) {
    throw new Error(`${label} must be a regular file`);
  }
  if (expected === "directory" && !details.isDirectory()) {
    throw new Error(`${label} must be a directory`);
  }
  return canonical;
}

export function canonicalDirectory(candidate, owner, label = candidate) {
  return canonicalEntry(candidate, owner, label, "directory");
}

export function canonicalFile(candidate, owner, label = candidate) {
  return canonicalEntry(candidate, owner, label, "file");
}

export async function containedDirectory(owner, relative, label) {
  return canonicalDirectory(path.resolve(owner, relative), owner, label);
}

export async function containedFile(owner, relative, label) {
  return canonicalFile(path.resolve(owner, relative), owner, label);
}
