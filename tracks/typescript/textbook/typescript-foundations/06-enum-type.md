# Enum Type

## Objectives

- Define and consume enum members.
- Distinguish emitted enums from erased unions.
- Choose an enum only when its runtime object is useful.

## Mental model and syntax

Unlike most TypeScript-only syntax, a regular `enum` emits a JavaScript object. String enums give members stable, readable runtime values.

```ts
enum Direction {
  North = "north",
  South = "south",
}

function move(direction: Direction): string {
  return `moving ${direction}`;
}
```

Numeric enums auto-increment and historically expose reverse mappings. That convenience can obscure serialized values, so explicit string values are often clearer at boundaries. An alternative is a constant object plus a derived union:

```ts
const DirectionValue = { north: "north", south: "south" } as const;
type DirectionValue = (typeof DirectionValue)[keyof typeof DirectionValue];
```

This alternative uses ordinary JavaScript and creates a union of literal values. Choose based on interoperability and project conventions, not merely brevity. Avoid `const enum` in shared code unless the build pipeline's inlining semantics are fully controlled.

## Common mistakes

- Assuming enums are erased like interfaces.
- Depending on implicit numeric values in persisted data.
- Passing the raw string `"north"` where a nominal enum member is required.
- Choosing an enum when a simple literal union needs no runtime object.

## DSA relevance

Named states and directions make state machines and grid traversal readable. Stable values are important when cases are logged or serialized.

## Self-check

1. Does a regular enum exist at runtime?
2. Why prefer explicit string members at boundaries?
3. What is an enum-free alternative?

## References

- [TypeScript Handbook: Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
- [TypeScript Handbook: Objects vs Enums](https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums)
