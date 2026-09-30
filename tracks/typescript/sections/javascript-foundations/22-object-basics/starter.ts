export const learner = { name: "Ada", lessons: 1 };
learner.lessons = 1;
const alias = { name: "Ada", lessons: 2 };
export const sameLearner = learner === alias;
