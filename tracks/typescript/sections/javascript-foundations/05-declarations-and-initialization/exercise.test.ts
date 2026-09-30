import { describe, expect, it } from "vitest";
import { course, lesson } from "@exercise";
describe("initialized bindings", () => {
  it("stores initial values", () => {
    expect(course).toBe("JavaScript");
    expect(lesson).toBe(5);
  });
});
