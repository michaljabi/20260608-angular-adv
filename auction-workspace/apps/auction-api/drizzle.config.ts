import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './apps/auction-api/src/db/schema/*.ts',
  out: './apps/auction-api/drizzle',
  dbCredentials: { url: './apps/auction-api/.data/auctions-data.db' },
});
