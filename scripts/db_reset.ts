import "dotenv/config";

import * as schema from "../app/infrastructure/db/schema";

import { reset } from "drizzle-seed";
import { drizzle } from "drizzle-orm/node-postgres";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const db = drizzle(process.env.DATABASE_URL!);
await reset(db, schema);
