# Unions, nullability, and intersections

**Required reading:** [Unions, Nullability, and Intersections](../../../textbook/typescript-foundations/03-unions-nullability-and-intersections.md)

## Behavioral contract

`selectedId` has exact static type `string | number | null` and runtime value `42`; booleans are rejected. `learner` is compatible with `{ name: string; active: boolean }` and equals `{ name: "Ada", active: true }`.

## Practice instruction

Write the supplied alternatives as a union annotation and the two object requirements as an intersection annotation. Add the missing object property rather than weakening either type.
