import type { users } from "~/infrastructure/db/schema";
import type { User } from "../model/user";

export type NewUser = typeof users.$inferInsert;

export interface IUserCommandRepository {
	create(user: NewUser): Promise<void>;
	update(user: User.User): Promise<void>;
}
