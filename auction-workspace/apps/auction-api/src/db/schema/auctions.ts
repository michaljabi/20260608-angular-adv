import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const auctions = sqliteTable('auctions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uid: text('uid').notNull().unique(),
  title: text('title').notNull(),
  imgUrl: text('img_url').notNull(),
  price: integer('price').notNull(),
  description: text('description'),
  isPromoted: integer('is_promoted', { mode: 'boolean' }).notNull().default(false),
});
