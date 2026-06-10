import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './client';

export async function runMigrations() {
  migrate(db, { migrationsFolder: './apps/auction-api/drizzle' });
}
