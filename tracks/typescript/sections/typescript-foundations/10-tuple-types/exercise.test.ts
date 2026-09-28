import { describe, expect, expectTypeOf, it } from "vitest";
import { displayTuple } from "@exercise";

describe("displayTuple", () => {
  it("formats the tutorial tuple", () =>
    expect(displayTuple(["Age", 30])).toBe("The value for Age is 30."));
  it("formats another label and number", () =>
    expect(displayTuple(["Score", 0])).toBe("The value for Score is 0."));
  it("requires a string-number tuple", () =>
    expectTypeOf(displayTuple).parameter(0).toEqualTypeOf<[string, number]>());
});
