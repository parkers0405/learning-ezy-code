# Type Assertions

## Objectives

- Explain what an assertion can and cannot do.
- Prefer narrowing and validation to unchecked claims.
- Recognize unsafe double assertions.

## Mental model and syntax

A type assertion tells the checker, “treat this expression as this type.” It emits no conversion, check, or validation.

```ts
const element = document.querySelector("canvas") as HTMLCanvasElement | null;
if (element) {
  element.getContext("2d");
}
```

The assertion may encode knowledge unavailable to static analysis, but the `null` possibility remains real. If an assertion is wrong, JavaScript still receives the original value and may fail later. Prefer APIs that infer precisely, control-flow narrowing, or a validator that examines unknown data.

`as const` is a special assertion-like construct: it asks for narrow literal types and readonly properties/tuples. A non-null assertion (`value!`) removes `null` and `undefined` only from the static type and deserves the same caution.

TypeScript rejects implausible assertions. Writing `value as unknown as Target` bypasses that safeguard; isolate such bridges at trusted boundaries and explain the invariant.

## Common mistakes

- Treating `as number` as numeric conversion; use `Number(value)` for runtime conversion.
- Asserting external JSON directly into a trusted domain type.
- Using `!` instead of handling a genuine missing case.
- Spreading assertions throughout code rather than fixing an imprecise boundary type.

## DSA relevance

Unchecked assertions can hide empty-array and missing-node bugs. Local proof through conditions is more reliable than claiming an index or lookup succeeded.

## Self-check

1. What JavaScript does `as T` emit?
2. How does conversion differ from assertion?
3. When is `as const` useful?

## References

- [TypeScript Handbook: Type Assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
- [TypeScript Handbook: `as const`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-inference)
