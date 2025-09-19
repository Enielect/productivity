// import 'server-only'
//we don't need any of that, theo.

// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   conn: typeof sql | undefined;
// };

// const conn = globalForDb.conn ?? sql;
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

// export const db = drizzle(conn, { schema });


//use this object to send drizzle queries to your DB
export const db = drizzle(sql, { schema });
