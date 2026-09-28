export function describePlayer(player: {
  name: string;
  score: number;
  active: boolean;
}): string {
  return "";
}

export function withBonus(
  player: { name: string; score: number; active: boolean },
  bonus: number,
): { name: string; score: number; active: boolean } {
  return player;
}
