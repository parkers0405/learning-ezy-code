export function updateAges(ages: number[]): number[] {
  ages.unshift(20);
  ages.pop();
  return ages;
}
