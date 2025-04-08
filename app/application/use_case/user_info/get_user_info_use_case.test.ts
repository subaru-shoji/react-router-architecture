import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetUserInfoUseCase } from "./get_user_info_use_case";
import type { UserInfoFacade } from "~/domain/facade/user_info_facade";
import type { UserInfo } from "~/domain/model/user_info";

describe("GetUserInfoUseCase", () => {
	it("should call userInfoFacade.getUserInfo with the correct userId", async () => {
		const mockUserInfo: UserInfo.UserInfo = {
			user: {
				id: 1,
				firstName: "test",
				lastName: "user",
				userType: "normal",
			},
			subSystemData: {
				id: 10,
				userId: 1,
				description: "test data",
			},
		};

		const userInfoFacade = {
			getUserInfo: vi.fn().mockImplementation(async () => mockUserInfo),
		} as unknown as UserInfoFacade;

		const getUserInfoUseCase: GetUserInfoUseCase = new GetUserInfoUseCase(
			userInfoFacade,
		);

		const result = await getUserInfoUseCase.execute(mockUserInfo.user.id);

		expect(userInfoFacade.getUserInfo).toHaveBeenCalledWith(
			mockUserInfo.user.id,
		);
		expect(userInfoFacade.getUserInfo).toHaveBeenCalledTimes(1);
		expect(result).toEqual(mockUserInfo);
	});
});
