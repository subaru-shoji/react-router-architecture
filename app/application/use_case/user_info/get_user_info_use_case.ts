import type { User } from "../../../domain/model/user";
import type { Point } from "../../../domain/model/point";
import type { UserInfoFacade } from "~/domain/facade/user_info_facade";
import type { UserInfo } from "~/domain/model/user_info";

export class GetUserInfoUseCase {
	public static inject = ["userInfoFacade"] as const;

	constructor(private userInfoFacade: UserInfoFacade) {}

	async execute(userId: number): Promise<UserInfo.UserInfo> {
		return await this.userInfoFacade.getUserInfo(userId);
	}
}
