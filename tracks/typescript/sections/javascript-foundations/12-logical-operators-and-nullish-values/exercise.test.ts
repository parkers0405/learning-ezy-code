import { describe, expect, it } from "vitest";
import { emptyDisplay, mayEnter, missingDisplay } from "@exercise";

describe("logical and nullish operators", () => {
  it("requires both permissions", () => {
    expect(mayEnter).toBe(true);
  });
  it("replaces undefined but preserves an empty string", () => {
    expect(missingDisplay).toBe("Guest");
    expect(emptyDisplay).toBe("");
  });
});
