import { describe, expect, it } from "vitest";
import { points, remainder } from "@exercise";
describe("arithmetic", () => {
  it("produces the grouped total and remainder", () => {
    expect(points).toBe(20);
    expect(remainder).toBe(1);
  });
});
