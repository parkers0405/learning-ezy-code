# Utility types

**Required reading:** [Utility Types](../../../textbook/advanced-types/08-utility-types.md)

## Behavioral contract

`CompletePoint` has required numeric `x` and `y` properties; values missing either property and values with wrong property types are rejected.

## Practice instruction

Define `CompletePoint` as `Required<PartialPoint>` so the built-in utility reverses the optional properties. Do not manually restate `Point`.

## Attribution

> Adapted from upstream `Utility Types.md`; stale `Utility Types2.md` is excluded. See `CORRECTIONS.md`.
