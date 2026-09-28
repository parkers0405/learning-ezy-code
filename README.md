# Learning Ezy Code

**Learning Ezy Code** is an offline-first, IDE-first learning monorepo. The root selects a language track and orchestrates trusted track adapters; each track owns its textbook, exercise contracts, tests, and native toolchain integration. The future public home is [github.com/parkers0405/learning-ezy-code](https://github.com/parkers0405/learning-ezy-code).

The fully implemented track is **TypeScript**: 32 sequential chapters from JavaScript runtime foundations through advanced TypeScript. Rust is intentionally not represented by placeholder lessons; [Adding a Language](ADDING_A_LANGUAGE.md) explains the concrete Cargo adapter path.

## Start

```sh
corepack yarn install
corepack yarn languages
corepack yarn language use typescript
corepack yarn roadmap
corepack yarn read 1
corepack yarn chapter 1
```

Then open the selected exercise directory and edit `starter.ts`. Its visible `exercise.test.ts` is the behavioral contract.

## Root commands

- `yarn languages` — list discovered language manifests.
- `yarn language show` / `yarn language use <id>` — inspect or select a track.
- `yarn chapters` — list the active track's manifest-defined chapters.
- `yarn roadmap` — show sequential status and the current exercise's reading paths.
- `yarn read [chapter]` — show required offline readings; add `--print` to print them.
- `yarn test [chapter]`, `yarn submit [chapter]`, and `yarn solution [chapter]` — work on one exercise.
- Add `--language <id>` to explicitly target a track without changing the active selection.
- `yarn validate` — run formatting, tooling, manifest, starter, strict type, and solution checks.

## Textbooks and exercises

Canonical prose lives once inside each track's `textbook/` directory. The [TypeScript textbook](tracks/typescript/textbook/README.md) is ordered for independent end-to-end reading and remains available offline. Exercise READMEs stay concise: prerequisites, portable reading links, contract, commands, and test expectations. A manifest's `readings` arrays may attach multiple readings to an exercise or reuse one reading without copying prose. Reading order is enforced within each exercise; reuse may be non-monotonic across exercises, and every canonical reading must be used.

## Progress and trust

Progress is stored in the untracked, versioned `.learn-code/state.json`, isolated by language and stable chapter ID. Every mutation takes a bounded lock, reloads current state while locked, and durably replaces the file through an fsynced temporary file and rename, so concurrent commands do not lose completions. Lock metadata records a unique token, PID, host, and creation time; a heartbeat protects long live transactions, same-host process liveness prevents age-only reclamation, and every write and release rechecks ownership. Invalid entries are diagnosed while structurally valid entries are salvaged; before a transaction replaces corrupt state, the original is retained as `state.corrupt-*.json`. Confirmed stale abandoned locks are recovered. Legacy `.learn-ts/progress.json` and `.current-chapter` state is validated and migrated under the same transaction protocol when present, while the legacy files remain intact. A completion fingerprint includes adapter-defined learner sources, visible tests, and exercise contracts, so changed work or changed expectations become stale.

Manifests are declarative data. They name a trusted adapter registered in repository code; they can never provide arbitrary shell commands. Adapters return a shared normalized success, learner-failure, or infrastructure-failure result, and execute argument arrays through bounded process infrastructure rather than shell strings. A future Rust adapter can invoke Cargo without making Rust crates Yarn workspaces.

See [Start Here](START-HERE.md), [Curriculum](CURRICULUM.md), [source provenance](SOURCE_MANIFEST.md), and [license/source notes](SOURCES_AND_LICENSES.md).
