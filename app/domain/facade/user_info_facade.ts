// ユーザー関連の複雑な連携を扱うファサード

import type { ISubSystemDataGateway } from "../gateway/i_sub_system_data_gateway";
import type { UserInfo } from "../model/user_info";
import type { IUserQueryRepository } from "../repository/i_user_query_repository";

export class UserInfoFacade {
	constructor(
		private userQueryRepository: IUserQueryRepository,
		private subSystemDataGateway: ISubSystemDataGateway,
	) {}

	static inject = ["userQueryRepository", "subSystemDataGateway"] as const;

	async getUserInfo(userId: number): Promise<UserInfo.UserInfo> {
		const user = await this.userQueryRepository.findById(userId);

		if (!user) {
			throw new Error("User not found");
		}
		const subSystemData = await this.subSystemDataGateway.getData(user);

		return {
			user,
			subSystemData,
		};
	}
}
