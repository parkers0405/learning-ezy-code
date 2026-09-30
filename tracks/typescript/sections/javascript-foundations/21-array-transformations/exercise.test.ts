import { describe, expect, it } from "vitest";
import { doubled, evenValues, firstLargeValue } from "@exercise";
describe("array transformations", () => {
  it("exports the three requested array results", () => {
    expect(doubled).toEqual([2, 4, 6, 8]);
    expect(evenValues).toEqual([2, 4]);
    expect(firstLargeValue).toBe(3);
  });
});
