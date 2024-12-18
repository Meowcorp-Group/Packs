import type { InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	username: text('username').unique().notNull(),
	email: text('email').unique().notNull(),
	name: text('name').notNull(),
	password: text('password').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
});

export const sessions = pgTable('sessions', {
	id: text("id").primaryKey(),
	userId: integer('user_id').notNull().references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: "date" }).notNull()
})

export type User = InferSelectModel<typeof users>;
export type Session = InferSelectModel<typeof sessions>;