import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.DATABASE_URL) {
    throw new Error("Database is not set in environmental variables");
}
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.on("connect", () => {
    console.log("Event triggered: Database connected successfully");
});
pool.on("error", (err) => {
    console.error("Database connection error", err);
});
export const db = drizzle({ client: pool, schema });
export async function connectDB() {
    try {
        await pool.query("SELECT 1");
    }
    catch (error) {
        process.exit(1);
    }
}
;
//# sourceMappingURL=index.js.map