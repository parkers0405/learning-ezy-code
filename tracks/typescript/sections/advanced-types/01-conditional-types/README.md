# Conditional Types

**Prerequisites:** Complete TypeScript Foundations. **Required reading:** [Conditional Types](../../../textbook/advanced-types/01-conditional-types.md)

Conditional types choose a type using `T extends U ? X : Y`. With a naked generic parameter they distribute over unions. The `infer` keyword can capture part of a matched type.

```ts
type ElementOf<T> = T extends Array<infer Item> ? Item : T;
```

## Exercise

Define `IsString<T>` so it evaluates to the literal type `"Yes"` for strings and `"No"` otherwise. The compile-only assertions are the test.

### Test contract

Export type `IsString<T>`. Compile-time assertions cover strings, non-strings, and distributive behavior over a union; there is no runtime substitute.

> Adapted from upstream `Conditional Types.md`; see the root `NOTICE`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
