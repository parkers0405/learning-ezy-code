# Welcome

Learning Ezy Code is a local, IDE-first monorepo that can host independently tooled language tracks. TypeScript is fully implemented now; the root CLI discovers tracks from manifests, invokes only audited adapters, and stores progress separately for each language.

Start with [`START-HERE.md`](START-HERE.md). For TypeScript, required prose lives in one ordered [offline textbook](tracks/typescript/textbook/README.md), while each of the 51 exercise directories contains a concise contract, editable starter, visible named tests, and isolated solution.

Local submissions never leave your machine and are unrelated to Exercism's network submission system. Versioned state lives in gitignored `.learn-code/state.json`. The roadmap marks unchanged successful work **passed**, the next required exercise **current**, later work **locked**, and changed learner source or contracts **stale**.

The curriculum contains 29 migrated learn-ts.org topics with attribution, corrections, and stable migration IDs, plus local prerequisite bridges and focused topic splits, for 51 chapters total. This orientation replaces promotional upstream material rather than copying it; details are in [`SOURCE_MANIFEST.md`](SOURCE_MANIFEST.md), `LICENSE`, and `NOTICE`.
