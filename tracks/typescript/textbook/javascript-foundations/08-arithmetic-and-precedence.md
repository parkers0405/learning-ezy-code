# Arithmetic Operators and Precedence

## Goal

Calculate with `+`, `-`, `*`, `/`, and `%`, and use parentheses to make grouping explicit.

## Prerequisite recap

An expression produces a value. A declaration statement can store the value produced by an expression.

## Terms introduced

An **arithmetic operator** combines number values. Its input values are **operands**. **Precedence** is the rule that decides which operator is applied first. **Grouping** with parentheses makes the intended first step explicit. The **remainder** is what remains after making as many whole groups as possible.

## Step-by-step mental model

`+` adds, `-` subtracts, `*` multiplies, and `/` divides. Multiplication, division, and remainder have higher precedence than addition and subtraction.

```ts
2 + 3 * 4; // 14: multiplication happens first
(2 + 3) * 4; // 20: parentheses make addition happen first
```

`%` calculates a remainder. Seven items can make two complete groups of three, with one item left:

```ts
7 % 3; // 1
```

Parentheses are useful even when precedence would already produce the right value: they show the reader which arithmetic step belongs together.

## Common mistakes

- Assuming every arithmetic expression runs strictly left to right.
- Reading `%` as percentage rather than remainder.
- Omitting parentheses when grouping communicates the calculation.

## DSA relevance

Remainders identify even/odd values and wrap positions; grouped arithmetic calculates indexes and sizes.

## Self-check

1. What is `2 + 3 * 4`? 2. How do parentheses change it? 3. What is `10 % 4`, and why?

## Exercise preparation

Produce `20` with grouped addition and multiplication, then produce remainder `1`. Tests enforce results; the README marks operator use as practice.

## Authoritative references

- [MDN: Arithmetic operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#arithmetic_operators)
- [MDN: Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)
