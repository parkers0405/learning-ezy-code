const learner = { name: "Ada", lessons: 2 };

export type Learner = typeof learner;
export type LearnerKey = keyof Learner;

export function readLearner(key: LearnerKey): string | number {
  return learner.name;
}
