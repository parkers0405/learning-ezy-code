# Decorators

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Decorators](../../../textbook/advanced-types/07-decorators.md)

Decorators attach behavior to classes or class members. This upstream lesson uses TypeScript's legacy method-decorator signature `(target, propertyKey, descriptor)`, so this project enables `experimentalDecorators`. A method decorator can replace `descriptor.value` while delegating to the original method.

## Exercise

Write `log`, apply it to `Calculator.add`, and preserve addition. The supplied call must log `add method called`. The solution applies the legacy decorator explicitly so the exercise behaves consistently in TypeScript-aware runtimes that implement the newer decorator proposal.

### Test contract

Export `log` and `Calculator`. The decorator must log the method name and preserve `add` arguments and return values.

> Adapted from upstream `Decorators.md`; stale `Decorators2.md`/`Decorators3.md` are excluded. See `CORRECTIONS.md`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
