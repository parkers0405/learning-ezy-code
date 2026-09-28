# Literal Types

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Literal Types](../../../textbook/typescript-foundations/09-literal-types.md)

A literal type accepts one exact value, such as `"open"` or `42`. Unions of literals model a small closed set without an enum. `const` and `as const` preserve narrow literal information that `let` often widens.

## Exercise

Restrict `order` to `"ascending" | "descending"` and return the matching sentence.

### Test contract

Export `sortOrderMessage` with an exact two-value literal parameter. Both messages and the compile-time parameter type are asserted.

> Adapted from upstream `Literal Types.md`; see the root `NOTICE`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
