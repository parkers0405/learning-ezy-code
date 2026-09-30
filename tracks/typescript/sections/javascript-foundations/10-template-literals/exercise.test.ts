import { describe, expect, it } from "vitest";
import { summary } from "@exercise";
describe("template interpolation", () => {
  it("places values inside text", () => {
    expect(summary).toBe("Ada completed 3 lessons.");
  });
});
