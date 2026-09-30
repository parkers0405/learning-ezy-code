import { describe, expect, it } from "vitest";
import { double } from "@exercise";
describe("an arrow function value", () => {
  it("doubles its argument", () => {
    expect(double(3)).toBe(6);
    expect(double(-2)).toBe(-4);
  });
});
