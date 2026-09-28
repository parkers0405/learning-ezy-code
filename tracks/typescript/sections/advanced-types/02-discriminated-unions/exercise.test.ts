import { describe, expect, it } from "vitest";
import { calculateArea } from "@exercise";

describe("calculateArea", () => {
  it("calculates a circle", () =>
    expect(calculateArea({ kind: "circle", radius: 2 })).toBeCloseTo(
      4 * Math.PI,
    ));
  it("calculates a square", () =>
    expect(calculateArea({ kind: "square", sideLength: 3 })).toBe(9));
  it("handles zero-sized shapes", () => {
    expect(calculateArea({ kind: "circle", radius: 0 })).toBe(0);
    expect(calculateArea({ kind: "square", sideLength: 0 })).toBe(0);
  });
});
