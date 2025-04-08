import type { User } from "./user";

export namespace Point {
	export interface Point {
		amount: number;
	}

	export function multiply(point: Point, rate: number): Point {
		return { amount: point.amount * rate };
	}

	export const POINT_RATES: { [key in User.UserType]: number } = {
		normal: 1.0,
		special: 2.0,
	} as const;
}
