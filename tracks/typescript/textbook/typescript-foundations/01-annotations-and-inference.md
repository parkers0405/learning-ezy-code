# Annotations and Inference

## Goal

Know when TypeScript infers a type and when source declares one.

## Prerequisite recap

JavaScript runtime values and behavior are familiar.

## Terms introduced

A **type annotation** explicitly describes accepted values. **Inference** lets TypeScript derive a type from context. A compile-time type is erased before runtime.

## Step-by-step mental model

Read `const count: number = 3` as name, annotation, then runtime value. With `const message = "hello"`, TypeScript infers string. Prefer inference when obvious; annotate boundaries when a contract needs to be visible.

```ts
const inferred = "hello";
const count: number = 3;
// @ts-expect-error proves the checker rejects this relationship
const wrong: number = "three";
```

## Common mistakes

- Treating annotations as runtime conversion. - Annotating every obvious local value.

## DSA relevance

Types document algorithm inputs and outputs before execution.

## Self-check

1. Does annotation convert a string? 2. What type is inferred for a string literal binding?

## Exercise preparation

Repair the annotated value; review the positive and negative type evidence in the solution.

## Authoritative references

- [TypeScript Handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
