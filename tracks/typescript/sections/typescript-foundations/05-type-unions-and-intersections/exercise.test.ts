import { describe, expect, expectTypeOf, it } from "vitest";
import { identifyVehicle, type Vehicle } from "@exercise";

describe("Vehicle union", () => {
  it("accepts the car branch", () =>
    expect(identifyVehicle({ type: "car", doors: 4 })).toBe("car"));
  it("accepts the bike branch", () =>
    expect(identifyVehicle({ type: "bike", hasBell: true })).toBe("bike"));
  it("contains both object variants", () =>
    expectTypeOf<Vehicle>().toEqualTypeOf<
      { type: "car"; doors: number } | { type: "bike"; hasBell: boolean }
    >());
});
