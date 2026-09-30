export const inferredMessage = "hello";
export const annotatedCount: number = 3;
// @ts-expect-error A number annotation rejects strings.
const rejectedCount: number = "three";
void rejectedCount;
