import { describe, expect, it } from "vitest";
import { result } from "@exercise";
describe("runtime feedback", () => {
  it("has the requested value", () => {
    expect(result).toBe("ready");
  });
});
