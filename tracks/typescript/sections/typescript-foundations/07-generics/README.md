# Generics

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Generics](../../../textbook/typescript-foundations/07-generics.md)

Generics preserve relationships between types while keeping code reusable. `identity<T>(value: T): T` returns the same type it receives. Constraints such as `T extends { length: number }` require capabilities without choosing one concrete type.

## Exercise

Implement generic `wrapInArray` so it returns a one-element array whose element type matches its argument.

### Test contract

Export generic `wrapInArray<T>(value): T[]`. Tests use numbers, strings, and objects and verify that type information and object identity are preserved.

> Adapted from upstream `Generics.md`; stale `Generics2.md`/`Generics3.md` are excluded. See `SOURCE_MANIFEST.md`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
