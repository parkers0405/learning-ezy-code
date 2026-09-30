import { describe, expect, expectTypeOf, it } from "vitest";
import { visibleResult } from "@exercise";
describe("visible Vitest syntax", () => {
  it("checks type and value", () => {
    expectTypeOf(visibleResult).toBeNumber();
    expect(visibleResult).toBe(3);
  });
});
