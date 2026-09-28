# `keyof` and `typeof` Operators

**Prerequisites:** Complete preceding roadmap entries. **Required reading:** [`keyof` and `typeof`](../../../textbook/typescript-foundations/04-keyof-and-typeof.md)

For an object type `T`, `keyof T` produces a union of its property keys. In a type position, `typeof value` obtains a value's inferred type. Together they connect runtime declarations to safe reusable types.

```ts
const settings = { dark: true, size: 16 };
type Settings = typeof settings;
type SettingName = keyof Settings; // "dark" | "size"
```

## Exercise

Implement `updateProperty` so it updates the selected key. The value must have that key's property type.

### Test contract

Export generic `updateProperty(obj, key, value)`. The key and value types must stay linked, and the same mutated object must be returned.

> Adapted from upstream `keyof and typeof Operators.md`; see `NOTICE` and `CORRECTIONS.md`.

Run `corepack yarn test`, `corepack yarn typecheck`, `corepack yarn submit`, or `corepack yarn solution` here.
