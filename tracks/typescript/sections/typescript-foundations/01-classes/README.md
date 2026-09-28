# Classes

**Prerequisites:** Complete Part 0. **Required reading:** [Classes](../../../textbook/typescript-foundations/01-classes.md)

Classes combine state and behavior. A constructor initializes instances. Members may be `public` (default), `protected`, or `private`; `readonly` prevents later reassignment. A subclass uses `extends`, calls `super(...)`, and may override inherited methods.

## Exercise

Extend `Animal` with `Dog` and override `speak` so Rex returns `Rex barks`.

### Test contract

Export `Animal` and subclass `Dog`. Override `Dog.speak()` to return `<name> barks` for every dog while preserving inheritance.

> Adapted and reformatted from upstream `Classes.md`; see the root `NOTICE`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
