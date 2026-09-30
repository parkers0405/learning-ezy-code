# Function Declarations, Calls, and Returns

## Goal

Write a reusable operation with input and output.

## Prerequisite recap

You can build expressions from named values.

## Terms introduced

A **function declaration** names reusable code. A **parameter** names input inside it; an **argument** is a value at a call. The **function body** is the block between `{` and `}`. **Call parentheses** after a function name request that its body run. `return` ends the call and supplies its result.

## Step-by-step mental model

Declare the function, call it with an argument, bind the argument to the parameter, run the body, and return a value. In `name: string`, the supplied `: string` says the parameter accepts text. In `): string`, it says the returned result is text. Type-annotation writing is taught in TypeScript Foundations.

```ts
function greet(name: string): string {
  const message = `Hello, ${name}!`;
  return message;
}
```

## Common mistakes

- Confusing parameter and argument. - Forgetting `return`.

## DSA relevance

Functions isolate algorithm steps and make them testable.

## Self-check

1. Where does an argument go? 2. What does `return` do?

## Exercise preparation

Build then return the greeting.

## Authoritative references

- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
