# Array, Object, and Function Types

## Goal

Describe three common composite value shapes.

## Prerequisite recap

Annotations constrain values; inference derives obvious types.

## Terms introduced

`number[]` is an **array type**. `{ name: string }` is an **object type** with a required property. `(value: number) => number` is a **function type** describing parameters and result.

## Step-by-step mental model

For arrays, check each element. For objects, check required property names and values. For functions, compare each parameter and the returned value. Runtime behavior still comes from the value, not the type.

```ts
const scores: number[] = [1, 2];
const learner: { name: string } = { name: "Ada" };
const double: (value: number) => number = (value) => value * 2;
```

In the visible tests, `toEqual` compares array or object contents. `expectTypeOf(value).toEqualTypeOf<T>()` requires the observed type and `T` to be equal, while `toMatchTypeOf<T>()` asks whether the observed type is assignable to the expected shape. The angle-bracketed `T` is a supplied type argument, not a runtime comparison.

## Common mistakes

- Confusing an object value with its type. - Forgetting a required property. - Describing arguments but not the return.

## DSA relevance

Algorithms consume collections, records, and helper functions.

## Self-check

1. What does `number[]` constrain? 2. Which side of `=` is runtime data?

## Exercise preparation

Repair all three deliberately invalid assignments and inspect negative compile-time evidence.

## Authoritative references

- [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Handbook: Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
