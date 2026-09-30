# Loops and Iteration

## Goal

Trace a supplied `for...of` loop with `break` and a supplied `while` loop that counts down.

## Prerequisite recap

Arrays hold ordered values, conditionals choose a branch, and assignment can update a binding.

## Terms introduced

A **loop** repeats a block. One **iteration** is one run of that block. `for...of` visits each array value in order. `break` immediately exits the nearest loop. `while` repeats while its condition evaluates to `true`.

## Step-by-step mental model

This loop adds each value unless adding it would exceed the limit:

```ts
let total = 0;
for (const value of [2, 3, 8]) {
  if (total + value > 6) {
    break;
  }
  total = total + value;
}
```

Trace it: total starts at `0`; adding `2` gives `2`; adding `3` gives `5`; adding `8` would exceed `6`, so `break` exits and the final total is `5`. `number[]` in the exercise is supplied checker notation for “array of numbers.”

A `while` loop checks before each iteration:

```ts
let current = 3;
let result = "";
while (current > 0) {
  result = `${result}${current}`;
  current = current - 1;
}
```

The three iterations append `3`, then `2`, then `1`. After subtraction makes `current` zero, the condition is false and repetition stops.

## Common mistakes

- Replacing the running total instead of adding to it.
- Adding the over-limit value before checking.
- Forgetting to reduce `current`, causing the `while` condition to remain true.

## DSA relevance

Loops drive scans, searches, and repeated state updates. A written value-by-value trace exposes off-by-one and stopping mistakes.

## Self-check

1. When does `break` run in the first trace? 2. What is its final total? 3. Why does the countdown stop?

## Exercise preparation

Complete the supplied `for...of` and `while` bodies using expanded assignments such as `total = total + value`. Runtime tests vary inputs and limits; using these exact loop forms is a practice requirement, not something results alone can prove.

## Authoritative references

- [MDN: Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [MDN: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
