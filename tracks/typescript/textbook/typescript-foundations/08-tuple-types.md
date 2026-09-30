# Tuple Types

## Goal

- Represent fixed positions with distinct types.
- Use readonly tuples for stable pair-like values.
- Distinguish tuples from homogeneous arrays.

## Step-by-step mental model and syntax

A tuple is a JavaScript array with a TypeScript type describing specific positions and usually a fixed length.

```ts
type Coordinate = readonly [x: number, y: number];
const start: Coordinate = [4, 7];
const [x, y] = start;
```

Labels such as `x` and `y` improve editor documentation but do not create runtime property names. JavaScript still sees indexes `0` and `1`. A tuple can include optional and rest elements, though complex tuples may be less readable than an object.

Array literals often infer as mutable arrays unless context or `as const` preserves tuple positions. `readonly [number, number]` prevents assignment through that reference and accepts a constant pair without implying deep runtime freezing.

Use a tuple when position itself has stable meaning and the value is naturally consumed by destructuring. Use an object when names, optional fields, or future extension matter.

## Common mistakes

- Expecting tuple labels to exist at runtime.
- Allowing an array literal to widen and losing per-position types.
- Returning many positional values that callers cannot remember.
- Assuming readonly recursively freezes nested objects.

## DSA relevance

Tuples compactly represent coordinates, weighted edges, queue entries, and `[value, distance]` results. Position clarity is essential in nested algorithms.

## Self-check

1. Is a tuple a special runtime collection?
2. When is an object clearer than a tuple?
3. What does `readonly` prevent?

## Prerequisite recap

Array types describe repeated elements, and literal types can preserve an exact value.

## Terms introduced

A **tuple** is an array type with a fixed sequence of positions, where each position has its own type. A **readonly tuple** disallows assignment through those positions.

## Exercise preparation

Read the local exercise README and visible named tests, then change only learner-owned source.

## Authoritative references

- [TypeScript Handbook: Tuple Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)
- [TypeScript Handbook: Readonly Tuple Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-tuple-types)
