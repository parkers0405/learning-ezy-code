# Utility Types

## Goal

- Derive focused types with built-in utilities.
- Choose utilities that reflect real runtime operations.
- Avoid deep, opaque compositions.

## Step-by-step mental model and syntax

TypeScript ships generic transformations for common type relationships. They are compile-time only.

```ts
interface Task {
  id: string;
  title: string;
  done: boolean;
}

type TaskPatch = Partial<Pick<Task, "title" | "done">>;
type StoredTask = Readonly<Task>;
type TasksById = Record<string, Task>;
```

`Partial<T>` makes properties optional; `Required<T>` removes optionality; `Readonly<T>` prevents writes; `Pick<T, K>` selects keys; `Omit<T, K>` excludes keys; and `Record<K, V>` creates a key/value shape. `Parameters`, `ReturnType`, and `Awaited` derive information from function and promise-like types.

The runtime implementation must honor the derived contract. A `Partial<Task>` does not merge itself into a task, and `Readonly<Task>` does not freeze anything. Name important compositions so diagnostics and intent remain understandable.

Utilities are generally shallow. Applying `Partial` does not make nested fields partial, and `Readonly` does not recursively lock nested data.

## Common mistakes

- Treating utility types as runtime transformations.
- Making every field optional for an update when some fields must change together.
- Forgetting shallow semantics.
- Publishing many nested utilities instead of a domain-named type.

## DSA relevance

Utilities derive adjacency records, immutable snapshots, test builders, and function signatures from canonical structures without duplicating declarations.

## Self-check

1. Does `Partial<T>` create a new object?
2. How do `Pick` and `Omit` differ?
3. Are built-in readonly/partial transformations deep?

## Prerequisite recap

Mapped and conditional types can systematically transform object properties and union members.

## Terms introduced

A **utility type** is a reusable checker-provided type transformation. `Partial`, `Required`, `Pick`, `Omit`, and `Record` each derive a new type from existing keys or properties.

## Exercise preparation

Read the local exercise README and visible named tests, then change only learner-owned source.

## Authoritative references

- [TypeScript Handbook: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript Handbook: Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
