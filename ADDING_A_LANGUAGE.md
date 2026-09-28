# Adding a Language Track

Language tracks separate curriculum data from trusted execution code. Do not add shell commands to a manifest.

## Track contract

1. Add one entry to `languages.json` with a stable lowercase ID, display name, relative manifest path, and trusted adapter key.
2. Add `tracks/<id>/track.json` with schema version `1`, the same ID and adapter, a relative textbook index, a `readingPolicy`, starter-validation expectations, and ordered sections/chapters. Every chapter needs a stable ID, unique slug, title, relative exercise path, and non-empty ordered `readings` array.
3. Add `tracks/<id>/textbook/index.json` with ordered reading IDs, titles, and local Markdown paths, plus a linked `README.md` table of contents. Readings are canonical prose; exercise READMEs link to them rather than duplicate them.
4. Keep exercise contracts visible and local. The adapter defines required learner/test files and fingerprint inputs.
5. Register an audited adapter in `packages/cli/adapters/index.mjs`. Shared orchestration must not special-case chapter counts, section names, or language paths.

The validator canonicalizes referenced files and directories, rejecting wrong filesystem types, symlink escapes, duplicate IDs/slugs, missing reading files, unknown references, and readings that are out of textbook order within one exercise. The declared policy permits intentional reuse, including non-monotonic reuse across exercises, but rejects canonical readings unused by every exercise. The registry rejects untrusted adapter names.

## Adapter contract

An adapter exposes `validateChapter`, `fingerprintChapter`, `test`, `typecheck`, `run`, and `solution`. Execution operations return `{ ok, kind, phase, category, detail }`: `kind` is `success`, `learner`, or `infrastructure`; failed results identify a stable phase and category. Starter validation compares learner failures to the manifest's exact expected phase/category, so syntax errors and broken infrastructure cannot masquerade as intentional exercises.

Keep language-specific details inside the adapter: source extensions, required files, environment variables, tool/config paths, diagnostic classification, and fingerprint inputs. Canonicalize each required tool entry point as a contained regular file before launch, and classify a missing, wrong-type, escaping, or corrupt tool as infrastructure rather than learner failure. Use the shared `runProcess(command, args, options)` helper with separate argument arrays. It handles spawn errors, signals, timeouts, and bounded output without invoking a shell. Unit-test adapters with an injected executor, including malformed tool output and infrastructure paths.

## Rust plan

A real Rust track should use native Cargo layout and tooling:

- Store crates under `tracks/rust/...`; do **not** add them to Yarn workspaces.
- Implement the normalized adapter methods and invoke `cargo test`, `cargo check`, and optionally `cargo fmt --check` through `runProcess` with argument arrays—never interpolated shell text.
- Classify missing Cargo, an unreadable manifest, and test-discovery failures as infrastructure failures distinct from learner failures.
- Fingerprint editable `.rs` sources plus authoritative tests, `Cargo.toml`, relevant lock/config files, and the exercise README contract.
- Reveal a solution from a non-imported local solution area without letting learner tests depend on it.
- Add adapter unit tests with a fake executor and an end-to-end temporary Cargo fixture when Rust is available in CI.
- Add an ordered Rust textbook, declare within-exercise reading order plus unused-reading errors, and map each exercise through `readings`; shared CLI commands then work without TypeScript changes.

Only register `rust` after at least one honest, tested chapter exists. Empty manifests and fake TypeScript-shaped Rust lessons are not acceptable extension proofs; the generic mock-language manifest tests already prove language-neutral discovery.
