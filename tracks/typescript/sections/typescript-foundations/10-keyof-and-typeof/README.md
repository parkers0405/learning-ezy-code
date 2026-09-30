# `keyof` and `typeof`

**Required reading:** [`keyof` and `typeof`](../../../textbook/typescript-foundations/10-keyof-and-typeof.md)

## Behavioral contract

`LearnerKey` is exactly `"name" | "lessons"`; `readLearner` accepts those keys, returns `"Ada"` or `2`, and rejects `"missing"`.

## Practice instruction

Keep `Learner = typeof learner` and `LearnerKey = keyof Learner`, then index the object with the checked `key`. Do not duplicate the key union by hand.
