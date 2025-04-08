import { describe, it, expect, vi } from "vitest";
import { GetUserUseCase } from "./get_user_use_case";
import type { IUserQueryRepository } from "~/domain/repository/i_user_query_repository";
import type { User } from "~/domain/model/user";
import { beforeEach } from "node:test";

describe("GetUserUseCase", () => {
	it("should return a user when the user exists", async () => {
		const mockUser: User.User = {
			id: 1,
			firstName: "test",
			lastName: "user",
			userType: "normal",
		};

		const mockUserQueryRepository: IUserQueryRepository = {
			findById: vi.fn().mockImplementation(async () => mockUser),
			findAll: vi.fn(),
		};

		const getUserUseCase = new GetUserUseCase(mockUserQueryRepository);

		const result = await getUserUseCase.execute(1);

		expect(mockUserQueryRepository.findById).toHaveBeenCalledWith(1);
		expect(result).toEqual(mockUser);
	});

	it("should throw an error when the user does not exist", async () => {
		const mockUserQueryRepository: IUserQueryRepository = {
			findById: vi.fn().mockImplementation(async () => undefined),
			findAll: vi.fn(),
		};

		const getUserUseCase = new GetUserUseCase(mockUserQueryRepository);

		await expect(getUserUseCase.execute(1)).rejects.toThrow("User not found");
		expect(mockUserQueryRepository.findById).toHaveBeenCalledWith(1);
	});
});
