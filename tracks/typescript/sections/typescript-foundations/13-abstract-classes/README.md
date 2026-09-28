# Abstract Classes

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Abstract Classes](../../../textbook/typescript-foundations/13-abstract-classes.md)

An abstract class cannot be instantiated directly. It can implement shared behavior and declare abstract members concrete subclasses must implement. Unlike an interface, it can hold implementation and protected state.

## Exercise

Extend `Shape` with `Circle` and `Rectangle`; implement `area` for each.

### Test contract

Export abstract `Shape` and concrete `Circle`/`Rectangle` subclasses. Tests verify inheritance, formulas, and zero-sized shapes.

> Adapted from upstream `Abstract Classes.md`; see the root `NOTICE`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
