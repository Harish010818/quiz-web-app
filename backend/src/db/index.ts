import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

if(!process.env.DATABASE_URL){
    throw new Error("Database is not set in environmental variables")
}

const pool = new Pool({connectionString: process.env.DATABASE_URL});

pool.on("connect", () => {
     console.log("Database connected successfully") 
});


pool.on("error", (err) => {
     console.error("Database connection error", err); 
});


export const db = drizzle({ client: pool, schema});