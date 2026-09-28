import { describe, expect, it } from "vitest";
import { classifyDay, Days } from "@exercise";

describe("classifyDay", () => {
  it.each([Days.Sunday, Days.Saturday])(
    "classifies weekend enum member %s",
    (day) => expect(classifyDay(day)).toBe("Weekend"),
  );
  it.each([Days.Monday, Days.Wednesday, Days.Friday])(
    "classifies weekday enum member %s",
    (day) => expect(classifyDay(day)).toBe("Weekday"),
  );
});
