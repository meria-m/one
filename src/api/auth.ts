import { db } from '@app/db/drizzle'
import { users } from '@app/db/schema'
import { createServerFn } from '@tanstack/react-start'
import * as argon2 from 'argon2'
import { eq } from 'drizzle-orm'

interface RegisterInput {
	username: string
	password: string
}
interface LoginInput {
	username: string
	password: string
}

export const register = createServerFn({ method: 'POST' })
	.validator(({ username, password }: RegisterInput) => ({
		username,
		password,
	}))
	.handler(async ({ data: { username, password } }) => {
		const passwordHash = await argon2.hash(password)
		const result = await db
			.insert(users)
			.values({ username, passwordHash })
			.returning()

		if (result.length < 1) {
			throw new Error('username taken')
		}

		return login({ data: { username, password } })
	})

export const login = createServerFn({ method: 'POST' })
	.validator(({ username, password }: LoginInput) => ({ username, password }))
	.handler(async ({ data }) => {
		const { username, password } = data
		const user = await db.query.users.findFirst({
			where: eq(users.username, username),
		})

		if (!user) {
			throw new Error('user not found')
		}

		const matches = await argon2.verify(user.passwordHash, password)

		if (!matches) {
			throw new Error('invalid login')
		}
	})
