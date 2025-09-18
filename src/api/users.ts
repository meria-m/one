import { db } from '@app/db/drizzle'
import { users } from '@app/db/schema'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const fetchAllUsers = createServerFn({ method: 'GET' }).handler(() =>
	db.query.users.findMany({
		columns: {
			id: true,
			username: true,
		},
		with: {
			posts: {
				columns: {
					id: true,
				},
			},
		},
	}),
)

export const fetchUserById = createServerFn({ method: 'GET' })
	.validator((id: string) => id)
	.handler(({ data }) =>
		db.query.users.findFirst({
			columns: {
				id: true,
				username: true,
			},
			where: eq(users.id, data),
		}),
	)

export const fetchUserByUsername = createServerFn({ method: 'GET' })
	.validator((username: string) => username)
	.handler(({ data }) =>
		db.query.users.findFirst({
			columns: {
				id: true,
				username: true,
			},
			where: eq(users.username, data),
		}),
	)
