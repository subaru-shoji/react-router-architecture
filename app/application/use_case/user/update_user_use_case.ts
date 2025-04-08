// ユーザー作成ユースケース

import type { User } from "~/domain/model/user";
import type { IUserCommandRepository } from "~/domain/repository/i_user_command_repository";

export class UpdateUserUseCase {
	constructor(private userCommandRepository: IUserCommandRepository) {}

	static inject = ["userCommandRepository"] as const;

	async execute(user: User.User): Promise<void> {
		await this.userCommandRepository.update(user);
	}
}
