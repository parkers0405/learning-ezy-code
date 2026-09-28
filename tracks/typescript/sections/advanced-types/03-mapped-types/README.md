# Mapped Types

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Mapped Types](../../../textbook/advanced-types/03-mapped-types.md)

Mapped types iterate over keys to transform properties: `{ [K in keyof T]: T[K] | null }`. Modifiers can add or remove optional (`?`) and `readonly` status, and modern TypeScript can remap keys with `as`. Many utility types are mapped types.

## Exercise

Create `NullablePoint`, preserving every `Point` key while allowing each value to be `null`.

### Test contract

Export `Point` and mapped type `NullablePoint`. Compile-time tests require both keys and permit each property, independently, to be `null`.

> Adapted from upstream `Mapped Types.md`; stale `Mapped Types2.md` is excluded. See `SOURCE_MANIFEST.md`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
