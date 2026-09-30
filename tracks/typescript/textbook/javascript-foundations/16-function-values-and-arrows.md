# Function Values and Arrow Syntax

## Goal

Store a function in a binding and read arrow syntax.

## Prerequisite recap

Function calls bind arguments to parameters and return results.

## Terms introduced

Functions are **first-class values**: they can be stored and passed. An **arrow function** writes a function expression with `=>`.

## Step-by-step mental model

Create a function value, assign it to `double`, then call that binding. The supplied function-type annotation is checker scaffolding.

```ts
const double = (value: number) => {
  return value * 2;
};
```

The braces create a **block body**, so an explicit `return` supplies the result. A short arrow may instead use an **expression body** with no braces: `const double = (value: number) => value * 2;`. In that form, the expression's value is returned automatically. Do not remove `return` while keeping block braces.

## Common mistakes

- Calling while assigning when a function value is needed. - Omitting `return` from a block body.

## DSA relevance

Function values let later array operations receive behavior.

## Self-check

1. What value is stored in `double`? 2. When does its body run?

## Exercise preparation

Complete the arrow body.

## Authoritative references

- [MDN: Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
