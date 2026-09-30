# Map and Frequency Tables

## Goal

Use a supplied `Map<string, number>` to count how often each string appears.

## Prerequisite recap

A `for...of` loop visits array elements. `??` supplies a fallback for `undefined`. Expanded assignment such as `count = count + 1` updates a binding.

## Terms introduced

A **Map** stores key-value entries. A **key** identifies an entry; its **value** is the associated data. A **frequency table** maps each distinct item to its occurrence count. `Map<string, number>` is supplied TypeScript notation: keys are strings and values are numbers.

## Step-by-step mental model

The course supplies construction syntax:

```ts
const counts = new Map<string, number>();
```

Read `new Map` as “create an empty Map.” Read `<string, number>` as a checker description, not comparison operators.

For each word, `.get(word)` reads its current count. A missing key produces `undefined`, so `?? 0` supplies the starting count. `.set(word, nextCount)` stores the updated count.

```ts
for (const word of words) {
  const current = counts.get(word) ?? 0;
  const next = current + 1;
  counts.set(word, next);
}
```

For `["red", "blue", "red"]`, the counts after each step are red 1; red 1 and blue 1; then red 2 and blue 1. `.has(key)` checks presence, `.size` reports entry count, and `.delete(key)` removes one entry.

## Common mistakes

- Treating a missing `.get` result as already zero.
- Using one shared counter instead of one count per key.
- Swapping the key and value passed to `.set`.

## DSA relevance

Frequency tables support duplicate detection, histograms, anagram checks, and counting-based scans.

## Self-check

1. What does `.get` return for a missing key? 2. Why use `?? 0`? 3. What are the final counts for `["a", "a", "b"]`?

## Exercise preparation

Complete the expanded loop body. Runtime tests verify counts for varied inputs, but cannot prove that your source used `Map` or `for...of`; those are practice requirements.

## Authoritative references

- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
