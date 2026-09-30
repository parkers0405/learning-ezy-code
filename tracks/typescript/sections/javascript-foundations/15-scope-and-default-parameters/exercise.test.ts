import { describe, expect, it } from "vitest";
import { greet } from "@exercise";
describe("scope and defaults", () => {
  it("returns default and explicit greetings", () => {
    expect(greet("Ada")).toBe("Hello, Ada!");
    expect(greet("Ada", "Welcome")).toBe("Welcome, Ada!");
  });
});
