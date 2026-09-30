# Index types

**Required reading:** [Index Types](../../../textbook/typescript-foundations/12-index-types.md)

## Behavioral contract

`MyDictionary` accepts arbitrary string keys with `string | number` values and rejects booleans. `getValueFromDict` returns the selected string or number, or `undefined` for an absent key.

## Practice instruction

Write a string index signature on the supplied interface and return `dict[key]` directly. Keep `undefined` in the declared lookup result.

## Attribution

> Adapted from upstream `Index Types.md`; stale `Index Types2.md` is excluded. See `SOURCE_MANIFEST.md`.
