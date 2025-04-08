import { integer, pgTable, varchar, pgEnum } from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("user_type", ["normal", "special"]);

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	lastName: varchar("last_name", { length: 255 }).notNull(),
	userType: userTypeEnum("user_type").notNull(),
});
