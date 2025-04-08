import { describe, it, expect } from "vitest";
import { PointCalculationService } from "./point_calculation_service";
import type { User } from "../model/user";
import type { Point } from "../model/point";

describe("PointCalculationService", () => {
	it("should calculate points correctly based on user type and point rate", () => {
		// Mock data
		const user: User.User = {
			id: 1,
			firstName: "test",
			lastName: "user",
			userType: "special",
		};

		const point: Point.Point = {
			amount: 100,
		};

		// Act
		const result = new PointCalculationService().calculatePoints(user, point);

		// Assert
		expect(result).toBe(200); // 100 * 2 = 200
	});
});
