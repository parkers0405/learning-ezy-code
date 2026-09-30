# Mapped types

**Required reading:** [Mapped Types](../../../textbook/advanced-types/03-mapped-types.md)

## Behavioral contract

`NullablePoint` has exactly the `x` and `y` keys from `Point`, and each property independently accepts `number | null` while rejecting text.

## Practice instruction

Derive `NullablePoint` with a mapped type over `keyof Point`, using `Point[K] | null` for each property. Do not rewrite the two keys manually.

## Attribution

> Adapted from upstream `Mapped Types.md`; stale `Mapped Types2.md` is excluded. See `SOURCE_MANIFEST.md`.
