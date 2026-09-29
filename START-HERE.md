# Start Here

1. Install Node.js 20 or later, enable Corepack, and run `corepack yarn install` at the repository root. Installation is the only package-fetching step; readings and exercise workflows are local afterward.
2. Run `corepack yarn languages`, then `corepack yarn language use typescript`.
3. Run `corepack yarn roadmap`. The arrow marks the first incomplete or stale chapter and lists its required readings.
4. Run `corepack yarn read` (or `corepack yarn read --print`), then `corepack yarn chapter 1`. The chapter command selects the exercise and prints its directory.
5. `cd` into the printed exercise directory. Edit only the learner files described by its contract, then run `corepack yarn typecheck` and `corepack yarn test` from that directory.
6. Run `corepack yarn submit` from the exercise directory after tests pass. Sequential completion unlocks the next chapter. Return to the repository root whenever you want to run `corepack yarn roadmap` or select another language.

The CLI records pass evidence, not reading behavior. It shows required readings but never claims that you read them. Reference solutions are local and printable with `yarn solution`; compare only after making a serious attempt.

If a previously passed chapter is marked **stale**, learner source, visible tests, or its README contract changed. Re-run and resubmit it. State for one language never unlocks another language.
