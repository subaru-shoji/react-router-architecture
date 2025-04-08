import type { ISubSystemDataGateway } from "~/domain/gateway/i_sub_system_data_gateway";
import type { SubSystemData } from "~/domain/model/sub_system_data";
import type { User } from "~/domain/model/user";

export class SubSystemDataGateway implements ISubSystemDataGateway {
    async getData(user: User.User): Promise<SubSystemData.SubSystemData> {
        return {
            id: 1,
            userId: user.id,
            description: "This is a sample sub-system data.",
        };
    }

}