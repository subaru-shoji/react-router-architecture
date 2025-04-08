import type { User } from "~/domain/model/user";
import type { DBStorage } from "../db/db";
import type { IUserQueryRepository } from "~/domain/repository/i_user_query_repository";

export class DrizzleUserQueryRepository implements IUserQueryRepository {
	constructor(private dbStorage: DBStorage) {}

	static inject = ["dbStorage"] as const;
	async findById(id: number): Promise<User.User | undefined> {
		const db = this.dbStorage.getStore();

		if (!db) {
			throw new Error("Database connection is not available");
		}

		return db.query.users.findFirst({
			where: (user, { eq }) => eq(user.id, id),
		});
	}

	async findAll(): Promise<User.User[]> {
		const db = this.dbStorage.getStore();

		if (!db) {
			throw new Error("Database connection is not available");
		}

		return db.query.users.findMany();
	}
}
