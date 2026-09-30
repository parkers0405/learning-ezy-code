import { describe, expect, it } from "vitest";
import { isExactlyTwentyOne, isWarm } from "@exercise";
describe("comparisons", () => {
  it("produce booleans", () => {
    expect(isWarm).toBe(true);
    expect(isExactlyTwentyOne).toBe(true);
  });
});
