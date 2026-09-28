# Operators and Expressions

## Objectives

- Build expressions with arithmetic, comparison, and logical operators.
- Predict precedence and use parentheses for clarity.
- Distinguish strict equality from assignment.

## Mental model

An expression produces a value. Operators combine or transform operands: `a + b` adds numbers, `a < b` compares values, and `ready && valid` combines booleans. A statement such as `const total = price * count;` uses an expression to initialize a binding.

JavaScript evaluates these operators at runtime. TypeScript checks whether the operand types support the operation before execution, but it neither changes precedence nor computes the result for the running program.

```ts
const subtotal = 12 * 3;
const discounted = subtotal >= 30;
const finalPrice = discounted ? subtotal - 5 : subtotal;
```

Multiplication and division bind more tightly than addition and subtraction. Parentheses override precedence and often communicate intent better than relying on memory. `===` and `!==` compare without coercing between unrelated primitive types; prefer them to `==` and `!=`.

Logical `&&` and `||` short-circuit: the right operand is evaluated only when needed. They return one of their operands, not necessarily a boolean. The nullish operator `??` chooses its right operand only when the left is `null` or `undefined`, unlike `||`, which also treats `0`, `""`, and `false` as reasons to fall back.

## Common mistakes

- Writing `=` (assignment) where `===` (comparison) was intended.
- Expecting integer division: `5 / 2` is `2.5`.
- Using `||` for a default when zero is a valid value.
- Compressing several operations into an expression whose evaluation order is hard to audit.

## DSA relevance

Index calculations, bounds checks, midpoint formulas, and boolean invariants are expressions. Correct grouping prevents off-by-one errors and broken termination conditions.

## Self-check

1. What is the value of `2 + 3 * 4`?
2. How does `??` differ from `||`?
3. Why prefer strict equality?

## References

- [MDN: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
- [MDN: Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)
