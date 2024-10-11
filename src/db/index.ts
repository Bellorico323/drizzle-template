import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

let client: postgres.Sql<Record<string, unknown>> | null = null;
let db: ReturnType<typeof drizzle> | null = null;

export function getDatabaseInstance(customUrl?: string) {
  if(!process.env.DATABASE_URL) throw new Error('Invalid Environment variables')

  const databaseUrl = customUrl || process.env.DATABASE_URL;
  console.log(databaseUrl)

  if (!client || !db) {
    client = postgres(databaseUrl);
    db = drizzle(client, { schema });
  }

  return { db, client };
}