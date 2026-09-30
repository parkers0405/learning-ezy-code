# Conditional Types

## Goal

- Select types with `T extends U ? X : Y`.
- Predict distribution over unions.
- Extract type information with `infer`.

## Step-by-step mental model and syntax

A conditional type is a compile-time branch. It asks whether one type is assignable to another and chooses a resulting type.

```ts
type ElementOf<T> = T extends readonly (infer Item)[] ? Item : T;
type A = ElementOf<string[]>; // string
type B = ElementOf<number>; // number
```

`infer Item` introduces a type variable from the matched structure. This extraction happens only in the checker; no array is inspected at runtime.

The test uses `import type` because `IsString` is checker-only and has no runtime value. Its `expectTypeOf<IsString<string>>()` call supplies a type directly as the generic argument; nothing is passed or executed at runtime.

When the checked side is a bare type parameter, conditionals distribute over unions. `ExcludeNull<string | null>` evaluates each member separately. Wrap both sides in one-element tuples (`[T] extends [U]`) when the union should be tested as a whole.

Conditional types are most readable as small named transformations. Recursive or heavily nested conditions can slow checking and make diagnostics difficult, so prefer direct object models when possible.

## Common mistakes

- Expecting a conditional type to branch runtime control flow.
- Forgetting distributivity over a union.
- Using `any`, whose conditional behavior can produce both branches.
- Encoding business logic in a type that still requires runtime implementation.

## DSA relevance

Conditional types type generic helpers and data-structure APIs whose result depends on input shape, while the runtime algorithm remains ordinary JavaScript.

## Self-check

1. What relation does `extends` test here?
2. When does distribution occur?
3. How can distribution be suppressed?

## Prerequisite recap

Generics, unions, and assignability provide the pieces used by compile-time type selection.

## Terms introduced

A **conditional type** selects one type or another from an assignability test. **Distribution** applies that selection separately to each union member, and `infer` names a type extracted from a matched structure.

## Exercise preparation

Read the local exercise README and visible named tests, then change only learner-owned source.

## Authoritative references

- [TypeScript Handbook: Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [TypeScript Handbook: Inferring Within Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
