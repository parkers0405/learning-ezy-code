import { describe, expect, it } from "vitest";
import { add } from "@exercise";
describe("modules", () => {
  it("exports a function from another file", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });
});
