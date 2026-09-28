import { describe, expect, it } from "vitest";
import { Geometry } from "@exercise";

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
