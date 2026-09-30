# Readonly type

**Required reading:** [Readonly Types](../../../textbook/advanced-types/06-readonly-type.md)

## Behavioral contract

`ReadonlyPoint` has numeric `x` and `y` properties, and checked assignments to either property are rejected.

## Practice instruction

Derive `ReadonlyPoint` as `Readonly<Point>` rather than duplicating the object type or relying on runtime freezing.

## Attribution

> Adapted from upstream `Readonly Type.md`; automation correction documented in `CORRECTIONS.md`.
