# Type Unions and Intersections

## Objectives

- Model alternatives with unions.
- Combine requirements with intersections.
- Narrow before using alternative-specific members.

## Mental model and syntax

`A | B` means a value may satisfy either type. Until code proves which, only operations safe for every member are available. `A & B` means one value must satisfy both sets of requirements.

```ts
type Identifier = string | number;

function display(id: Identifier): string {
  return typeof id === "number" ? id.toFixed(0) : id.toUpperCase();
}

type Timestamped = { createdAt: Date };
type Named = { name: string };
type RecordItem = Timestamped & Named;
```

These constructs are static and erased. The runtime `typeof` condition does the actual branch, while TypeScript follows it to narrow `id`. Intersections do not merge runtime objects; spread or assignment must still create a combined value.

Impossible intersections can produce `never`, such as incompatible primitive demands. Object-property conflicts can also create unusable property types. A union of object shapes becomes especially effective when each member has a literal discriminant, explored later.

## Common mistakes

- Reading a property that exists on only one union member before narrowing.
- Interpreting union as “has all fields” and intersection as “one or the other.”
- Expecting `A & B` to copy values together.
- Building a giant optional-property object instead of explicit alternatives.

## DSA relevance

Unions model optional search outcomes and variant nodes. Intersections add reusable metadata to domain records without weakening their requirements.

## Self-check

1. Which operations are initially safe on a union?
2. Does an intersection create a runtime object?
3. When can an intersection become impossible?

## References

- [TypeScript Handbook: Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [TypeScript Handbook: Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)
