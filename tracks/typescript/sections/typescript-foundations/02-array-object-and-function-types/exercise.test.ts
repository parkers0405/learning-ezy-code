import { describe, expect, expectTypeOf, it } from "vitest";
import { add, learner, scores } from "@exercise";

// @ts-expect-error A number array rejects a string element.
const invalidScores: typeof scores = ["one"];
void invalidScores;
describe("composite types", () => {
  it("types arrays, objects, and functions", () => {
    expectTypeOf(scores).toEqualTypeOf<number[]>();
    expectTypeOf(learner).toMatchTypeOf<{ name: string; completed: number }>();
    expectTypeOf(add).toEqualTypeOf<(left: number, right: number) => number>();
    expect(scores).toEqual([1, 2]);
    expect(learner).toEqual({ name: "Ada", completed: 2 });
    expect(add(2, 3)).toBe(5);
  });
});
