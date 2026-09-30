# Generics

## Goal

- Preserve relationships between input and output types.
- Add constraints that express required capabilities.
- Let inference choose type arguments when possible.

## Step-by-step mental model and syntax

A generic parameter is a placeholder chosen for each use. It is valuable when multiple positions share a type relationship—not merely because a function accepts something unknown.

```ts
function first<T>(values: readonly T[]): T | undefined {
  return values[0];
}

const name = first(["Ada", "Lin"]); // string | undefined
```

The implementation works for many element types while preserving the selected one. At runtime, `T` is erased; JavaScript executes one ordinary function. A constraint permits operations shared by all valid substitutions:

```ts
function sizeOf<T extends { length: number }>(value: T): number {
  return value.length;
}
```

Prefer inference (`first(numbers)`) over explicit arguments unless inference lacks information. Use descriptive parameter names when several roles exist, such as `TKey` and `TValue`.

## Common mistakes

- Replacing a relationship with `any`, which discards checking.
- Returning an unrelated value while claiming it is `T`.
- Constraining a parameter more than the implementation needs.
- Adding a type parameter used only once, where a concrete or union type is clearer.

## DSA relevance

Generic stacks, queues, trees, comparators, and graph utilities retain exact element types without duplicating algorithms.

## Self-check

1. What relationship does `identity<T>(x: T): T` preserve?
2. Does `T` exist during execution?
3. Why use a constraint?

## Prerequisite recap

Function types describe input and output relationships, and `keyof` can derive a union of property names.

## Terms introduced

A **generic** uses a type parameter as a placeholder so one declaration can preserve relationships for several concrete types. A **constraint** limits which types may fill that placeholder.

## Exercise preparation

Read the local exercise README and visible named tests, then change only learner-owned source.

## Authoritative references

- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Handbook: Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
