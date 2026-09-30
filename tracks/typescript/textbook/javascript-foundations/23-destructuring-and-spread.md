# Destructuring and Spread

## Goal

Read selected object properties with destructuring, then make a shallow updated copy with object spread.

## Prerequisite recap

Object literals group named properties. Property access reads one property. Separate object literals create objects with separate identities.

## Terms introduced

**Object destructuring** binds property values to names with an object-shaped pattern. **Spread** inside an object literal copies enumerable own properties into a new object. A **shallow copy** creates a new outer object but reuses any nested object values.

## Step-by-step mental model

The names inside the destructuring braces identify properties to read:

```ts
const profile = { name: "Ada", level: 1 };
const { name, level } = profile;
```

Now `name` is `"Ada"` and `level` is `1`. This does not change `profile`.

Spread copies properties into a new object. Later properties with the same name replace earlier ones:

```ts
const promoted = { ...profile, level: 2 };
```

`promoted` has name `"Ada"` and level `2`; `profile.level` remains `1`. The two outer objects have different identities. If a property held another object, both shallow copies would initially point to that same nested object.

## Common mistakes

- Treating the braces in destructuring as a new object literal.
- Expecting spread to modify the source object.
- Placing an override before `...profile`, allowing the copied old value to replace it.
- Calling a shallow copy a recursive copy of all nested data.

## DSA relevance

Destructuring names the fields an algorithm needs. Shallow copying supports non-mutating state updates while making its limits explicit.

## Self-check

1. What values do `{ name, level }` bind? 2. Which object does spread create? 3. Why does property order matter?

## Exercise preparation

At top level, destructure `name` and `score`, then spread the source into a new object whose score is one higher. Tests verify values and distinct outer identity; syntax use is a practice instruction.

## Authoritative references

- [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN: Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
