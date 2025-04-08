import type { SubSystemData } from "../model/sub_system_data";
import type { User } from "../model/user";

export interface ISubSystemDataGateway {
    getData(user: User.User): Promise<SubSystemData.SubSystemData>;
}