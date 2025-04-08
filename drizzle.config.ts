import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
	out: "./drizzle",
	schema: "./app/infrastructure/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		url: process.env.DATABASE_URL!,
	},
});
