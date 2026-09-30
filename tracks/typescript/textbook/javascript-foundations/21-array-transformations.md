# Array Transformations

## Goal

Use `map`, `filter`, and `find` with callbacks.

## Prerequisite recap

Arrays hold ordered values; callbacks supply reusable behavior.

## Terms introduced

`map` creates one output per input, `filter` keeps matching inputs, and `find` returns the first match or `undefined`.

## Step-by-step mental model

Choose the operation from the desired result, write one small callback, and store its result. These methods do not mutate the source array.

```ts
const doubled = values.map((value) => value * 2);
```

## Common mistakes

- Expecting `find` to return an array. - Using a long chained expression.

## DSA relevance

These operations express linear traversals clearly.

## Self-check

1. Which method preserves length? 2. What can `find` return when absent?

## Exercise preparation

Use each operation separately.

## Authoritative references

- [MDN: Array iterative methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iterative_methods)
