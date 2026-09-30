import { describe, expect, it } from "vitest";
import { result } from "@exercise";
describe("an expression inside a declaration statement", () => {
  it("exports the ready value", () => {
    expect(result).toBe("ready");
  });
});
