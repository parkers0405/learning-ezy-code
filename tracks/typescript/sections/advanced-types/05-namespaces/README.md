# Namespaces

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Namespaces](../../../textbook/advanced-types/05-namespaces.md)

Namespaces group declarations under one name. Members must be exported to be visible outside. They predate standard JavaScript modules and remain useful mainly for ambient declarations and non-module code; prefer ES modules for new applications.

## Exercise

Complete rectangle and circle area functions inside `Geometry`.

### Test contract

Export namespace `Geometry` with both area functions. Tests cover each shape and zero dimensions.

> Adapted from upstream `Namespaces.md`; see the root `NOTICE`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
