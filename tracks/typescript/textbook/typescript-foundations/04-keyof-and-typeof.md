# `keyof` and `typeof` Operators

## Objectives

- Derive key unions with `keyof`.
- Capture a value's static type with type-position `typeof`.
- Relate a key parameter to its object safely.

## Mental model and syntax

In a type position, `keyof T` produces a union of known property keys. Type-position `typeof value` obtains the static type inferred for an existing value. Neither operation reads data at runtime.

```ts
const priorities = { low: 1, high: 2 } as const;
type PriorityName = keyof typeof priorities; // "low" | "high"

function read<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
```

JavaScript also has a runtime `typeof` expression returning strings such as `"number"` and `"function"`. Context determines which operator is meant. `keyof` reflects the declared type, not a runtime enumeration; `Object.keys` returns runtime strings and may observe properties beyond a narrower static view.

Indexed access `T[K]` means “the value type at these keys.” Connecting `K extends keyof T` prevents arbitrary strings from indexing an object.

## Common mistakes

- Confusing runtime `typeof value` with type-position `typeof value`.
- Assuming `keyof` produces an array of keys.
- Widening a key to `string` and losing its relationship to the object.
- Expecting `Object.keys` to preserve a precise key union in every open-object situation.

## DSA relevance

Key relationships make generic record utilities, comparator selection, and table lookups safe without duplicating object types.

## Self-check

1. Is `keyof` available at runtime?
2. What does `T[K]` represent?
3. Why constrain `K` to `keyof T`?

## References

- [TypeScript Handbook: Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
- [TypeScript Handbook: Typeof Type Operator](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)
- [TypeScript Handbook: Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
