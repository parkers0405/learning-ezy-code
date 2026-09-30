import { describe, expect, it } from "vitest";
import { firstLanguage, languages } from "@exercise";
describe("arrays", () => {
  it("appends and reads by index", () => {
    expect(languages).toEqual(["JavaScript", "TypeScript"]);
    expect(firstLanguage).toBe("JavaScript");
  });
});
