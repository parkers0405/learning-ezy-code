import { describe, expect, it, vi } from "vitest";
import { LoggedActivatable, Logger } from "@exercise";

// @ts-expect-error The mixed-in log method cannot accept a numeric callback contract.
const invalidLog: (message: number) => void = new LoggedActivatable().log;
void invalidLog;

describe("LoggedActivatable mixin", () => {
  it("exposes the Logger method function without Logger inheritance", () => {
    const mixedLog = Object.getOwnPropertyDescriptor(
      LoggedActivatable.prototype,
      "log",
    );
    const sourceLog = Object.getOwnPropertyDescriptor(Logger.prototype, "log");
    expect(mixedLog?.value).toBe(sourceLog?.value);
    expect(new LoggedActivatable()).not.toBeInstanceOf(Logger);
  });

  it("activates and logs", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const item = new LoggedActivatable();
    item.activate();
    expect(item.active).toBe(true);
    expect(log).toHaveBeenCalledWith("Activating...");
  });
  it("deactivates and logs", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const item = new LoggedActivatable();
    item.activate();
    log.mockClear();
    item.deactivate();
    expect(item.active).toBe(false);
    expect(log).toHaveBeenCalledWith("Deactivating...");
  });
});
