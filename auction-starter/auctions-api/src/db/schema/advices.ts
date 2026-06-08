import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const advices = sqliteTable('advices', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  uid: text('uid').notNull().unique(),
  title: text('title').notNull(),
  postedArticle: text('posted_article').notNull(),
});
