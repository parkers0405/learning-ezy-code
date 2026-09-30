import { describe, expect, expectTypeOf, it } from "vitest";
import { computeArea, type Rectangle } from "@exercise";

// @ts-expect-error Rectangle width must be numeric.
const invalidRectangle: Rectangle = { width: "wide", height: 2 };
void invalidRectangle;

describe("Rectangle alias and area", () => {
  it("has numeric width and height", () =>
    expectTypeOf<Rectangle>().toEqualTypeOf<{
      width: number;
      height: number;
    }>());
  it("computes a rectangle area", () =>
    expect(computeArea({ width: 10, height: 5 })).toBe(50));
  it("handles a zero dimension", () =>
    expect(computeArea({ width: 0, height: 8 })).toBe(0));
});
