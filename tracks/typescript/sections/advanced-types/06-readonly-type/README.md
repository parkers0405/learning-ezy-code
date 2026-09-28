# Readonly Type

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Readonly Types](../../../textbook/advanced-types/06-readonly-type.md)

`readonly` prevents assignment through a property in checked code. `Readonly<T>` maps every property of `T` to readonly. This is compile-time protection, not runtime freezing, and nested objects remain mutable unless recursively modeled.

## Exercise

Define `ReadonlyPoint` from `Point` so assignments to either coordinate are rejected by TypeScript.

### Test contract

Export `Point` and `ReadonlyPoint`. Compile-time tests require numeric coordinates and prove assignments to both properties are rejected.

> Adapted from upstream `Readonly Type.md`; automation correction documented in `CORRECTIONS.md`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
