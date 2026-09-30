import { describe, expect, it } from "vitest";
import { score } from "@exercise";
describe("reassignment", () => {
  it("updates a binding", () => {
    expect(score).toBe(5);
  });
});
