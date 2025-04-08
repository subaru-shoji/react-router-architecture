import { describe, it, expect, vi } from "vitest";
import { CreateUserUseCase } from "./create_user_use_case";
import type {
	IUserCommandRepository,
	NewUser,
} from "~/domain/repository/i_user_command_repository";

describe("CreateUserUseCase", () => {
	it("should call userCommandRepository.create with the correct newUser", async () => {
		// Arrange
		const mockUserCommandRepository: IUserCommandRepository = {
			create: vi.fn(),
			update: vi.fn(),
		};
		const createUserUseCase = new CreateUserUseCase(mockUserCommandRepository);
		const newUser: NewUser = {
			firstName: "Test",
			lastName: "User",
			userType: "normal",
		};

		// Act
		await createUserUseCase.execute(newUser);

		// Assert
		expect(mockUserCommandRepository.create).toHaveBeenCalledWith(newUser);
		expect(mockUserCommandRepository.create).toHaveBeenCalledTimes(1);
	});
});
