# Generics

**Required reading:** [Generics](../../../textbook/typescript-foundations/11-generics.md)

## Behavioral contract

Export `wrapInArray<T>(value: T): T[]`. Number, string, and object calls preserve their element type, each result contains the supplied value, and an object element preserves identity.

## Practice instruction

Use the same type parameter `T` for the parameter and returned array, and return a one-element array containing `value`. Do not replace `T` with a union or `unknown`.

## Attribution

> Adapted from upstream `Generics.md`; stale `Generics2.md`/`Generics3.md` are excluded. See `SOURCE_MANIFEST.md`.
