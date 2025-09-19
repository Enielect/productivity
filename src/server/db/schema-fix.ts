import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";
import { env } from "@/env";

// Load environment variables

// Your database connection string
const connectionString = env.POSTGRES_URL;

if (!connectionString) {
  console.error("POSTGRES_URL is not set in the environment variables");
  process.exit(1);
}

async function dropConstraints() {
  let client;
  try {
    client = postgres(connectionString);
    const db = drizzle(client);

    // Drop the foreign key constraint on taskGroups
    await db.execute(sql`
      ALTER TABLE "better-nextjs_taskGroups" 
      DROP CONSTRAINT IF EXISTS "better-nextjs_taskGroups_user_google_id_better-nextjs_users_goo"
    `);

    // Drop the unique constraint on users
    await db.execute(sql`
      ALTER TABLE "better-nextjs_users" 
      DROP CONSTRAINT IF EXISTS "better-nextjs_users_google_id_unique"
    `);
  } catch (error) {
    console.error("Error dropping constraints:", error);
    if ((error as { code: string }).code === "ECONNREFUSED") {
      console.error(
        "Could not connect to the database. Please check if the database server is running and the connection details are correct.",
      );
    }
  } finally {
    if (client) {
      await client.end();
    }
  }
}

// Run the main function
dropConstraints().catch(console.error);
