# Mapped Types

## Goal

- Transform each property in a key union.
- Add or remove `readonly` and optional modifiers.
- Remap keys with an `as` clause.

## Step-by-step mental model and syntax

A mapped type iterates over keys at compile time and constructs a new object type.

```ts
type Flags<T> = {
  [Key in keyof T]: boolean;
};

type Mutable<T> = {
  -readonly [Key in keyof T]-?: T[Key];
};
```

`Key` ranges over `keyof T`, while `T[Key]` retrieves each property's value type. Modifiers can be added or removed. Key remapping combines `as` with template literal types, for example turning `name` into `getName`.

Mapped types do not transform runtime objects. A function returning the mapped shape still needs JavaScript that loops over keys and builds values. Built-in utilities such as `Partial`, `Readonly`, and `Pick` are built from the same family of techniques.

Preserve relationships instead of replacing every property with `any`. Deep recursive mapped types are possible, but arrays, functions, and special objects need careful cases.

## Common mistakes

- Expecting a mapped type to create object properties at runtime.
- Forgetting that `keyof` may include number or symbol keys.
- Applying a deep transform without handling arrays and functions.
- Producing a clever public type whose diagnostics users cannot interpret.

## DSA relevance

Mapped types derive tables of handlers, visitation state, and configuration from a canonical set of keys, preventing duplicated key lists from drifting.

## Self-check

1. What values does `Key` iterate over?
2. What does `-?` do?
3. Must runtime transformation be implemented separately?

## Prerequisite recap

`keyof` creates property-name unions and indexed access retrieves corresponding property types.

## Terms introduced

A **mapped type** iterates over a union of property keys to build a new object type. A **mapping modifier** adds or removes `readonly` or optional status.

## Exercise preparation

Read the local exercise README and visible named tests, then change only learner-owned source.

## Authoritative references

- [TypeScript Handbook: Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Handbook: Key Remapping](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)
