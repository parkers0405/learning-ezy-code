# Interfaces

## Objectives

- Declare structural object contracts.
- Model optional and readonly properties.
- Extend and implement interfaces appropriately.

## Mental model and syntax

An interface is a compile-time named shape. TypeScript is structurally typed: a value is assignable when it has the required members, regardless of where it was declared.

```ts
interface Point {
  readonly id: string;
  x: number;
  y?: number;
}

const origin = { id: "origin", x: 0, note: "extra" };
const point: Point = origin;
```

The interface is erased; `instanceof Point` cannot work because no `Point` value exists at runtime. `readonly` prevents assignment through this type but does not deep-freeze the object. An optional property `y?` can be absent. With `exactOptionalPropertyTypes`, absence is not automatically the same as explicitly assigning `undefined`.

Interfaces can extend other object contracts and classes can `implements` them. `implements` checks the class surface; it does not inject methods or alter runtime behavior. Interfaces also support declaration merging, which is valuable for library augmentation but can surprise local code. Type aliases, covered later, are usually preferable when merging is unwanted.

## Common mistakes

- Expecting an interface to perform runtime validation.
- Assuming `readonly` recursively freezes nested values.
- Adding an index signature so broad that misspelled properties become acceptable.
- Believing `implements` generates an implementation.

## DSA relevance

Interfaces specify nodes, edges, and strategy APIs while allowing multiple representations. Algorithms can depend on capabilities rather than concrete classes.

## Self-check

1. Why can a separately declared object satisfy an interface?
2. Does `readonly` freeze runtime data?
3. Can an interface be used with `instanceof`?

## References

- [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Handbook: Interfaces vs type aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)
