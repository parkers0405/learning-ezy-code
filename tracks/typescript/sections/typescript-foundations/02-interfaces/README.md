# Interfaces

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Interfaces](../../../textbook/typescript-foundations/02-interfaces.md)

An interface names an object's required shape. Properties can be optional (`?`) or read-only; interfaces can extend one another. TypeScript checks structure, so any value with the required members is compatible. Interfaces are useful object and class contracts; aliases, covered later, can also name unions.

## Exercise

Define `Car` with a string `model` and numeric `year`, then let the existing object satisfy it.

### Test contract

Export interface `Car` with `model: string` and `year: number`, plus `describeCar(car)` returning `model (year)`. Tests verify the interface structurally.

> Adapted and reformatted from upstream `Interfaces.md`; see the root `NOTICE`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
