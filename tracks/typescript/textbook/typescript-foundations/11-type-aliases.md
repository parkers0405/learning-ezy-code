# Type Aliases

## Objectives

- Give meaningful names to reusable types.
- Compose aliases from unions, objects, and generics.
- Understand that aliases do not create runtime values.

## Mental model and syntax

A type alias binds a name to any type expression. It can describe primitives, unions, tuples, functions, or objects.

```ts
type NodeId = string;
type Result<T> = { ok: true; value: T } | { ok: false; message: string };
type Compare<T> = (left: T, right: T) => number;
```

Aliases are expanded by the type checker and erased from JavaScript. `NodeId` improves vocabulary but remains structurally the same as `string`; it does not create a runtime wrapper or nominal distinction. A branded intersection can model stronger distinctions when needed, but boundary validation remains necessary.

Both aliases and interfaces can name object shapes. Interfaces support declaration merging and extension syntax; aliases compose naturally with unions and intersections. Choose the feature that communicates the model, and keep project style consistent.

Recursive aliases can describe trees and linked structures, provided recursion passes through properties or containers rather than expanding infinitely at once.

## Common mistakes

- Trying to call or inspect an alias at runtime.
- Creating aliases that merely rename a type without adding domain meaning.
- Assuming two aliases of `string` are incompatible.
- Building unreadably deep one-line compositions instead of naming useful layers.

## DSA relevance

Aliases document node IDs, edges, comparators, matrices, and recursive structures. Generic aliases keep success/failure and container patterns consistent.

## Self-check

1. Does an alias emit JavaScript?
2. Is `type UserId = string` nominally distinct from string?
3. When does an interface offer a unique capability?

## References

- [TypeScript Handbook: Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
- [TypeScript Handbook: Recursive Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
