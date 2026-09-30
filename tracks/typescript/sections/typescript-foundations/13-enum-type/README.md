# Enum type

**Required reading:** [Enum Type](../../../textbook/typescript-foundations/13-enum-type.md)

## Behavioral contract

Export the seven-member `Days` enum and `classifyDay(day: Days): string`. Sunday and Saturday return `"Weekend"`; tested weekdays return `"Weekday"`; raw strings are rejected.

## Practice instruction

Use an explicit `if` that compares `day` with `Days.Sunday` and `Days.Saturday`, then return the weekday result after the branch. Do not use a ternary or compare raw numbers/strings.

## Attribution

> Adapted from upstream `Enum Type.md`; stale `Enums*.md` duplicates were excluded. See `SOURCE_MANIFEST.md`.
