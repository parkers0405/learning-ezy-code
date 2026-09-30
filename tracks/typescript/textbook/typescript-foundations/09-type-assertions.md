# Type Assertions

## Goal

Understand what `as` tells the checker, what it does not do at runtime, and why narrowing is usually safer.

## Prerequisite recap

`unknown` accepts any input but permits no type-specific operation until code narrows it or makes an assertion.

## Terms introduced

A **type assertion** tells the checker to treat an expression as a stated type. It is a static claim: it emits no conversion, runtime check, or validation.

## Step-by-step mental model

Suppose familiar program data is deliberately typed as `unknown`:

```ts
const value: unknown = "course";
const text = value as string;
const length = text.length;
```

The assertion permits string property access, but JavaScript still receives the original value. If `value` were actually a number, `as string` would not turn it into text. `String(value)` is runtime conversion; `value as string` is only a checker instruction.

For untrusted data, prefer a runtime guard such as `typeof value === "string"`. This exercise uses an assertion deliberately so its mechanics are visible, not because unchecked input should normally be trusted.

The visible test includes `// @ts-expect-error` immediately before an intentionally invalid assignment. That directive requires the next line to produce a checker error; if it does not, the directive itself fails. This is negative compile-time evidence that the function does not return text.

## Common mistakes

- Treating `as string` as runtime conversion.
- Using `any`, which suppresses useful evidence, instead of the supplied `unknown`.
- Asserting external data without validation.

## DSA relevance

Assertions can hide missing-node and wrong-element bugs. Keep any unavoidable assertion close to evidence that makes its claim true.

## Self-check

1. What JavaScript does `as string` emit? 2. How does `String(value)` differ? 3. Which option checks reality: assertion or `typeof` guard?

## Exercise preparation

Use a string assertion on the supplied `unknown` parameter and return its `.length`. Tests call only strings, enforce the `unknown`-to-number signature, and include a negative return-type check.

## Authoritative references

- [TypeScript Handbook: Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
