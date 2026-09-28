import { describe, expect, it } from "vitest";
import { Animal, Dog } from "@exercise";

describe("Dog inheritance", () => {
  it("is an Animal", () => expect(new Dog("Rex")).toBeInstanceOf(Animal));
  it("overrides speak for Rex", () =>
    expect(new Dog("Rex").speak()).toBe("Rex barks"));
  it("uses each dog's name", () =>
    expect(new Dog("Luna").speak()).toBe("Luna barks"));
});
