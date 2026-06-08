import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './client';

// eslint-disable-next-line @typescript-eslint/require-await
export async function runMigrations() {
  migrate(db, { migrationsFolder: './drizzle' });
}
