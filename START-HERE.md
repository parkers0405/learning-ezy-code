# Start Here

1. Install Node.js 20 or later, enable Corepack, and run `corepack yarn install` at the repository root. Installation is the only package-fetching step; readings and exercise workflows are local afterward.
2. Run `corepack yarn languages`, then `corepack yarn language use typescript`.
3. Run `corepack yarn roadmap`. The arrow marks the first incomplete or stale chapter and lists its required readings.
4. Run `corepack yarn read` (or `corepack yarn read --print`) and open the linked exercise README.
5. Edit only the learner files described by the contract. Run the chapter's `corepack yarn typecheck` and `corepack yarn test` commands.
6. Run `corepack yarn submit` after tests pass. Sequential completion unlocks the next chapter.

The CLI records pass evidence, not reading behavior. It shows required readings but never claims that you read them. Reference solutions are local and printable with `yarn solution`; compare only after making a serious attempt.

If a previously passed chapter is marked **stale**, learner source, visible tests, or its README contract changed. Re-run and resubmit it. State for one language never unlocks another language.
