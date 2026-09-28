import { describe, expect, expectTypeOf, it } from "vitest";
import { count, isActive, items } from "@exercise";

describe("typed variable declarations", () => {
  it("uses the requested number value", () => {
    expectTypeOf(count).toBeNumber();
    expect(count).toBe(5);
  });
  it("uses the requested boolean value", () => {
    expectTypeOf(isActive).toBeBoolean();
    expect(isActive).toBe(true);
  });
  it("uses an array containing the requested number", () => {
    expectTypeOf(items).toEqualTypeOf<number[]>();
    expect(items).toEqual([10]);
  });
});
