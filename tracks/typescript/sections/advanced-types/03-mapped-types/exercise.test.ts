import { describe, expectTypeOf, it } from "vitest";
import type { NullablePoint } from "@exercise";

describe("NullablePoint mapped type", () => {
  it("allows null for x", () =>
    expectTypeOf<{ x: null; y: number }>().toMatchTypeOf<NullablePoint>());
  it("allows null for y", () =>
    expectTypeOf<{ x: number; y: null }>().toMatchTypeOf<NullablePoint>());
  it("preserves both Point keys", () =>
    expectTypeOf<keyof NullablePoint>().toEqualTypeOf<"x" | "y">());
});
