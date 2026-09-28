# Mixins

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Mixins](../../../textbook/advanced-types/04-mixins.md)

Mixins compose reusable behavior without deep inheritance. A classic TypeScript pattern declares that a target class implements mixin instance members, then copies methods from each mixin prototype.

## Exercise

Complete `applyMixins` so it copies each non-constructor prototype descriptor from `Logger` onto `LoggedActivatable`. The supplied activation overrides call their base implementation and then invoke the mixed-in logger.

### Test contract

Export `applyMixins`, `Logger`, `Activatable`, and `LoggedActivatable`. The copied `log` method must be the same function as `Logger.prototype.log`, without making instances inherit from `Logger`. Activation state must change and each operation must emit its matching log message through that mixed-in behavior.

> Adapted from upstream `Mixins.md`; extraction defects are documented in `CORRECTIONS.md`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
