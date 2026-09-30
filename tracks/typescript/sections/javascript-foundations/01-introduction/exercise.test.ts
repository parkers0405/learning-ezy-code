import { describe, expect, it } from "vitest";
import { message } from "@exercise";

describe("introductory message", () => {
  it("contains the requested greeting", () => {
    expect(message).toBe("Hello World");
  });
});
