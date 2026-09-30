# Decorators

## Goal

- Recognize the decorator syntax used by this track.
- Describe evaluation versus application order.
- Keep runtime wrapping behavior type-correct.

## Step-by-step mental model and syntax

This curriculum exercises TypeScript's legacy experimental decorators because the migrated source uses that model and enables `experimentalDecorators`. A method decorator receives the prototype, member name, and property descriptor and may inspect or replace behavior.

```ts
function logged(
  _target: object,
  key: string,
  descriptor: PropertyDescriptor,
): void {
  const original = descriptor.value as (...args: unknown[]) => unknown;
  descriptor.value = function (...args: unknown[]) {
    console.log(key, args.length);
    return original.apply(this, args);
  };
}
```

Decorators execute when a class is defined, not each time its source is read by the checker. Wrapper code must preserve `this`, arguments, return values, errors, and often metadata. Multiple decorator expressions are evaluated top-to-bottom and applied in the documented reverse order.

JavaScript's standardized decorators use different semantics from the legacy experimental API. Do not copy patterns between the models without checking compiler configuration and current documentation.

## Common mistakes

- Losing `this` by calling an extracted original method incorrectly.
- Forgetting to return the wrapped result.
- Hiding side effects that make ordinary method calls surprising.
- Mixing legacy and standard decorator signatures.

## DSA relevance

Decorators can instrument calls or timing, but direct wrappers are often easier for algorithm benchmarks. The lesson is chiefly about typed metaprogramming boundaries.

## Self-check

1. Which decorator model does this track configure?
2. What behavior must a method wrapper preserve?
3. When is decorator code executed?

## Prerequisite recap

Classes create runtime constructors and methods; functions can receive and return values, including constructors.

## Terms introduced

A **decorator** is a function applied by decorator syntax to a supported declaration. **Metadata** is descriptive information attached for tools or runtime frameworks.

## Exercise preparation

Read the local exercise README and visible named tests, then change only learner-owned source.

## Authoritative references

- [TypeScript Handbook: Decorators (legacy experimental model)](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [TypeScript TSConfig: experimentalDecorators](https://www.typescriptlang.org/tsconfig/experimentalDecorators.html)
- [JavaScript decorators proposal](https://github.com/tc39/proposal-decorators)
