# Array, object, and function types

**Required reading:** [Array, Object, and Function Types](../../../textbook/typescript-foundations/02-array-object-and-function-types.md)

## Behavioral contract

`scores` has type `number[]` and value `[1, 2]`; `learner` has required string `name` and numeric `completed` properties and value `{ name: "Ada", completed: 2 }`; `add` has type `(left: number, right: number) => number` and `add(2, 3)` returns `5`. A string element is rejected from `scores`.

## Practice instruction

Repair the three supplied values while preserving their array, object, and function annotations. Implement `add` from its named parameters rather than replacing it with a fixed result.
