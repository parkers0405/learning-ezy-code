import { describe, expect, it } from "vitest";
import { calculateArea } from "@exercise";
import type { Circle, Shape, Square } from "@exercise";

const typedCircle: Circle = { kind: "circle", radius: 1 };
const typedSquare: Square = { kind: "square", sideLength: 1 };
const typedShapes: Shape[] = [typedCircle, typedSquare];
void typedShapes;

// @ts-expect-error The square branch requires sideLength, not radius.
const invalidShape = calculateArea({ kind: "square", radius: 2 });
void invalidShape;

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
