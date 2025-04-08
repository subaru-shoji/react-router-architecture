import { createInjector } from "typed-inject";
import { dbStorage } from "./infrastructure/db/db";
import { PointCalculationService } from "./domain/service/point_calculation_service";
import { DrizzleUserCommandRepository } from "./infrastructure/repository/drizzle_user_command_repository";
import { DrizzleUserQueryRepository } from "./infrastructure/repository/drizzle_user_query_repository";
import { UserManagementFacade } from "./domain/facade/user_management_facade";
import { SubSystemDataGateway } from "./infrastructure/gateway/sub_system_data_gateway";
import { SendGridEmailService } from "./infrastructure/service/send_grid_email_service";

export const appInjector = createInjector()
	.provideValue("dbStorage", dbStorage)
	.provideClass("userQueryRepository", DrizzleUserQueryRepository)
	.provideClass("userCommandRepository", DrizzleUserCommandRepository)
	.provideClass("subSystemDataGateway", SubSystemDataGateway)
	.provideClass("userManagementFacade", UserManagementFacade)
	.provideClass("sendGridEmailService", SendGridEmailService)
	.provideClass("pointCalculateService", PointCalculationService);
