import { describe, expect, expectTypeOf, it } from "vitest";
import { describeCar, type Car } from "@exercise";

// @ts-expect-error Car year must be numeric.
const invalidCar: Car = { model: "Roadster", year: "2020" };
void invalidCar;

describe("Car interface", () => {
  it("requires a string model and numeric year", () => {
    expectTypeOf<Car>().toEqualTypeOf<{ model: string; year: number }>();
  });
  it("describes a Tesla", () =>
    expect(describeCar({ model: "Tesla", year: 2022 })).toBe("Tesla (2022)"));
  it("works for another conforming object", () =>
    expect(describeCar({ model: "Civic", year: 1999 })).toBe("Civic (1999)"));
});
