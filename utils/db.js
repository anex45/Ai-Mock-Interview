import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"

// Use NEXT_PUBLIC_DATABASE_URL for client-side access, fallback to DATABASE_URL for server-side
const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('Database URL not found. Please check your environment variables (NEXT_PUBLIC_DATABASE_URL or DATABASE_URL).');
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });