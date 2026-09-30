# Logical Operators and Nullish Values

## Goal

Combine booleans and supply a fallback for absent values.

## Prerequisite recap

Comparisons produce booleans.

## Terms introduced

For boolean operands, `&&` produces `true` only when both sides are `true`, and `!` reverses a boolean. **Nullish** means only `null` or `undefined`; `??` supplies a fallback for either.

## Step-by-step mental model

Evaluate the boolean operands of `signedIn && allowed`: if either is `false`, permission is false. `missingName ?? "Guest"` uses the fallback because `missingName` is `undefined`. `emptyName ?? "Guest"` preserves `""` because an empty string is not null or undefined. Any union annotation in the tests is supplied checker scaffolding taught later.

```ts
const mayEnter = signedIn && allowed;
const missingDisplay = missingName ?? "Guest";
const emptyDisplay = emptyName ?? "Guest";
```

## Common mistakes

- Replacing an empty string even though `??` replaces only `null` or `undefined`. - Assuming `undefined` is the text `"undefined"`.

## DSA relevance

Guards combine invariants and defaults represent missing input.

## Self-check

1. Which two values are nullish? 2. Does `??` replace an empty string? 3. When does boolean `&&` produce `true`?

## Exercise preparation

Use `&&` and `??` once each.

## Authoritative references

- [MDN: Logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators)
