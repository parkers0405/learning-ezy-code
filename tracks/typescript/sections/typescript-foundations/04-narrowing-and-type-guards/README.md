# Narrowing and type guards

**Required reading:** [Narrowing with `typeof`](../../../textbook/typescript-foundations/04-narrowing-and-type-guards.md)

## Behavioral contract

`processValue(value: number | string): number` returns a number's square or a string's length. Tests cover positive and negative numbers and nonempty and empty strings; booleans are rejected at compile time.

## Practice instruction

Use an explicit `if` with `typeof value === "string"` (or the equivalent number check), return inside that branch, and handle the remaining union member after narrowing.

## Attribution

> Adapted from upstream `Type Guards.md`; stale `Type Guards2.md` is excluded. See `SOURCE_MANIFEST.md`.
