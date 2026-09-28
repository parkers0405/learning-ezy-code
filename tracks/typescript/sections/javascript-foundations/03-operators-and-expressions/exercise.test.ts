import { describe, expect, it } from "vitest";
import { calculateExpression } from "@exercise";

describe("calculateExpression", () => {
  it("groups addition before multiplication", () =>
    expect(calculateExpression(5, 7)).toBe(36));
  it("works with zero", () => expect(calculateExpression(0, 4)).toBe(12));
  it("works with negative operands", () =>
    expect(calculateExpression(-2, -3)).toBe(-15));
});
