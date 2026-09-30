# Abstract Classes

## Goal

Use `Shape` as an abstract base and implement required area behavior in `Circle` and `Rectangle`.

## Prerequisite recap

A class creates instances, a subclass extends a base class, and `super()` initializes the base part before a derived constructor uses `this`.

## Terms introduced

An **abstract class** is a base class that checked TypeScript does not allow code to instantiate directly. An **abstract method** declares a required method signature without its body. A **concrete subclass** supplies every required implementation and can be instantiated.

## Step-by-step mental model

```ts
abstract class Shape {
  abstract area(): number;
}
```

`Shape` states that every concrete shape must provide a no-argument `area` method returning a number. `Circle extends Shape` is an “is a” relationship: a circle is a shape. Its implementation uses the radius stored by the supplied constructor:

```ts
class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
```

`public radius` is supplied parameter-property shorthand: it accepts the argument and stores it as `this.radius`. `Math.PI` is JavaScript's supplied approximation of π.

The visible test's `toBeInstanceOf(Shape)` checks the runtime inheritance relationship. `toBeCloseTo` compares floating-point numbers with tolerance because decimal approximations need not have exact bit-for-bit equality.

## Common mistakes

- Trying to instantiate `Shape` directly.
- Leaving an abstract method unimplemented in a concrete subclass.
- Forgetting `super()` in a derived constructor.
- Using diameter where the circle formula requires radius squared.

## DSA relevance

Abstract bases can define one operation shared by several representations, though simple capability-only contracts may need only an interface.

## Self-check

1. Can checked code instantiate `Shape`? 2. What must every concrete subclass provide? 3. What does `public radius` store?

## Exercise preparation

Implement circle area as π times radius times radius and rectangle area as width times height. A visible `@ts-expect-error` check proves that direct `new Shape()` is rejected by the checker.

## Authoritative references

- [TypeScript Handbook: Abstract Classes and Members](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)
