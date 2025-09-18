import { db } from '@app/db/drizzle'
import { users } from '@app/db/schema'
import { useAppSession } from '@app/hooks/useAppSession'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

export const fetchAllUsers = createServerFn({ method: 'GET' }).handler(() =>
	db.query.users.findMany(),
)

export const fetchUserById = createServerFn({ method: 'GET' })
	.validator((id: string) => id)
	.handler(async ({ data }) => {
		const result = await db.query.users.findFirst({
			where: eq(users.id, data),
		})

		return result || null
	})

export const fetchSession = createServerFn({ method: 'GET' }).handler(
	async () => {
		const session = await useAppSession()

		if (!session.data.userId) {
			return null
		}

		return { userId: session.data.userId }
	},
)

export const fetchUserByUsername = createServerFn({ method: 'GET' })
	.validator((username: string) => username)
	.handler(async ({ data }) => {
		const result = await db.query.users.findFirst({
			where: eq(users.username, data),
		})

		return result || null
	})
