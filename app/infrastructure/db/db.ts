import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { AsyncLocalStorage } from "node:async_hooks";
import * as schema from "./schema";
// biome-ignore lint/style/noNonNullAssertion: <explanation>
export const db = drizzle(process.env.DATABASE_URL!, { schema });

export type DBConnection = typeof db;
export const dbStorage = new AsyncLocalStorage<DBConnection>();
export type DBStorage = typeof dbStorage;
