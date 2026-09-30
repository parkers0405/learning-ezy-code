# Start Here

Your **editor** changes files; your **terminal** runs commands. A terminal's **current directory** is the folder its commands act on. This course is a **repository**, TypeScript is a **track**, and each lesson/exercise is a **chapter**. Type commands such as `ezy test` in the terminal and TypeScript code in `starter.ts` in your editor.

1. Install Node.js 20 or later, enable Corepack, and run `corepack yarn install` at the repository root. Installation is the only package-fetching step; readings and exercise workflows are local afterward.
2. Run `./ezy install --shell` once. It creates `~/.local/bin/ezy`, refuses to replace an unrelated command, and adds a marked Bash/Zsh integration block. Source the shell file printed by the installer or open a new terminal.
3. Run `ezy use typescript`, then `ezy start 1`. The start command selects the exercise, prints its reading and learner-file paths, and changes your current shell into the exercise directory.
4. Run `ezy read` (or `ezy read --print`) and edit the printed `starter.ts` in your IDE.
5. Run `ezy test`, then `ezy submit`. Sequential completion unlocks the next chapter; use `ezy start` to resume it and `ezy status` to see the full roadmap.

After a successful submission, the CLI prints the next chapter and selects it automatically. The normal loop is therefore `ezy read`, edit, `ezy test`, `ezy submit`, and `ezy start`.

The CLI works from any directory and records pass evidence, not reading behavior. It shows required readings but never claims that you read them. Reference solutions are local and printable with `ezy solution`; compare only after making a serious attempt. Direct chapter-local Yarn scripts remain available but are optional.

If a previously passed chapter is marked **stale**, learner source, visible tests, or its README contract changed. Re-run and resubmit it. State for one language never unlocks another language.
