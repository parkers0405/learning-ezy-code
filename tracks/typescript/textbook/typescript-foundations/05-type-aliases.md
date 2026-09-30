# Type Aliases

## Goal

Name primitive, union, and object types and use an object alias in a function contract.

## Prerequisite recap

Annotations describe accepted values, object types describe named properties, and unions combine alternatives.

## Terms introduced

A **type alias** gives a reusable name to a type expression. It is checker-only syntax and creates no runtime value.

## Step-by-step mental model

The name appears after `type`, and the type it represents appears after `=`:

```ts
type Identifier = string;
type Input = string | number;
type Rectangle = { width: number; height: number };
```

`Rectangle` can now annotate a parameter. A compatible value must have numeric `width` and `height`. The alias does not construct an object and cannot be called or inspected at runtime.

The test import writes `type Rectangle` to mark a type-only import; no runtime value named `Rectangle` is requested. `expectTypeOf<Rectangle>()` supplies the alias itself as a type argument between angle brackets and checks it without constructing a rectangle.

## Common mistakes

- Expecting an alias to create or validate a runtime value.
- Writing a value declaration when a `type` declaration is required.
- Giving a property the wrong type inside the object alias.

## DSA relevance

Aliases give concise names to repeated input, coordinate, edge, and result shapes.

## Self-check

1. Does an alias emit JavaScript? 2. Can an alias name a union? 3. Which properties does `Rectangle` require?

## Exercise preparation

Keep the supplied `Rectangle` alias and compute width times height. The visible type checks provide positive evidence for valid rectangles and negative evidence for invalid property types.

## Authoritative references

- [TypeScript Handbook: Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
