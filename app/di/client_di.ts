import { createInjector } from "typed-inject";
import { PointCalculationService } from "~/domain/service/point_calculation_service";

export const clientInjector = createInjector().provideClass(
	"pointCalculateService",
	PointCalculationService,
);
