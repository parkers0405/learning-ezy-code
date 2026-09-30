# Inheritance, super, and override

## Goal

Extend an existing class only after basic class construction is understood.

## Prerequisite recap

A class defines constructors, fields, methods, `this`, and instances created by `new`.

## Terms introduced

`extends` creates a subclass. `super(...)` runs the base constructor. `override` asks TypeScript to verify that a base method exists. A **subtype** can be used where its base type is expected.

## Step-by-step mental model

`Dog extends Animal` inherits fields and methods. Its constructor must call `super(name)` before using `this`. An overriding method keeps the same contract while supplying specialized behavior; `super.speak()` can call the base implementation.

```ts
class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  override speak(): string {
    return `${this.name} barks`;
  }
}
```

## Common mistakes

- Forgetting `super` in a derived constructor. - Using `override` for a method absent from the base. - Reaching for inheritance when composition is clearer.

## DSA relevance

Subtype relationships appear in extensible data structures, though composition is often simpler.

## Self-check

1. What does `super(name)` initialize? 2. What does `override` verify?

## Exercise preparation

Keep the inheritance structure and specialize one method.

## Authoritative references

- [TypeScript Handbook: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
