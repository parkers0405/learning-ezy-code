# Interfaces

## Goal

Use an interface to state the required properties of an object.

## Prerequisite recap

The preceding chapter named an object shape with a type alias. An interface is another way to name an object contract.

## Terms introduced

An **interface** is a checker-only declaration of a required object shape. **Structural compatibility** means a value is accepted because its properties fit, not because a constructor gave it a particular identity.

## Step-by-step mental model

```ts
interface Car {
  model: string;
  year: number;
}
```

A compatible object needs a string `model` and number `year`. An ordinary object declared elsewhere can satisfy the interface. The interface performs no runtime validation and cannot be used with `instanceof` because it emits no JavaScript value.

## Common mistakes

- Writing `year: string` while the contract requires a number.
- Expecting the interface to create an object.
- Assuming only objects explicitly labeled `Car` can fit structurally.

## DSA relevance

Interfaces let an algorithm depend on a small required shape while callers choose how to create compatible objects.

## Self-check

1. What makes an object structurally compatible? 2. Does an interface exist at runtime? 3. Which two properties does `Car` require?

## Exercise preparation

Correct the `Car` property type. Positive checks use valid cars; a visible `@ts-expect-error` line documents an invalid year that the checker must reject.

## Authoritative references

- [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
