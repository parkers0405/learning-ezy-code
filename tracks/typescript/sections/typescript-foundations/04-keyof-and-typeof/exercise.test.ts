import { describe, expect, it } from "vitest";
import { updateProperty } from "@exercise";

const typedProfile = { name: "Ada", age: 36 };
updateProperty(typedProfile, "name", "Grace");
updateProperty(typedProfile, "age", 37);
// @ts-expect-error A key must exist on the selected object type.
updateProperty(typedProfile, "missing", true);
// @ts-expect-error The value must match the type at the selected key.
updateProperty(typedProfile, "age", "thirty-seven");

describe("updateProperty", () => {
  it("updates a string property", () =>
    expect(updateProperty({ name: "Alice", age: 28 }, "name", "Bob")).toEqual({
      name: "Bob",
      age: 28,
    }));
  it("updates a numeric property", () =>
    expect(updateProperty({ name: "Alice", age: 28 }, "age", 29)).toEqual({
      name: "Alice",
      age: 29,
    }));
  it("returns the same updated object", () => {
    const user = { active: false };
    expect(updateProperty(user, "active", true)).toBe(user);
  });
});
