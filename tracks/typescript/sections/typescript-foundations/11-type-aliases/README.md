# Type Aliases

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Type Aliases](../../../textbook/typescript-foundations/11-type-aliases.md)

A type alias names any type, including primitives, object shapes, tuples, unions, intersections, and generics. Unlike interfaces, aliases do not declaration-merge.

## Exercise

Define `Rectangle` with numeric width and height, then return its area.

### Test contract

Export the exact `Rectangle` object alias and `computeArea(rect)`. Types, ordinary dimensions, and zero are checked.

> Adapted from upstream `Type Aliases.md`; stale `Type Aliases2.md` is excluded. See `SOURCE_MANIFEST.md`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
