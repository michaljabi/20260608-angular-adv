import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const dbPath = './apps/auction-api/.data/auctions-data.db';
// better-sqlite3 won't create parent dirs; .data is gitignored so it's absent
// on fresh checkouts (CI). Ensure it exists before opening.
mkdirSync(dirname(dbPath), { recursive: true });

export const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
