import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL!;

// create postgres client
const client = postgres(connectionString, {
  max: 10, // connection pool
  idle_timeout: 20,
  connect_timeout: 10,
});

// drizzle instance
export const db = drizzle(client, {
  schema,
});

// optional: test DB connection (VERY GOOD PRACTICE)
export const connectDB = async () => {
  try {
    await client`SELECT 1`;
    console.log("✅ PostgreSQL connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed");
    console.error(err);
    process.exit(1); // crash app if DB not connected
  }
};
