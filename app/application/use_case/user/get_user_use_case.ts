import type { User } from "~/domain/model/user";
import type { IUserQueryRepository } from "~/domain/repository/i_user_query_repository";

export class GetUserUseCase {
	constructor(private userQueryRepository: IUserQueryRepository) {}

	static inject = ["userQueryRepository"] as const;

	async execute(userId: number): Promise<User.User> {
		const user = await this.userQueryRepository.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}
		return user;
	}
}
