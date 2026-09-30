# Literal types

**Required reading:** [Literal Types](../../../textbook/typescript-foundations/07-literal-types.md)

## Behavioral contract

`sortOrderMessage` accepts exactly `"ascending" | "descending"` and returns `"The order is set to ascending."` or `"The order is set to descending."`; other strings are rejected.

## Practice instruction

Keep the two string literals in the parameter's union and interpolate the accepted `order` into the returned sentence.

## Attribution

> Adapted from upstream `Literal Types.md`; see the root `NOTICE`.
