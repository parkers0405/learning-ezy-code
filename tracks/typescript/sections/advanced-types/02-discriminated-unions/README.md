# Discriminated Unions

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Discriminated Unions](../../../textbook/advanced-types/02-discriminated-unions.md)

Give each member of a union a shared property with a distinct literal value. Testing that discriminant narrows the whole object. A `switch` plus a `never` check can enforce exhaustive handling as the union grows.

## Exercise

Calculate circle area with `Math.PI * radius ** 2` and square area with `sideLength ** 2`.

### Test contract

Export `Circle`, `Square`, `Shape`, and `calculateArea`. Tests exercise both discriminants and zero-sized shapes.

> Adapted from upstream `Discriminated Unions.md`; see the root `NOTICE`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
