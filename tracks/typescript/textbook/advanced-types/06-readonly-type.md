# Readonly Types

## Objectives

- Prevent assignment through readonly views.
- Use readonly arrays and tuples in input contracts.
- Separate static immutability from runtime freezing.

## Mental model and syntax

`readonly` prevents writes through a particular TypeScript reference.

```ts
type Point = { readonly x: number; readonly y: number };

function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}
```

The function can accept mutable or readonly arrays because it promises not to mutate them. It cannot call `push` through that parameter. At runtime, however, there is still an ordinary array; TypeScript emits no freeze operation.

Readonly is shallow. A readonly property containing a mutable array cannot be reassigned, but that array may still mutate unless its own type is readonly. `Object.freeze` performs shallow runtime freezing and has different responsibilities.

Readonly views are assignability tools, not absolute ownership guarantees. Another alias may retain write access. For important immutable updates, create a new object or array and decide deliberately how deeply to copy.

## Common mistakes

- Claiming readonly means deeply immutable.
- Expecting a runtime exception from a TypeScript-only restriction.
- Accepting mutable arrays when an algorithm only needs to read.
- Casting away readonly and violating a caller's assumptions.

## DSA relevance

Readonly inputs make it explicit whether sorting, traversal, or dynamic programming mutates supplied data. This prevents surprising side effects during algorithm comparison.

## Self-check

1. Does `readonly` call `Object.freeze`?
2. Why accept `readonly T[]` for read-only algorithms?
3. Can another alias still mutate the value?

## References

- [TypeScript Handbook: readonly Properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties)
- [TypeScript Handbook: ReadonlyArray](https://www.typescriptlang.org/docs/handbook/2/objects.html#the-readonlyarray-type)
- [MDN: Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
