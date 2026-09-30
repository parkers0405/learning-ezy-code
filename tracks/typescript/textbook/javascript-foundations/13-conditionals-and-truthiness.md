# Conditional Control Flow and Truthiness

## Goal

Trace statement-level `if`, `else if`, and `else` branches and understand how a condition chooses a branch.

## Prerequisite recap

Comparisons produce booleans. `&&`, `||`, `!`, and `??` were introduced without relying on truthiness.

## Terms introduced

**Control flow** is the order in which statements run. A **condition** is the value inside `if (...)`. A **branch** is one possible block of statements. A value is **truthy** when JavaScript treats it like `true` in a condition and **falsy** when JavaScript treats it like `false`.

The falsy primitive values encountered so far are `false`, `0`, `""`, `null`, and `undefined` (plus the number value `NaN`). Other strings and ordinary nonzero numbers are truthy.

## Step-by-step mental model

JavaScript checks branches from top to bottom. It runs the first branch whose condition succeeds, then skips the rest. `else` runs only if every earlier condition failed.

```ts
let result = "";
if (score >= 8) {
  result = "excellent";
} else if (score >= 5) {
  result = "pass";
} else {
  result = "retry";
}
```

For score `9`, the first block runs. For `6`, the first comparison fails and the middle block runs. For `2`, both comparisons fail and `else` runs. The braces contain the statements belonging to each branch.

## Common mistakes

- Writing separate `if` statements when only one branch should run.
- Putting the broadest condition first, making a later branch unreachable.
- Assuming the number `0` or empty string is truthy.

## DSA relevance

Algorithms use branches to choose cases such as “found,” “too small,” and “too large.” Tracing one branch at a time is a core debugging skill.

## Self-check

1. How many branches run in one chain? 2. Which result does score `6` select? 3. Name two falsy values.

## Exercise preparation

Complete three visible branch traces so low, middle, and high scores each reach the intended branch. No functions or collections are needed.

## Authoritative references

- [MDN: if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
- [MDN: Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
