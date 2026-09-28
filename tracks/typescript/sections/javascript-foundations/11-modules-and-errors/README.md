# Exercise: Modules and Basic Error Handling

**Prerequisites:** Complete the preceding roadmap entries.

**Required reading:** [Modules and Basic Error Handling](../../../textbook/javascript-foundations/11-modules-and-errors.md)

## Contract

Implement and export `add` and `divide` from `math.ts`, then re-export both from `starter.ts`. `divide` must throw `RangeError("division by zero")` for a zero divisor. Tests cross the public module boundary and cover successful arithmetic and exact failure behavior.

## Commands

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` from this directory.
