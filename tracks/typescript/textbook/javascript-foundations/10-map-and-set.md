# Map and Set

## Objectives

- Choose `Set` for unique values and `Map` for key/value associations.
- Preserve insertion order during iteration.
- Handle missing map keys explicitly.

## Mental model

`Set<T>` stores each value at most once. `Map<K, V>` associates keys of type `K` with values of type `V`. Both are runtime collections; generic type arguments guide static checking and are erased before execution.

```ts
const seen = new Set<string>();
seen.add("a");
seen.add("a");
console.log(seen.size); // 1

const counts = new Map<string, number>();
for (const word of ["red", "blue", "red"]) {
  counts.set(word, (counts.get(word) ?? 0) + 1);
}
```

`Map.get` returns `V | undefined` because a key may be absent. `?? 0` is a natural frequency-table default. `has`, `delete`, `size`, and iteration provide the other core operations. Map and Set iteration follows insertion order.

Primitive keys compare by value; object keys compare by identity. Two `{ x: 1 }` literals are therefore different map keys. Choose a stable primitive key when logical identity should be based on content.

## Common mistakes

- Reading `get` and assuming a value exists.
- Using `||` instead of `??` when stored falsy values are meaningful.
- Expecting two structurally identical objects to be the same key.
- Reaching for a plain object when keys are not strings/symbols or when Map's API communicates intent better.

## DSA relevance

Hash-backed sets and maps support expected constant-time membership and lookup, enabling deduplication, frequency counting, visited sets, and memoization. Worst-case and implementation details still exist, so “expected” matters.

## Self-check

1. What is the type of `map.get(key)`?
2. How are object keys compared?
3. Does a Set reorder values when a duplicate is added?

## References

- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [TypeScript Handbook: `Map` declarations](https://www.typescriptlang.org/tsconfig/lib.html)
