# Start Here

1. Install Node.js 20 or later, enable Corepack, and run `corepack yarn install` at the repository root. Installation is the only package-fetching step; readings and exercise workflows are local afterward.
2. Run `./ezy install` once. It creates `~/.local/bin/ezy` and refuses to replace an unrelated command. If `~/.local/bin` is not on `PATH`, the installer tells you to add it.
3. Run `ezy use typescript`, then `ezy start 1`. The start command selects the exercise and prints its reading, exercise, and learner-file paths.
4. Run `ezy read` (or `ezy read --print`) and edit the printed `starter.ts` in your IDE.
5. Run `ezy test`, then `ezy submit`. Sequential completion unlocks the next chapter; use `ezy start` to resume it and `ezy status` to see the full roadmap.

After a successful submission, the CLI prints the next chapter and selects it automatically. The normal loop is therefore `ezy read`, edit, `ezy test`, `ezy submit`, and `ezy start`.

The CLI works from any directory and records pass evidence, not reading behavior. It shows required readings but never claims that you read them. Reference solutions are local and printable with `ezy solution`; compare only after making a serious attempt. Direct chapter-local Yarn scripts remain available but are optional.

If a previously passed chapter is marked **stale**, learner source, visible tests, or its README contract changed. Re-run and resubmit it. State for one language never unlocks another language.
