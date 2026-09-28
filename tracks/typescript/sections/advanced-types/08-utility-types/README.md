# Utility Types

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Utility Types](../../../textbook/advanced-types/08-utility-types.md)

Built-in utilities transform existing types. `Partial<T>` makes properties optional; `Required<T>` makes them mandatory; `Readonly<T>` prevents assignment; `Pick`, `Omit`, and `Record` construct object shapes.

## Exercise

Define `CompletePoint` with `Required<PartialPoint>` so neither coordinate may be omitted.

### Test contract

Export `CompletePoint = Required<PartialPoint>`. Compile-time tests require both coordinates and prove each missing-property form is rejected.

> Adapted from upstream `Utility Types.md`; stale `Utility Types2.md` is excluded. See `CORRECTIONS.md`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
