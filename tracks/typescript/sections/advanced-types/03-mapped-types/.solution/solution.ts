export type Point = { x: number; y: number };
export type NullablePoint = { [K in keyof Point]: Point[K] | null };
