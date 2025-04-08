import { describe, it, expect } from "vitest";
import { Point } from "./point";

describe("Point", () => {
	describe("multiply", () => {
		it("should multiply the point amount by the given rate", () => {
			const point: Point.Point = { amount: 10 };
			const rate = 2;
			const result = Point.multiply(point, rate);
			expect(result).toEqual({ amount: 20 });
		});
	});
});
