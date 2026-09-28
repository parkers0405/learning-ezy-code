# Classes

## Objectives

- Define initialized fields, constructors, and methods.
- Use visibility modifiers as design constraints.
- Separate a class's runtime value from its instance type.

## Mental model and syntax

A class is both a runtime constructor value and a compile-time description of its instances. Calling `new` allocates an object, initializes fields, runs the constructor, and links methods through the prototype.

```ts
class Counter {
  private value = 0;

  constructor(readonly label: string) {}

  increment(): number {
    return ++this.value;
  }
}
```

TypeScript's `public`, `protected`, and `private` modifiers are primarily static restrictions. JavaScript `#private` fields provide runtime-enforced privacy. Parameter properties such as `readonly label` declare and initialize a field concisely. Under strict property initialization, each required field must be initialized where declared or in the constructor.

Prefer a class when identity, encapsulated changing state, or polymorphic methods matter. A plain object and functions are often simpler for immutable records.

## Common mistakes

- Extracting a method that uses `this` and losing its receiver.
- Assuming TypeScript `private` creates a JavaScript `#private` field.
- Using inheritance only to reuse code when composition is clearer.
- Leaving required fields uninitialized.

## DSA relevance

Classes can encapsulate stack, queue, tree, and graph invariants. Keep representation private so clients cannot bypass checks.

## Self-check

1. What remains at runtime: a class or an interface?
2. How does `private` differ from `#field`?
3. When is a plain object preferable?

## References

- [TypeScript Handbook: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
