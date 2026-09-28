import { describe, expect, it } from "vitest";
import { firstDefined } from "@exercise";

describe("firstDefined", () => {
  it("falls through null and undefined", () =>
    expect(firstDefined(null, undefined, 7)).toBe(7));
  it("returns the first present value", () =>
    expect(firstDefined(3, 4, 5)).toBe(3));
  it("does not treat zero as missing", () =>
    expect(firstDefined(0, 4, 5)).toBe(0));
});
