# Abstract classes

**Required reading:** [Abstract Classes](../../../textbook/typescript-foundations/16-abstract-classes.md)

## Behavioral contract

`Shape` is abstract and cannot be instantiated. `Circle` and `Rectangle` are `Shape` instances; their `area(): number` methods return the tested circle and rectangle areas, including zero-sized shapes.

## Practice instruction

Implement the abstract `area` contract in both supplied subclasses. Use `Math.PI * radius * radius` for `Circle` and `width * height` for `Rectangle`; preserve `extends Shape` and `super()`.

## Attribution

> Adapted from upstream `Abstract Classes.md`; see the root `NOTICE`.
