# Learning Ezy Code

**Learning Ezy Code** is an offline-first, IDE-first learning monorepo. The root selects a language track and orchestrates trusted track adapters; each track owns its textbook, exercise contracts, tests, and native toolchain integration. The project is maintained at [github.com/parkers0405/learning-ezy-code](https://github.com/parkers0405/learning-ezy-code).

The fully implemented track is **TypeScript**: 32 sequential chapters from JavaScript runtime foundations through advanced TypeScript. Rust is intentionally not represented by placeholder lessons; [Adding a Language](ADDING_A_LANGUAGE.md) explains the concrete Cargo adapter path.

## Start

```sh
corepack yarn install
./ezy install --shell
ezy use typescript
ezy start 1
```

The one-time installer places an `ezy` link in `~/.local/bin` and adds a clearly marked, removable Bash/Zsh hook. Open a new terminal or source the shell file printed by the installer. The CLI remembers the active language and chapter, and `ezy start` changes the current shell into that exercise directory:

```sh
ezy status
ezy read
ezy test
ezy submit
```

`ezy start [chapter]` selects the chapter, prints its reading and `starter.ts`, and enters its exercise directory. Edit `starter.ts`; the visible `exercise.test.ts` is its behavioral contract. Direct chapter-local `corepack yarn test` and `corepack yarn submit` commands remain available as an alternative.

## Chapter loop

Start at chapter 1, then repeat the same short loop:

```sh
ezy start 1       # only needed for the first chapter
ezy read --print
# edit the printed starter.ts path in your IDE
ezy test
ezy submit        # records the pass and selects the next chapter
ezy start         # opens the newly selected chapter
```

`ezy submit` records progress only after every authoritative check passes. It then prints and selects the next chapter. `ezy status` shows passed, current, locked, or stale chapters at any time. Progress remains in the local, gitignored `.learn-code/state.json`, so pulling or pushing source code does not overwrite it.

## CLI commands

- `ezy tracks` — list discovered language manifests.
- `ezy use <id>` — select a language track.
- `ezy start [chapter]` — select or resume an exercise and print its files and readings.
- `ezy path [chapter]` — print an exercise path for scripts or editor integration.
- `ezy status` — show sequential progress and the current exercise's reading paths.
- `ezy read [chapter]` — show required offline readings; add `--print` to print them.
- `ezy test [chapter]`, `ezy submit [chapter]`, and `ezy solution [chapter]` — work on one exercise.
- Add `--language <id>` to explicitly target a track without changing the active selection.
- `corepack yarn validate` — run the repository's complete maintainer validation.

The shell hook is explicit and reversible: `./ezy uninstall --shell` removes both the command link and the marked shell block. Without the hook, the executable still works but can only print paths because a child process cannot change its parent shell directory.

## Textbooks and exercises

Canonical prose lives once inside each track's `textbook/` directory. The [TypeScript textbook](tracks/typescript/textbook/README.md) is ordered for independent end-to-end reading and remains available offline. Exercise READMEs stay concise: prerequisites, portable reading links, contract, commands, and test expectations. A manifest's `readings` arrays may attach multiple readings to an exercise or reuse one reading without copying prose. Reading order is enforced within each exercise; reuse may be non-monotonic across exercises, and every canonical reading must be used.

## Progress and trust

Progress is stored in the untracked, versioned `.learn-code/state.json`, isolated by language and stable chapter ID. Every mutation takes a bounded lock, reloads current state while locked, and durably replaces the file through an fsynced temporary file and rename, so concurrent commands do not lose completions. Lock metadata records a unique token, PID, host, and creation time; a heartbeat protects long live transactions, same-host process liveness prevents age-only reclamation, and every write and release rechecks ownership. Invalid entries are diagnosed while structurally valid entries are salvaged; before a transaction replaces corrupt state, the original is retained as `state.corrupt-*.json`. Confirmed stale abandoned locks are recovered. Legacy `.learn-ts/progress.json` and `.current-chapter` state is validated and migrated under the same transaction protocol when present, while the legacy files remain intact. A completion fingerprint includes adapter-defined learner sources, visible tests, and exercise contracts, so changed work or changed expectations become stale.

Manifests are declarative data. They name a trusted adapter registered in repository code; they can never provide arbitrary shell commands. Adapters return a shared normalized success, learner-failure, or infrastructure-failure result, and execute argument arrays through bounded process infrastructure rather than shell strings. A future Rust adapter can invoke Cargo without making Rust crates Yarn workspaces.

See [Start Here](START-HERE.md), [Curriculum](CURRICULUM.md), [source provenance](SOURCE_MANIFEST.md), and [license/source notes](SOURCES_AND_LICENSES.md).
