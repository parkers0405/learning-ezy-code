# Booleans and Comparisons

## Goal

Produce boolean results with comparisons.

## Prerequisite recap

Expressions produce values.

## Terms introduced

A **boolean** is `true` or `false`. A **comparison** relates values. `===` is strict equality; `<`, `>`, `<=`, and `>=` compare order.

## Step-by-step mental model

Evaluate both operands, apply the comparison, and receive one boolean. `temperature > 20` is `true` when temperature is 21.

```ts
const warm = temperature > 20;
const exact = temperature === 21;
```

## Common mistakes

- Using assignment `=` as equality. - Comparing number text with a number.

## DSA relevance

Comparisons control searches, bounds, and ordering.

## Self-check

1. What values can a boolean hold? 2. Why prefer `===`?

## Exercise preparation

Use `>` and `===`.

## Authoritative references

- [MDN: Comparison operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#comparison_operators)
