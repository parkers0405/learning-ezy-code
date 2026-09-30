import { describe, expect, expectTypeOf, it } from "vitest";
import { Geometry } from "@exercise";

// @ts-expect-error Geometry dimensions must be numbers.
const invalidArea = Geometry.areaOfRectangle("wide", 2);
void invalidArea;
// @ts-expect-error Circle radius must be numeric.
const invalidCircle = Geometry.areaOfCircle("wide");
void invalidCircle;
expectTypeOf(Geometry.areaOfRectangle).toEqualTypeOf<
  (width: number, height: number) => number
>();
expectTypeOf(Geometry.areaOfCircle).toEqualTypeOf<(radius: number) => number>();

describe("Geometry namespace", () => {
  it("exports rectangle area", () =>
    expect(Geometry.areaOfRectangle(10, 5)).toBe(50));
  it("exports circle area", () =>
    expect(Geometry.areaOfCircle(7)).toBeCloseTo(Math.PI * 49));
  it("handles a zero dimension", () => {
    expect(Geometry.areaOfRectangle(0, 5)).toBe(0);
    expect(Geometry.areaOfCircle(0)).toBe(0);
  });
});
