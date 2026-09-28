# Abstract Classes

## Objectives

- Share implementation while requiring subclass behavior.
- Distinguish abstract compile-time rules from runtime inheritance.
- Prefer composition when a genuine subtype relationship is absent.

## Mental model and syntax

An abstract class cannot be directly instantiated in checked TypeScript. It can contain implemented members and abstract members that concrete subclasses must provide.

```ts
abstract class Frontier<T> {
  protected items: T[] = [];
  abstract remove(): T | undefined;

  add(value: T): void {
    this.items.push(value);
  }
}

class Stack<T> extends Frontier<T> {
  remove(): T | undefined {
    return this.items.pop();
  }
}
```

The abstract restriction is a TypeScript check; emitted JavaScript uses ordinary classes and prototypes. `protected` permits access in subclasses but not ordinary clients. Constructors in derived classes must call `super()` before using `this`.

Inheritance expresses an “is-a” relationship and couples a subclass to base implementation. If all that is needed is a capability contract, an interface may be enough. If behavior should be assembled flexibly, composition often avoids fragile hierarchies.

## Common mistakes

- Expecting an abstract class to be impossible to instantiate from unchecked JavaScript.
- Making representation `protected` when private helpers could preserve stronger invariants.
- Forgetting to implement every abstract member.
- Choosing inheritance solely to avoid duplicating a few lines.

## DSA relevance

An abstract frontier can share storage while stacks and queues vary removal policy. The abstraction should clarify the algorithm, not conceal operation costs.

## Self-check

1. Can an abstract class contain implemented methods?
2. Is the abstract restriction runtime validation?
3. When might an interface be sufficient?

## References

- [TypeScript Handbook: Abstract Classes and Members](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)
- [MDN: extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)
