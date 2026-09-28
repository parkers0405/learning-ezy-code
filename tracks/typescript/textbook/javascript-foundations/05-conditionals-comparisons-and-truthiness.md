# Conditionals, Comparisons, and Truthiness

## Objectives

- Select branches with `if`, `else if`, and `else`.
- Compare values with strict equality and relational operators.
- Identify falsy values without confusing truthiness with equality.

## Mental model

A conditional evaluates an expression, converts its result to a boolean if necessary, and executes one branch. JavaScript's falsy values are `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`; other values, including empty arrays and objects, are truthy.

```ts
function classify(score: number): string {
  if (score >= 90) return "excellent";
  if (score >= 60) return "passing";
  return "retry";
}
```

Order matters: broad conditions placed before narrow ones can make later branches unreachable. Returning early is often clearer than deeply nested `else` blocks.

Truthiness is a runtime conversion. TypeScript also uses a condition to narrow possible types. After `if (name !== undefined)`, the checker knows `name` is a string inside that branch. Beware `if (name)`: it removes both `undefined` and the valid empty string.

The exercise's supplied `number | null | undefined` annotation says that any of those values may arrive. This union syntax is scaffolding needed for strict tests and is taught formally in the type-system sequence; this chapter's task is to choose the correct runtime condition.

## Common mistakes

- Assuming `[]` or `{}` is falsy.
- Using `==`, which performs coercions, instead of predictable `===`.
- Testing a broad range first and shadowing a special case.
- Replacing an explicit `undefined` check with truthiness when zero or empty text is valid.

## DSA relevance

Base cases, bounds checks, partition rules, and graph decisions are branches. Writing mutually understandable predicates makes correctness arguments possible.

## Self-check

1. Is an empty array truthy?
2. What valid values might `if (value)` accidentally exclude?
3. Why does branch order matter?

## References

- [MDN: if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
- [MDN: Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
- [TypeScript Handbook: Truthiness narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#truthiness-narrowing)
