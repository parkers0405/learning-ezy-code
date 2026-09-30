# Unions, Nullability, and Intersections

## Goal

Describe alternatives, explicit absence, and combined requirements without using type aliases yet.

## Prerequisite recap

Array, object, and function type syntax can describe composite values.

## Terms introduced

A **union** `A | B` accepts either type. **Nullability** means a type explicitly includes `null` or `undefined`. An **intersection** `A & B` requires both type descriptions at once.

## Step-by-step mental model

Read `string | number | null` as three permitted alternatives. Code may use only operations shared by every alternative until the next chapter teaches narrowing. Read `{ name: string } & { active: boolean }` as one object requiring both properties. These operators check values; they do not merge runtime objects.

```ts
const id: string | number | null = 42;
const learner: { name: string } & { active: boolean } = {
  name: "Ada",
  active: true,
};
```

## Common mistakes

- Treating a union as “all at once.” - Omitting `null` from a type that permits absence. - Expecting an intersection to merge runtime values.

## DSA relevance

Unions model optional search results; intersections combine record requirements.

## Self-check

1. How many alternatives does the `id` type permit? 2. Which properties does the intersection require? 3. Does `&` create an object?

## Exercise preparation

Replace an invalid union value and complete an inline intersection. Type aliases come in chapter 5.

## Authoritative references

- [TypeScript Handbook: Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [TypeScript Handbook: Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)
