# Set and Unique Values

## Goal

Store unique values and add one item.

## Prerequisite recap

Arrays store ordered values and objects have identity.

## Terms introduced

A **Set** is a built-in collection of unique values. `.add` inserts a value; duplicate additions do nothing. `new Set(values)` is supplied construction syntax: `new` asks JavaScript to construct this built-in collection. User-defined classes come later.

## Step-by-step mental model

Construct from repeated input, so duplicates collapse. Add one new color. Iterate or spread only when an array is needed.

```ts
const colors = new Set(repeated); // supplied construction
colors.add("green");
```

## Common mistakes

- Expecting numeric indexing. - Writing a clever one-line conversion when named steps are clearer.

## DSA relevance

Sets provide fast membership checks and visited-node tracking.

## Self-check

1. Are duplicates retained? 2. What does `.add` do?

## Exercise preparation

Keep construction supplied and add one value.

## Authoritative references

- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
