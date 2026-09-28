# Type Unions and Intersections

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Unions and Intersections](../../../textbook/typescript-foundations/05-type-unions-and-intersections.md)

A union (`A | B`) accepts a value matching either type. An intersection (`A & B`) requires all members of both. You must narrow a union before using members that are not shared; intersections are useful for combining capabilities.

## Exercise

Define `Vehicle` as `Car | Bike`, then return the vehicle's discriminating `type` from `identifyVehicle`.

### Test contract

Export `Car`, `Bike`, their union `Vehicle`, and `identifyVehicle`. Both variants must be accepted and return their discriminant.

> Adapted from upstream `Type Unions and Intersections.md`; see the root `NOTICE`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
