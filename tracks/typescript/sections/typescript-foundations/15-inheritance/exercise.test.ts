import { describe, expect, expectTypeOf, it } from "vitest";
import { Animal, Dog } from "@exercise";

// @ts-expect-error Dog name must be text.
const invalidDog = new Dog(42);
void invalidDog;
describe("inheritance", () => {
  it("constructs a subtype and overrides behavior", () => {
    const dog = new Dog("Pip");
    expectTypeOf(dog).toMatchTypeOf<Animal>();
    expect(dog.speak()).toBe("Pip barks");
  });
});
