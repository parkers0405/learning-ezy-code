import { describe, expect, it } from "vitest";
import { message } from "@exercise";

describe("introductory message", () => {
  it("contains the requested Hello World greeting", () => {
    expect(message).toBe("Hello World");
  });
});
