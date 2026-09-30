# Inheritance

**Required reading:** [Inheritance](../../../textbook/typescript-foundations/15-inheritance.md)

## Behavioral contract

`Dog` is structurally compatible with `Animal`; `new Dog("Pip").speak()` returns `"Pip barks"`, and non-string names are rejected.

## Practice instruction

Keep `Dog extends Animal`, call `super(name)` in its constructor, and implement the supplied `override speak()` with inherited `this.name`.
