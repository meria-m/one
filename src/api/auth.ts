import { db } from '@app/db/drizzle'
import { auth, users } from '@app/db/schema'
import { useAppSession } from '@app/hooks/useAppSession'
import { notFound, redirect } from '@tanstack/react-router'
import { createMiddleware, createServerFn } from '@tanstack/react-start'
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
		const session = await useAppSession()

		const userId = await db.transaction(async (tx) => {
			const results = await tx
				.insert(users)
				.values({ username })
				.onConflictDoNothing({ target: users.username })
				.returning()

			if (!results.length) {
				throw new Error('username already registered')
			}

			const user = results[0]

			const passwordHash = await argon2.hash(password)

			await tx.insert(auth).values({ id: user.id, passwordHash }).returning()

			return user.id
		})
		await session.update({ userId })
		throw redirect({ to: '/home' })
	})

export const login = createServerFn({ method: 'POST' })
	.validator(({ username, password }: LoginInput) => ({ username, password }))
	.handler(async ({ data }) => {
		const { username, password } = data
		const user = await db.query.users.findFirst({
			where: eq(users.username, username),
			columns: {
				id: true,
			},
			with: {
				auth: {
					columns: {
						passwordHash: true,
					},
				},
			},
		})

		if (!user) {
			throw notFound()
		}

		const matches = await argon2.verify(user.auth.passwordHash, password)

		if (!matches) {
			throw new Error('invalid login')
		}

		const session = await useAppSession()
		await session.update({ userId: user.id })

		throw redirect({ to: '/home' })
	})

export const logout = createServerFn({ method: 'POST' }).handler(async () => {
	const session = await useAppSession()

	await session.clear()

	throw redirect({ to: '/home' })
})

export const authMiddleware = createMiddleware({ type: 'function' }).server(
	async ({ next }) => {
		const session = await useAppSession()

		if (!session.data.userId) {
			throw new Error('unauthorized')
		}

		return next({ context: { userId: session.data.userId } })
	},
)
