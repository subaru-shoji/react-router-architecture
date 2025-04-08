import { AsyncLocalStorage } from "node:async_hooks";
import type { DBConnection } from "./db";

export type DBStorageContext = {
	request: Request;
	db: DBConnection;
};

export const dbStorage = new AsyncLocalStorage<DBStorageContext>();
export type DBStorage = typeof dbStorage;
