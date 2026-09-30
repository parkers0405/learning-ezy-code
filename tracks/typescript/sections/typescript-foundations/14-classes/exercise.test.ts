import { describe, expect, expectTypeOf, it } from "vitest";
import { Counter } from "@exercise";

// @ts-expect-error Counter constructor requires a number.
const invalidCounter = new Counter("two");
void invalidCounter;
describe("a basic class", () => {
  it("constructs instances and uses this", () => {
    const counter = new Counter(2);
    expectTypeOf(counter).toEqualTypeOf<Counter>();
    expect(counter.increment()).toBe(3);
    expect(counter.increment()).toBe(4);
    expect(new Counter(10).increment()).toBe(11);
  });
});
