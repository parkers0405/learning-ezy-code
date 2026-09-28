# Index Types

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Index Types](../../../textbook/typescript-foundations/08-index-types.md)

An index signature describes unknown property names with known value types: `{ [key: string]: number }`. Indexed access types retrieve property types (`Person["name"]`), while `keyof` produces allowable keys. Include `undefined` in a lookup result when a key may be absent.

## Exercise

Give `MyDictionary` a string index signature for string-or-number values and return the selected value.

### Test contract

Export `MyDictionary` with a string index signature and `getValueFromDict`. String, number, and absent-key lookups are tested.

> Adapted from upstream `Index Types.md`; stale `Index Types2.md` is excluded. See `SOURCE_MANIFEST.md`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
