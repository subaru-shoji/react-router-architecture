// ポイント計算ロジック

import { Point } from "../model/point";
import type { User } from "../model/user";

export class PointCalculationService {
	public static inject = [] as const;

	calculatePoints(user: User.User, point: Point.Point): number {
		const rate = Point.POINT_RATES[user.userType];

		return Point.multiply(point, rate).amount;
	}
}
