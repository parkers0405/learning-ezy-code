# Mixins

**Required reading:** [Mixins](../../../textbook/advanced-types/04-mixins.md)

## Behavioral contract

The `log` descriptor on `LoggedActivatable.prototype` has the same function value as `Logger.prototype.log`, but `LoggedActivatable` instances are not `Logger` instances. Activation and deactivation update `active` and log `"Activating..."` or `"Deactivating..."`; `log` accepts text, not numbers.

## Practice instruction

Implement `applyMixins` by visiting each base prototype's own property names, skipping `constructor`, and copying each complete property descriptor with `Object.defineProperty`. Preserve the supplied class overrides.

## Attribution

> Adapted from upstream `Mixins.md`; extraction defects are documented in `CORRECTIONS.md`.
