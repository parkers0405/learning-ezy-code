# Classes, Constructors, Fields, Methods, and this

## Goal

Define and construct an independent stateful object without inheritance.

## Prerequisite recap

Object types describe properties and function types describe behavior.

## Terms introduced

A **class** is a blueprint for instances. A **constructor** initializes each instance. `new` allocates an instance and invokes its constructor. A **field** stores instance data, a **method** defines behavior, and `this` refers to the current instance.

## Step-by-step mental model

`new Counter(2)` allocates an object, calls the constructor with `2`, and assigns `this.count`. Calling `counter.increment()` binds `this` to that counter. A second counter has separate state.

```ts
class Counter {
  count: number;
  constructor(start: number) {
    this.count = start;
  }
  increment(): number {
    this.count = this.count + 1;
    return this.count;
  }
}
```

## Common mistakes

- Omitting `new`. - Updating a local variable instead of `this.count`. - Introducing inheritance before basic instances are clear.

## DSA relevance

Classes can package data-structure state with operations that preserve invariants.

## Self-check

1. What does `new` do? 2. Which object does `this` mean? 3. Do two instances share a field?

## Exercise preparation

Update and return the current instance's field.

## Authoritative references

- [TypeScript Handbook: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
