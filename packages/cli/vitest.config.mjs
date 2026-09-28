import { defineConfig } from "vitest/config";

const exercise = process.env.LEARN_TS_EXERCISE;
if (!exercise)
  throw new Error("LEARN_TS_EXERCISE must identify starter.ts or solution.ts");

export default defineConfig({
  resolve: {
    alias: {
      "@exercise": exercise,
    },
  },
  test: {
    clearMocks: true,
    environment: "node",
    globals: false,
    passWithNoTests: false,
    reporters: ["verbose"],
  },
});
