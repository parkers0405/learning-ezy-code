import { describe, expect, it } from "vitest";
import { greet } from "@exercise";
describe("function calls", () => {
  it("returns the greeting for varied names", () => {
    expect(greet("Ada")).toBe("Hello, Ada!");
    expect(greet("Lin")).toBe("Hello, Lin!");
  });
});
