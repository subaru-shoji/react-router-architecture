import { describe, it, expect, vi } from "vitest";
import { GetAllUserUseCase } from "./get_all_user_use_case";
import type { IUserQueryRepository } from "~/domain/repository/i_user_query_repository";
import type { User } from "~/domain/model/user";

describe("GetAllUserUseCase", () => {
	it("should return all users from the repository", async () => {
		// Arrange
		const mockUsers: User.User[] = [
			{
				id: 1,
				firstName: "test",
				lastName: "user1",
				userType: "normal",
			},
			{
				id: 2,
				firstName: "test",
				lastName: "user2",
				userType: "special",
			},
		];
		const mockUserQueryRepository: IUserQueryRepository = {
			findAll: vi.fn().mockImplementation(async () => mockUsers),
			findById: vi.fn(),
		};
		const useCase = new GetAllUserUseCase(mockUserQueryRepository);

		// Act
		const result = await useCase.execute();

		// Assert
		expect(mockUserQueryRepository.findAll).toHaveBeenCalledTimes(1);
		expect(result).toEqual(mockUsers);
	});

	it("should handle an empty list of users", async () => {
		// Arrange
		const mockUserQueryRepository: IUserQueryRepository = {
			findAll: vi.fn().mockImplementation(async () => []),
			findById: vi.fn(),
		};
		const useCase = new GetAllUserUseCase(mockUserQueryRepository);

		// Act
		const result = await useCase.execute();

		// Assert
		expect(mockUserQueryRepository.findAll).toHaveBeenCalledTimes(1);
		expect(result).toEqual([]);
	});
});
