import type { User } from "~/domain/model/user";
import type { IUserQueryRepository } from "~/domain/repository/i_user_query_repository";

export class GetAllUserUseCase {
	constructor(private userQueryRepository: IUserQueryRepository) {}

	static inject = ["userQueryRepository"] as const;

	async execute(): Promise<User.User[]> {
		return await this.userQueryRepository.findAll();
	}
}
