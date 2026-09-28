import { typescriptAdapter } from "./typescript.mjs";

const trustedAdapters = new Map([[typescriptAdapter.id, typescriptAdapter]]);
const REQUIRED_METHODS = [
  "validateChapter",
  "fingerprintChapter",
  "test",
  "typecheck",
  "run",
  "solution",
];

export function assertAdapterContract(adapter) {
  if (!adapter || typeof adapter.id !== "string")
    throw new Error("Trusted adapters require an id.");
  for (const method of REQUIRED_METHODS) {
    if (typeof adapter[method] !== "function")
      throw new Error(`Adapter '${adapter.id}' is missing ${method}().`);
  }
  return adapter;
}

export function assertAdapterResult(result, operation) {
  if (
    !result ||
    typeof result.ok !== "boolean" ||
    !["success", "learner", "infrastructure"].includes(result.kind) ||
    result.ok !== (result.kind === "success") ||
    typeof result.phase !== "string" ||
    result.phase.length === 0 ||
    typeof result.category !== "string" ||
    result.category.length === 0 ||
    typeof result.detail !== "string"
  ) {
    throw new Error(`Adapter returned an invalid result for ${operation}.`);
  }
  return result;
}

for (const adapter of trustedAdapters.values()) assertAdapterContract(adapter);

export function getAdapter(id) {
  const adapter = trustedAdapters.get(id);
  if (!adapter)
    throw new Error(`No trusted runner adapter is registered for '${id}'.`);
  return assertAdapterContract(adapter);
}

export function registeredAdapterIds() {
  return [...trustedAdapters.keys()];
}
