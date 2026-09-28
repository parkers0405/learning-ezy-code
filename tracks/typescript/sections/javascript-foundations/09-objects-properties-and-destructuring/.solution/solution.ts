export function describePlayer({
  name,
  score,
}: {
  name: string;
  score: number;
  active: boolean;
}): string {
  return `${name}: ${score}`;
}

export function withBonus(
  player: { name: string; score: number; active: boolean },
  bonus: number,
): { name: string; score: number; active: boolean } {
  return { ...player, score: player.score + bonus };
}
