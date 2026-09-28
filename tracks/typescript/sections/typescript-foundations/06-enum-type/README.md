# Enum Type

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [Enum Type](../../../textbook/typescript-foundations/06-enum-type.md)

An enum gives names to a closed set of numeric or string values. Numeric members auto-increment from zero unless initialized; string enums require explicit values. Unlike most TypeScript types, enums emit JavaScript. Literal unions are often a lighter alternative.

## Exercise

Create `Days` and implement `classifyDay`, returning `Weekend` for Saturday/Sunday and `Weekday` otherwise.

### Test contract

Export a seven-member `Days` enum and `classifyDay(day)`. Both weekend members and representative weekdays are tested.

> Adapted from upstream `Enum Type.md`; stale `Enums*.md` duplicates were excluded. See `SOURCE_MANIFEST.md`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
