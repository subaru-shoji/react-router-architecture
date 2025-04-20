import type { User } from "~/domain/model/user";
import type { IUserQueryRepository } from "~/domain/repository/i_user_query_repository";
import type { DBStorage } from "../db/db_storage";

export class DrizzleUserQueryRepository implements IUserQueryRepository {
  constructor(private dbStorage: DBStorage) {}

  static inject = ["dbStorage"] as const;
  async findById(id: number): Promise<User.User | undefined> {
    const db = this.dbStorage.getStore()?.db;

    if (!db) {
      throw new Error("Database connection is not available");
    }

    return db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
  }

  async findAll(): Promise<User.User[]> {
    const db = this.dbStorage.getStore()?.db;

    if (!db) {
      throw new Error("Database connection is not available");
    }

    return db.query.users.findMany();
  }
}
