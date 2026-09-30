export const scores: number[] = [1, 2];
export const learner: { name: string; completed: number } = {
  name: "Ada",
  completed: 2,
};
export const add: (left: number, right: number) => number = (left, right) =>
  left + right;
// @ts-expect-error number[] rejects strings.
const rejectedScores: number[] = ["one"];
void rejectedScores;
