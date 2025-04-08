import { describe, it, expect, vi } from "vitest";
import { UserInfoFacade } from "./user_info_facade";
import type { IUserQueryRepository } from "../repository/i_user_query_repository";
import type { ISubSystemDataGateway } from "../gateway/i_sub_system_data_gateway";
import type { UserInfo } from "../model/user_info";

describe("UserInfoFacade", () => {
	it("should return user info when user exists", async () => {
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
				description: "test data description",
			},
		};

		const mockUserQueryRepository: IUserQueryRepository = {
			findById: vi.fn().mockImplementation(async () => mockUserInfo.user),
			findAll: vi.fn(),
		};

		const mockSubSystemDataGateway: ISubSystemDataGateway = {
			getData: vi
				.fn()
				.mockImplementation(async () => mockUserInfo.subSystemData),
		};

		const facade = new UserInfoFacade(
			mockUserQueryRepository,
			mockSubSystemDataGateway,
		);

		const result = await facade.getUserInfo(mockUserInfo.user.id);

		expect(mockUserQueryRepository.findById).toHaveBeenCalledWith(1);
		expect(mockSubSystemDataGateway.getData).toHaveBeenCalledWith(
			mockUserInfo.user,
		);
		expect(result).toEqual(mockUserInfo);
	});
});
