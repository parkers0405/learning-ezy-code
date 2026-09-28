import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateRoadmap,
  fingerprint,
  progressBar,
  recordCompletion,
} from "../progress.mjs";

const chapters = [
  { id: "one", number: 1, sectionId: "start", title: "One" },
  { id: "two", number: 2, sectionId: "start", title: "Two" },
  { id: "three", number: 3, sectionId: "later", title: "Three" },
];
const hashes = {
  one: fingerprint([
    ["source", "one"],
    ["test", "contract-one"],
  ]),
  two: fingerprint([
    ["source", "two"],
    ["test", "contract-two"],
  ]),
  three: fingerprint([
    ["source", "three"],
    ["test", "contract-three"],
  ]),
};

test("a new roadmap unlocks only the first chapter", () => {
  const roadmap = calculateRoadmap(chapters, {}, hashes);
  assert.deepEqual(
    roadmap.entries.map(({ status, unlocked }) => ({ status, unlocked })),
    [
      { status: "current", unlocked: true },
      { status: "locked", unlocked: false },
      { status: "locked", unlocked: false },
    ],
  );
});

test("valid sequential passes move the frontier", () => {
  let completions = recordCompletion(
    {},
    "one",
    hashes.one,
    "2026-01-01T00:00:00.000Z",
  );
  completions = recordCompletion(
    completions,
    "two",
    hashes.two,
    "2026-01-02T00:00:00.000Z",
  );
  assert.deepEqual(
    calculateRoadmap(chapters, completions, hashes).entries.map(
      (entry) => entry.status,
    ),
    ["passed", "passed", "current"],
  );
});

test("changed learner or contract inputs make a pass stale and relock downstream work", () => {
  let completions = {};
  for (const chapter of chapters)
    completions = recordCompletion(completions, chapter.id, hashes[chapter.id]);
  const changed = {
    ...hashes,
    one: fingerprint([
      ["source", "one"],
      ["test", "changed-contract"],
    ]),
  };
  const roadmap = calculateRoadmap(chapters, completions, changed);
  assert.equal(roadmap.entries[0].status, "stale");
  assert.equal(roadmap.entries[1].unlocked, false);
  assert.equal(roadmap.entries[2].unlocked, false);
});

test("fingerprints frame labels and contents", () => {
  assert.notEqual(fingerprint([["ab", "c"]]), fingerprint([["a", "bc"]]));
  assert.notEqual(
    fingerprint([["source", "same"]]),
    fingerprint([["tests", "same"]]),
  );
});

test("progress bars are bounded and readable without color", () => {
  assert.equal(progressBar(0, 4, 8), "[--------]");
  assert.equal(progressBar(2, 4, 8), "[####----]");
  assert.equal(progressBar(9, 4, 8), "[########]");
});
