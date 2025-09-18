import { db } from '@app/db/drizzle'
import { likes, posts, users } from '@app/db/schema'
import { createServerFn } from '@tanstack/react-start'
import { count, eq, getTableColumns } from 'drizzle-orm'

const basePostsQuery = () => {
	const { userId: _, ...rest } = getTableColumns(posts)
	return db
		.select({
			...rest,
			author: {
				id: users.id,
				username: users.username,
			},
			likes: count(likes.postId),
		})
		.from(posts)
		.innerJoin(users, eq(users.id, posts.userId))
		.leftJoin(likes, eq(likes.postId, posts.id))
		.groupBy(users.id, posts.id)
		.orderBy(count(likes.postId))
}

export const getPostById = createServerFn({ method: 'GET' })
	.validator((id: string) => id)
	.handler(async ({ data }) => {
		const result = await basePostsQuery().where(eq(posts.id, data))

		return result[0]
	})

export const getNewFeed = createServerFn({ method: 'GET' }).handler(
	async () => {
		const now = performance.now()
		const results = await basePostsQuery()

		console.log(`took ${performance.now() - now}ms to get new feed`)

		return results
	},
)
export const getUserProfileFeed = createServerFn({ method: 'GET' })
	.validator((id: string) => id)
	.handler(({ data }) => basePostsQuery().where(eq(posts.userId, data)))

export const getPopularFeed = createServerFn().handler(async () => {})

export const likePost = createServerFn({ method: 'POST' }).handler(
	async () => {},
)
