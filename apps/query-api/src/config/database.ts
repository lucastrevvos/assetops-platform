import { Pool } from "pg";
import { env } from "./env";

export const db = new Pool({
  connectionString: env.DATABASE_URL,
});

export async function connectDatabase(): Promise<void> {
  const client = await db.connect();

  try {
    await client.query("SELECT 1");
    console.log("Database connection established successfully");
  } finally {
    client.release();
  }
}
