import { describe, expect, it } from "vitest";
import { getValueFromDict, type MyDictionary } from "@exercise";

describe("dictionary index access", () => {
  const dictionary: MyDictionary = { name: "Alice", age: 30 };
  it("gets a string value", () =>
    expect(getValueFromDict("name", dictionary)).toBe("Alice"));
  it("gets a numeric value", () =>
    expect(getValueFromDict("age", dictionary)).toBe(30));
  it("returns undefined for a missing key", () =>
    expect(getValueFromDict("missing", dictionary)).toBeUndefined());
});
