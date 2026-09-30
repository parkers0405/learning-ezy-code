export const learner = { name: "Ada", lessons: 1 };
learner.lessons = 2;
const alias = learner;
export const sameLearner = learner === alias;
