# keyof and typeof

## Goal

Derive a type from a value and derive its valid property keys without generics.

## Prerequisite recap

Aliases name types; object types have known property keys; assertions should not replace evidence.

## Terms introduced

In a type position, `typeof value` captures the inferred static type of a value. `keyof ObjectType` produces a union of that object's permitted keys. This type-position `typeof` differs from JavaScript's runtime `typeof` operator.

## Step-by-step mental model

Start with a runtime object. Capture its type with `typeof learner`. Apply `keyof` to obtain `"name" | "lessons"`. A parameter of that key type can safely index the object. Generic type parameters are introduced in the next chapter.

```ts
const learner = { name: "Ada", lessons: 2 };
type Learner = typeof learner;
type LearnerKey = keyof Learner;
function read(key: LearnerKey): string | number {
  return learner[key];
}
```

## Common mistakes

- Using runtime `typeof` where a type query is intended. - Writing an arbitrary `string` key. - Introducing a generic helper before generics are taught.

## DSA relevance

Key unions keep record lookup helpers aligned with their actual data shape.

## Self-check

1. What type does `typeof learner` capture? 2. What values belong to `LearnerKey`? 3. Is `"missing"` accepted?

## Exercise preparation

Return the value selected by the already-constrained key.

## Authoritative references

- [TypeScript Handbook: keyof](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
- [TypeScript Handbook: typeof](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)
