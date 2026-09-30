import { describe, expectTypeOf, it } from "vitest";
import type { IsString } from "@exercise";

// @ts-expect-error The conditional result never includes "Maybe".
const invalidConditional: IsString<string> = "Maybe";
void invalidConditional;

describe("IsString conditional type", () => {
  it("maps string to Yes", () =>
    expectTypeOf<IsString<string>>().toEqualTypeOf<"Yes">());
  it("maps number to No", () =>
    expectTypeOf<IsString<number>>().toEqualTypeOf<"No">());
  it("distributes over a union", () =>
    expectTypeOf<IsString<string | boolean>>().toEqualTypeOf<"Yes" | "No">());
});
