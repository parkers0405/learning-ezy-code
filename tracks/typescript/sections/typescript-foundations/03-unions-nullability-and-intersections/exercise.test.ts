import { describe, expect, expectTypeOf, it } from "vitest";
import { learner, selectedId } from "@exercise";

// @ts-expect-error Boolean is outside the required ID union.
const invalidId: string | number | null = true;
void invalidId;

describe("unions, nullability, and intersections", () => {
  it("accepts alternatives and combines object requirements", () => {
    expectTypeOf(selectedId).toEqualTypeOf<string | number | null>();
    expectTypeOf(learner).toMatchTypeOf<{ name: string; active: boolean }>();
    expect(selectedId).toBe(42);
    expect(learner).toEqual({ name: "Ada", active: true });
  });
});
