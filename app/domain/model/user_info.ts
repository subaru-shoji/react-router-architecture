import type { SubSystemData } from "./sub_system_data";
import type { User } from "./user";

export namespace UserInfo {
    export interface UserInfo {
        user: User.User
        subSystemData: SubSystemData.SubSystemData
    }
}