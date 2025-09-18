import { cuid2 } from 'drizzle-cuid2/postgres'
import { relations } from 'drizzle-orm'
import {
	boolean,
	pgTable,
	primaryKey,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: cuid2('id').defaultRandom().primaryKey(),
	username: varchar({ length: 255 }).notNull().unique(),
	passwordHash: varchar().notNull(),
})

export const posts = pgTable('posts', {
	id: cuid2('id').defaultRandom().primaryKey(),
	content: varchar().notNull().unique(),
	userId: cuid2('user_id')
		.notNull()
		.references(() => users.id),
	createdAt: timestamp().notNull().defaultNow(),
})

export const likes = pgTable(
	'likes',
	{
		userId: cuid2('user_id').references(() => users.id),
		postId: cuid2('post_id').references(() => posts.id),
		active: boolean().notNull().default(true),
	},
	(table) => [primaryKey({ columns: [table.postId, table.userId] })],
)

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
}))

export const postsRelations = relations(posts, ({ one, many }) => ({
	author: one(users, {
		fields: [posts.userId],
		references: [users.id],
	}),
	likes: many(likes),
}))
