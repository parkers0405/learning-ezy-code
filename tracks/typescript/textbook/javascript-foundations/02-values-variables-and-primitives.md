# Values, Variables, and Primitive Types

## Objectives

- Choose `const` or `let` intentionally.
- Recognize JavaScript's common primitive values.
- Explain inference, annotation, and reassignment.

## Mental model

A value is runtime data. A variable is a name whose binding refers to a value. Declare a binding with `const` when it will not be reassigned and `let` when reassignment is part of the algorithm. `const` does not freeze an object; it only prevents the binding from pointing elsewhere.

```ts
const course = "algorithms"; // inferred as string
let solved: number = 0;
solved = solved + 1;
```

Frequently used primitives are `string`, `number`, `boolean`, `bigint`, `symbol`, `undefined`, and `null`. JavaScript has one ordinary `number` type for floating-point and integer-looking values. TypeScript's lowercase names (`string`, not `String`) describe these primitives.

At runtime, `typeof value` returns a string such as `"number"` or `"boolean"`. At compile time, an annotation restricts which assignments are accepted. These are related but different mechanisms.

```ts
const enabled = true;
console.log(typeof enabled); // "boolean" at runtime
```

## Common mistakes

- Using `let` by habit even when reassignment never occurs.
- Believing `const list = []` makes the array immutable; `list.push(...)` is still allowed.
- Using boxed types such as `Number` in annotations.
- Assuming an uninitialized `let` already contains a useful value; it is `undefined` until assigned.

## DSA relevance

Clear bindings expose an algorithm's changing state. Constants identify fixed inputs and sentinels; narrowly scoped mutable variables represent counters, pointers, and accumulators. This distinction makes invariants easier to see.

## Self-check

1. What exactly does `const` prevent?
2. Why does `3.5` have the same primitive type as `3`?
3. When is an explicit annotation valuable?

## References

- [MDN: JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
- [TypeScript Handbook: Variables](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)
- [TypeScript Handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
