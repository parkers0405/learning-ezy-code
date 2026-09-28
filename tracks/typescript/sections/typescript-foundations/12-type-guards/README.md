# Type Guards

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Type Guards](../../../textbook/typescript-foundations/12-type-guards.md)

Guards narrow unions within control flow. Built-in guards include `typeof`, `instanceof`, equality, and `in`. A user-defined predicate has a return type such as `value is Fish` and must perform a real runtime check.

## Exercise

For a number return its square; for a string return its length.

### Test contract

Export `processValue(number | string)`. Number and string branches are tested with positive, negative, and empty edge cases.

> Adapted from upstream `Type Guards.md`; stale `Type Guards2.md` is excluded. See `SOURCE_MANIFEST.md`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
