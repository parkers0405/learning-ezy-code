# Narrowing with `typeof`

## Goal

Use `typeof` and explicit control flow to handle a `string | number` union safely.

## Prerequisite recap

A union allows more than one type. Code may use only operations known to be safe for every still-possible member.

## Terms introduced

**Narrowing** is the checker's process of reducing a broad type to a more specific possibility using control-flow evidence. A **type guard** is a runtime check that supplies that evidence. `typeof value` produces a runtime category string such as `"string"` or `"number"`.

## Step-by-step mental model

At function entry, `value` might be either member. Inside the successful condition below, the checker knows it is a string. After that branch returns, only number remains.

```ts
function sizeOrDouble(value: string | number): number {
  if (typeof value === "string") {
    return value.length;
  }
  return value * 2;
}
```

The condition runs in JavaScript; narrowing is the checker's understanding of that runtime evidence.

## Common mistakes

- Using string-only or number-only operations before narrowing.
- Checking the text `"number"` incorrectly.
- Calculating a branch result without returning it.

## DSA relevance

Mixed token streams and variant inputs need a safe case distinction before each case can be processed.

## Self-check

1. What types are possible before the `if`? 2. What type is known inside it? 3. Why is only number left afterward?

## Exercise preparation

Use an explicit `if` with `typeof`: return a string's length or a number's square. Tests include negative numbers and an empty string.

## Authoritative references

- [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
