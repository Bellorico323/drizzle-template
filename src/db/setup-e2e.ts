import postgres from 'postgres';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import 'dotenv/config';
import { execSync } from 'node:child_process';
import { sql } from 'drizzle-orm';

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.');
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('search_path', schemaId)

  return url.toString();
}

let db: PostgresJsDatabase<Record<string, never>>;

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseUrl('test');

  process.env.DATABASE_URL = databaseUrl;

  const sql = postgres(databaseUrl);
  await sql`CREATE SCHEMA IF NOT EXISTS "test";`

  await sql`DROP TABLE IF EXISTS "drizzle".__drizzle_migrations;`

  db = drizzle(sql);

  execSync('pnpm drizzle-kit migrate --config=drizzle-test.config.ts');
});

afterAll(async () => {
  await db.execute(sql`DROP SCHEMA IF EXISTS "test" CASCADE`);
});
