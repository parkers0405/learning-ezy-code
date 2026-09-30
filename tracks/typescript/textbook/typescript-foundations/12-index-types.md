# Index Types

## Goal

- Describe dictionary-like objects with index signatures.
- Use `Record` when the key set is known.
- Handle absent indexed values under strict checking.

## Step-by-step mental model and syntax

An index signature describes values reachable through a broad key type.

```ts
interface Scores {
  [name: string]: number;
}

const scores: Scores = { Ada: 9 };
const score = scores["Grace"]; // number | undefined in this track
```

JavaScript object property keys are strings or symbols; numeric property access is converted to a string for ordinary objects. An index signature requires named properties to be compatible with its value type, because those properties are also accessible through the index.

When the complete key set is known, `Record<"left" | "right", number>` is stronger: both keys are required and unrelated keys are rejected. `Map` may be a better runtime structure when keys are arbitrary objects, insertion APIs matter, or absence should not be confused with inherited object properties.

`noUncheckedIndexedAccess` adds `undefined` to undeclared indexed reads. Check, default, or design the key set precisely rather than asserting the value exists.

## Common mistakes

- Using `{ [key: string]: any }`, which defeats useful checking.
- Assuming every possible string key is populated.
- Mixing incompatible fixed properties with an index signature.
- Using a broad signature when a finite `Record` captures the domain.

## DSA relevance

Indexable tables support counting, adjacency lists, memoization, and dynamic programming. Explicit missing-value handling prevents accidental `NaN` and missing-neighbor bugs.

## Self-check

1. Why can an indexed read be `undefined`?
2. When is `Record` stronger than a string index signature?
3. Why must fixed properties match the index value type?

## Prerequisite recap

Generics preserve relationships, and `keyof` produces known object keys.

## Terms introduced

An **indexed access type** such as `T[K]` looks up a property type. An **index signature** describes values for keys not listed one by one.

## Exercise preparation

Read the local exercise README and visible named tests, then change only learner-owned source.

## Authoritative references

- [TypeScript Handbook: Index Signatures](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)
- [TypeScript TSConfig: noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html)
