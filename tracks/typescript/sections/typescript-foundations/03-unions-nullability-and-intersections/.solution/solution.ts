export const selectedId: string | number | null = 42;
export const learner: { name: string } & { active: boolean } = {
  name: "Ada",
  active: true,
};

// @ts-expect-error The union excludes boolean values.
const rejectedId: string | number | null = false;
void rejectedId;
