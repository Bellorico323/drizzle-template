import { createId } from '@paralleldrive/cuid2'
import { serial, text, pgTable, pgSchema } from "drizzle-orm/pg-core";


export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
})

export type User = typeof users.$inferSelect

export type UserInput = typeof users.$inferInsert