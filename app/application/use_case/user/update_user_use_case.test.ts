import { describe, it, expect, vi } from "vitest";
import { UpdateUserUseCase } from "./update_user_use_case";
import type { IUserCommandRepository } from "~/domain/repository/i_user_command_repository";
import type { User } from "~/domain/model/user";

describe("UpdateUserUseCase", () => {
	it("should call userCommandRepository.update with the correct user", async () => {
		// Arrange
		const mockUser: User.User = {
			id: 1,
			firstName: "test",
			lastName: "user",
			userType: "normal",
		};
		const mockUserCommandRepository: IUserCommandRepository = {
			create: vi.fn(),
			update: vi.fn(),
		};
		const updateUserUseCase = new UpdateUserUseCase(mockUserCommandRepository);

		// Act
		await updateUserUseCase.execute(mockUser);

		// Assert
		expect(mockUserCommandRepository.update).toHaveBeenCalledWith(mockUser);
		expect(mockUserCommandRepository.update).toHaveBeenCalledTimes(1);
	});
});
