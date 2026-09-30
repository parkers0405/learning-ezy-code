# Discriminated unions

**Required reading:** [Discriminated Unions](../../../textbook/advanced-types/02-discriminated-unions.md)

## Behavioral contract

Export `Circle`, `Square`, their `Shape` union, and `calculateArea(shape: Shape): number`. Tested circles and squares return their area, including zero sizes; an object whose discriminant and properties disagree is rejected.

## Practice instruction

Branch on `shape.kind` so TypeScript narrows the union, then calculate from the member-specific property. Use the supplied circle and square formulas rather than assertions.

## Attribution

> Adapted from upstream `Discriminated Unions.md`; see the root `NOTICE`.
