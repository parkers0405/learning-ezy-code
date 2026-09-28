# Arrays and Common Operations

## Objectives

- Create, index, and update arrays.
- Distinguish mutating operations from transformations.
- Use callbacks with `map`, `filter`, and `find`.

## Mental model

An array is an ordered, zero-indexed object. `T[]` means every element is expected to be a `T`. Reading an index happens at runtime and can produce `undefined`; this track enables `noUncheckedIndexedAccess` so the type checker makes that possibility visible.

```ts
const scores: number[] = [8, 3, 10];
scores.push(7); // mutates scores
const doubled = scores.map((score) => score * 2); // new array
const passing = scores.filter((score) => score >= 7);
```

`push`, `pop`, `shift`, `unshift`, `sort`, `reverse`, and `splice` mutate an array. `map`, `filter`, `slice`, and spread (`[...scores]`) produce new arrays. Mutation is not inherently wrong, but it should be visible in the function contract. Note that spread is shallow: nested objects are still shared.

`find` returns an element or `undefined`; `includes` returns a boolean. Check the declared return shape instead of assuming an element exists.

## Common mistakes

- Using `length` as the last valid index; the last index is `length - 1`.
- Ignoring the `undefined` possibility from indexing or `find`.
- Calling numeric `.sort()` without a comparator; default sorting compares string forms.
- Mutating an input array when callers expect it to remain unchanged.

## DSA relevance

Arrays underlie stacks, heaps, dynamic tables, and two-pointer algorithms. Knowing operation costs matters: append/pop are typically constant amortized time, while removing from the front shifts later elements.

## Self-check

1. Which listed methods mutate their receiver?
2. What can `find` return when there is no match?
3. Why can front insertion be more expensive than append?

## References

- [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [TypeScript Handbook: Arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)
