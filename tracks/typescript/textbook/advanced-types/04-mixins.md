# Mixins

## Objectives

- Compose class behavior with constructor functions.
- Preserve base instances and added members in types.
- Recognize conflicts and lifecycle costs.

## Mental model and syntax

JavaScript classes have single inheritance. A mixin is a function that accepts a base constructor and returns a subclass with added behavior.

```ts
type Constructor<T = object> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    readonly createdAt = new Date();
  };
}

class Item {
  constructor(readonly id: string) {}
}
const TimestampedItem = Timestamped(Item);
```

This pattern creates real runtime subclass constructors. The generic constraint retains the base constructor and instance members. Mixins can be stacked, but order matters when initializers or methods interact.

Use mixins for orthogonal behavior shared across class families. Prefer ordinary composition when behavior can be held as a field or delegated function; it tends to make dependencies and initialization clearer.

The unavoidable `any[]` in a broad constructor helper is a narrow infrastructure escape hatch, not permission to spread `any` through domain code.

## Common mistakes

- Defining two mixins with colliding member names.
- Assuming application order cannot affect runtime behavior.
- Losing constructor parameters with an imprecise helper type.
- Recreating a multiple-inheritance hierarchy that is harder to reason about than composition.

## DSA relevance

Mixins can add instrumentation or identity to data-structure classes without changing core algorithms, but benchmarking and tracing are often simpler as composed callbacks.

## Self-check

1. Does a mixin create runtime code?
2. Why retain the base constructor type?
3. When is composition clearer?

## References

- [TypeScript Handbook: Mixins](https://www.typescriptlang.org/docs/handbook/mixins.html)
- [MDN: Class expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class)
