# Discriminated Unions

## Goal

- Design variants with a shared literal tag.
- Narrow variants through control flow.
- enforce exhaustiveness with `never`.

## Step-by-step mental model and syntax

A discriminated union is a union of object types that share a property with distinct literal values. The property is real runtime data and also evidence for static narrowing.

```ts
type Result<T> =
  { kind: "success"; value: T } | { kind: "failure"; message: string };

function describe<T>(result: Result<T>): string {
  switch (result.kind) {
    case "success":
      return String(result.value);
    case "failure":
      return result.message;
    default:
      return assertNever(result);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unexpected variant: ${JSON.stringify(value)}`);
}
```

If a variant is later added, the default branch receives something other than `never` and the checker reports the missing case. The throw remains runtime defense against unchecked callers.

Keep variant-only properties required in their own branch instead of placing every property as optional on one broad interface. That makes impossible states harder to represent.

## Common mistakes

- Widening the tag from a literal to `string`.
- Destructuring in a way that loses the correlation between tag and payload in complicated code.
- Omitting an exhaustive check and silently ignoring new variants.
- Assuming compile-time exhaustiveness validates external objects.

## DSA relevance

Variants model expression trees, tokens, traversal events, and state machines. Exhaustive switches make recursive algorithms resilient when node kinds grow.

## Self-check

1. Must the discriminant exist at runtime?
2. Why should variant fields be required?
3. How does `never` reveal a missing case?

## Prerequisite recap

Literal-valued properties can distinguish members of a union, and narrowing follows runtime equality checks.

## Terms introduced

A **discriminated union** gives every member one shared property with distinct literal values. An **exhaustive check** makes the checker report a newly added case that code has not handled.

## Exercise preparation

Read the local exercise README and visible named tests, then change only learner-owned source.

## Authoritative references

- [TypeScript Handbook: Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [TypeScript Handbook: Exhaustiveness Checking](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking)
