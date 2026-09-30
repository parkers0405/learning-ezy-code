import { describe, expect, it } from "vitest";
import { Circle, Rectangle, Shape } from "@exercise";

// @ts-expect-error An abstract class cannot be instantiated directly.
const abstractShape = new Shape();
void abstractShape;

describe("concrete Shape subclasses", () => {
  it("Circle extends Shape and calculates area", () => {
    const circle = new Circle(5);
    expect(circle).toBeInstanceOf(Shape);
    expect(circle.area()).toBeCloseTo(25 * Math.PI);
  });
  it("Rectangle extends Shape and calculates area", () => {
    const rectangle = new Rectangle(4, 7);
    expect(rectangle).toBeInstanceOf(Shape);
    expect(rectangle.area()).toBe(28);
  });
  it("handles zero-sized concrete shapes", () => {
    expect(new Circle(0).area()).toBe(0);
    expect(new Rectangle(0, 8).area()).toBe(0);
  });
});
