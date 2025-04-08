import { createInjector } from "typed-inject";
import { PointCalculationService } from "../domain/service/point_calculation_service";
import { DrizzleUserCommandRepository } from "../infrastructure/repository/drizzle_user_command_repository";
import { DrizzleUserQueryRepository } from "../infrastructure/repository/drizzle_user_query_repository";
import { UserInfoFacade } from "../domain/facade/user_info_facade";
import { SubSystemDataGateway } from "../infrastructure/gateway/sub_system_data_gateway";
import { SendGridEmailService } from "../infrastructure/service/send_grid_email_service";
import { CreateUserUseCase } from "../application/use_case/user/create_user_use_case";
import { GetUserUseCase } from "../application/use_case/user/get_user_use_case";
import { GetAllUserUseCase } from "../application/use_case/user/get_all_user_use_case";
import { UpdateUserUseCase } from "../application/use_case/user/update_user_use_case";
import { dbStorage } from "../infrastructure/db/db_storage";
import { GetUserInfoUseCase } from "../application/use_case/user_info/get_user_info_use_case";

export const serverInjector = createInjector()
	.provideValue("dbStorage", dbStorage)
	.provideClass("userQueryRepository", DrizzleUserQueryRepository)
	.provideClass("userCommandRepository", DrizzleUserCommandRepository)
	.provideClass("subSystemDataGateway", SubSystemDataGateway)
	.provideClass("userInfoFacade", UserInfoFacade)
	.provideClass("sendGridEmailService", SendGridEmailService)
	.provideClass("user/CreateUserUseCase", CreateUserUseCase)
	.provideClass("user/UpdateUserUseCase", UpdateUserUseCase)
	.provideClass("user/GetUserUseCase", GetUserUseCase)
	.provideClass("user/GetAllUserUseCase", GetAllUserUseCase)
	.provideClass("userInfo/GetUserInfoUseCase", GetUserInfoUseCase);
