# Expressions and Statements

## Goal

Distinguish value-producing code from action-performing code.

## Prerequisite recap

Bindings can be initialized and reassigned.

## Terms introduced

An **expression** produces a value. A **statement** performs an action. A declaration statement can contain an expression.

## Step-by-step mental model

In `const source = "ready";`, the string literal is an expression that produces a value; the complete declaration is a statement that binds it. In `result = source;`, the identifier expression `source` produces its current value and the assignment statement stores that value in `result`.

```ts
const source = "ready";
let result = "not ready";
result = source;
```

## Common mistakes

- Calling every line an expression. - Confusing `=` with equality.

## DSA relevance

Tracing expression values in statement order is hand-execution of an algorithm.

## Self-check

1. Which part produces a value? 2. What action does the whole statement perform?

## Exercise preparation

Use the supplied `source` expression in the export statement. Arithmetic begins in the next chapter.

## Authoritative references

- [MDN: Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
