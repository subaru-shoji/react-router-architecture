import type { User } from "../model/user";

export interface IUserQueryRepository {
	findById(id: string): Promise<User.User | undefined>;
	findAll(): Promise<User.User[]>;
}
