const player = { name: "Ada", score: 7, active: true };

export const { name, score } = player;
export const playerWithBonus = { ...player, score: score + 3 };
