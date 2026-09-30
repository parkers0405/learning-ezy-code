# Literal Types

## Goal

- Use exact primitive values as types.
- Control widening with `const` and `as const`.
- Model finite choices as literal unions.

## Step-by-step mental model and syntax

`"open"` can be both a runtime string value and a compile-time type containing only that value. Combining literals creates a closed vocabulary.

```ts
type Status = "idle" | "running" | "done";

function canStart(status: Status): boolean {
  return status === "idle";
}
```

A `const` primitive is inferred narrowly because it cannot be reassigned. Mutable object properties usually widen so they can later change. `as const` asks TypeScript to retain literal values and mark object properties or tuple elements readonly.

```ts
const config = { mode: "fast", retries: 2 } as const;
// mode: "fast", retries: 2; both readonly
```

Types disappear at runtime. If a string comes from outside the program, code must validate it before treating it as `Status`. A literal union prevents misspellings only in checked code.

## Common mistakes

- Using `string` when only a few values are valid.
- Expecting a literal type to validate external input.
- Applying `as const` so broadly that legitimate mutation becomes awkward.
- Widening a discriminant property and then losing useful narrowing.

## DSA relevance

Literal unions model traversal colors, operation names, directions, and state-machine phases. Finite states make exhaustive handling possible.

## Self-check

1. How does `"ready"` differ from `string` as a type?
2. What does `as const` do to an object literal?
3. Must external strings still be checked?

## Prerequisite recap

Interfaces and aliases can describe object shapes; unions can combine alternative types.

## Terms introduced

A **literal type** permits one exact primitive value. A **discriminant** is a literal-valued property that distinguishes one union member from another.

## Exercise preparation

Read the local exercise README and visible named tests, then change only learner-owned source.

## Authoritative references

- [TypeScript Handbook: Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
- [TypeScript Handbook: Literal Inference](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-inference)
