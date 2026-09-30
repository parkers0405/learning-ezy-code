import { describe, expect, expectTypeOf, it } from "vitest";
import { booleanValue, numberValue, textValue } from "@exercise";
describe("primitive literals", () => {
  it("exports the requested primitive values and types", () => {
    expectTypeOf(textValue).toBeString();
    expectTypeOf(numberValue).toBeNumber();
    expectTypeOf(booleanValue).toBeBoolean();
    expect(textValue).toBe("hello");
    expect(numberValue).toBe(4);
    expect(booleanValue).toBe(true);
  });
});
