# Names, Declarations, const, and let

## Goal

Give values names and initialize bindings.

## Prerequisite recap

Literals write primitive values directly.

## Terms introduced

An **identifier** is a source name. A **declaration** introduces a binding. **Initialization** supplies its first value. `const` prevents reassignment; `let` permits it. This chapter considers bindings to primitive values only; object mutation is introduced later.

## Step-by-step mental model

Read `const course = "JavaScript"` left to right: declare `course`, evaluate the literal, initialize the binding. Prefer `const` unless reassignment is intentional.

```ts
const course = "JavaScript";
let lesson = 5;
```

## Common mistakes

- Writing the literal before the identifier. - Repeating `const` or `let` when the supplied declaration already contains it.

## DSA relevance

Names expose the roles of inputs, counters, and results.

## Self-check

1. What is initialization? 2. When is `let` appropriate?

## Exercise preparation

Initialize the two supplied bindings exactly.

## Authoritative references

- [MDN: Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)
