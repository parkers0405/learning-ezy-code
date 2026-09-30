import { describe, expect, it } from "vitest";
import { highResult, lowResult, middleResult } from "@exercise";

describe("if / else if / else branches", () => {
  it("runs the final else branch", () => expect(lowResult).toBe("retry"));
  it("runs the middle branch", () => expect(middleResult).toBe("pass"));
  it("runs the first branch", () => expect(highResult).toBe("excellent"));
});
