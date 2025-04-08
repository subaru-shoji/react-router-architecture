import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from "../app/infrastructure/db/schema";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const db = drizzle(process.env.DATABASE_URL!);
await seed(db, schema, { count: 5 });
