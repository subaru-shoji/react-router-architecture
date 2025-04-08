import type { User } from "~/domain/model/user";
import type { DBStorage } from "../db/db";
import type {
	NewUser,
	IUserCommandRepository,
} from "~/domain/repository/i_user_command_repository";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export class DrizzleUserCommandRepository implements IUserCommandRepository {
	constructor(private dbStorage: DBStorage) {}
	static inject = ["dbStorage"] as const;

	async create(user: NewUser): Promise<void> {
		const db = this.dbStorage.getStore();
		if (!db) {
			throw new Error("Database connection is not available");
		}
		await db.insert(users).values(user);
	}
	async update(user: User.User): Promise<void> {
		const db = this.dbStorage.getStore();
		if (!db) {
			throw new Error("Database connection is not available");
		}
		await db.update(users).set(user).where(eq(users.id, user.id));
	}
}
