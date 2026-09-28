import { describe, expect, it } from "vitest";
import { add, divide } from "@exercise";

describe("exported add function", () => {
  it("adds positive values imported from the module", () =>
    expect(add(2, 3)).toBe(5));
  it("adds negative values", () => expect(add(-4, -6)).toBe(-10));
  it("handles zero", () => expect(add(9, 0)).toBe(9));
});

describe("explicit module failure behavior", () => {
  it("divides ordinary values", () => expect(divide(9, 3)).toBe(3));
  it("throws a precise error for a zero divisor", () => {
    expect(() => divide(5, 0)).toThrowError(new RangeError("division by zero"));
  });
});
