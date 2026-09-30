export function makeCounter(): () => number {
  let count = 0;
  return () => {
    count = count + 1;
    return count;
  };
}
