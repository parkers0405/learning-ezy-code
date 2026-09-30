# Arrays

## Goal

Read an array literal, its element-type annotation, `.length`, indexing, safe access, element assignment, `.push`, and `.pop`.

## Prerequisite recap

Bindings store values; property access reads a named feature; method-call parentheses request an operation.

## Terms introduced

An **array** is an ordered collection. An **element** is one value in it. An **index** is a zero-based position: the first element is at index `0`. `string[]` is supplied checker notation meaning “an array whose elements are strings.”

## Step-by-step mental model

Square brackets create an array literal. `.length` reports the element count. `values[index]` reads one position; an out-of-range read produces `undefined`, so `values[5] ?? "missing"` supplies a safe fallback.

```ts
const languages: string[] = ["JavaScript"];
languages.push("TypeScript"); // append; length becomes 2
const first = languages[0]; // "JavaScript"
languages[1] = "TS"; // assign one element
const removed = languages.pop(); // remove and return the final element
```

The exercise uses only literal creation, `push`, and indexing. Later chapters introduce loops, callbacks, transformations, and spread.

The visible test uses `toEqual` for arrays. Unlike `toBe`, which compares identity for objects, `toEqual` recursively compares the contained values. This lets a newly created array satisfy an expected array with the same elements.

## Common mistakes

- Reading the first element with index `1`.
- Confusing `.length` with the final valid index.
- Assuming an out-of-range read throws instead of producing `undefined`.

## DSA relevance

Arrays are the basic indexed sequence used by scanning, searching, and sorting algorithms.

## Self-check

1. What index holds the first element? 2. After one `push`, how does length change? 3. What can `pop` return for an empty array?

## Exercise preparation

Append `"TypeScript"` and read the first element. Treat `string[]` as supplied checker notation rather than a type-writing task.

## Authoritative references

- [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [TypeScript Handbook: Arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)
