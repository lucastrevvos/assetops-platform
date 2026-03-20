import path from "path";
import fs from "fs/promises";
import { db } from "../config/database";

async function runMigrations() {
  const migrationsPath = path.resolve(process.cwd(), "sql");
  const files = await fs.readdir(migrationsPath);

  const sqlFiles = files
    .filter((file) => file.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));

  if (sqlFiles.length === 0) {
    console.log("No SQL migrations found");
    return;
  }

  for (const file of sqlFiles) {
    const filePath = path.join(migrationsPath, file);
    const sql = await fs.readFile(filePath, "utf-8");

    console.log(`Running migration: ${file}`);
    await db.query(sql);
  }

  console.log("All migrations executed successfully");
}

runMigrations()
  .catch((error) => {
    console.error("Error while running migrations:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.end();
  });
