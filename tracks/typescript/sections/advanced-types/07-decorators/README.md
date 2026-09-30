# Decorators

**Required reading:** [Decorators](../../../textbook/advanced-types/07-decorators.md)

## Behavioral contract

Export legacy method-decorator function `log` and class `Calculator`. The decorated `add` retains numeric parameters, returns their sum, and logs `"add method called"` when invoked.

## Practice instruction

Wrap `descriptor.value`, log from `propertyKey`, and delegate to the original method with the original `this` and arguments. Apply the legacy decorator through the supplied descriptor steps; do not replace addition with a fixed value.

## Attribution

> Adapted from upstream `Decorators.md`; stale `Decorators2.md`/`Decorators3.md` are excluded. See `CORRECTIONS.md`.
