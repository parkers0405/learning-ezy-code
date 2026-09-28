# Type Guards

## Objectives

- Narrow unions using runtime evidence.
- Write predicates with `value is Type` carefully.
- Use assertions only after validation.

## Mental model and syntax

A type guard is a runtime check whose control flow lets TypeScript refine a static type. Built-in guards include `typeof`, `instanceof`, equality, and the `in` operator.

```ts
function format(value: string | Date): string {
  if (value instanceof Date) return value.toISOString();
  return value.toUpperCase();
}
```

A user-defined predicate connects a boolean result to a type claim:

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

The checker trusts the predicate signature, so an incorrect implementation is an unsound promise. Test guards with adversarial input, especially at JSON and API boundaries. For complex data, validate every property required by the domain type.

An assertion function (`asserts value is T`) narrows after returning and throws on invalid input. It is appropriate when failure should stop the operation rather than become a normal branch.

## Common mistakes

- Writing a predicate that checks only one of several required properties.
- Using `typeof null === "object"` without excluding `null`.
- Replacing validation with a type assertion.
- Using truthiness when a valid zero or empty string must remain.

## DSA relevance

Guards handle nullable links, mixed tokens, and variant nodes safely. They turn runtime invariants into information the checker can follow.

## Self-check

1. Does a guard execute at runtime?
2. Why is a predicate signature a promise?
3. What special case accompanies `typeof value === "object"`?

## References

- [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Handbook: Type Predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
- [TypeScript Handbook: Assertion Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
