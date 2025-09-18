import { db } from '@app/db/drizzle'
import { likes, posts, users } from '@app/db/schema'
import { createServerFn } from '@tanstack/react-start'
import { count, desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { authMiddleware } from './auth'

export interface BasePostsQueryOptions {
	userId?: string
	limit?: number
	offset?: number
}

const basePostsQuery = (options?: BasePostsQueryOptions) => {
	const { authorId: _, ...rest } = getTableColumns(posts)
	const limit = Math.min(options?.limit || 10, 10)
	const offset = options?.offset || 0
	const userId = options?.userId

	const liked = userId
		? sql<boolean>`
              COUNT(*) FILTER (WHERE ${likes.userId} = ${userId}) > 0
            `.as('liked')
		: sql<boolean>`false`.as('liked')

	return db
		.select({
			...rest,
			author: users,
			likes: count(likes.postId),
			liked,
		})
		.from(posts)
		.innerJoin(users, eq(users.id, posts.authorId))
		.leftJoin(likes, eq(likes.postId, posts.id))
		.groupBy(posts.id, users.id)
		.limit(limit)
		.offset(offset)
}

export const getPostById = createServerFn({ method: 'GET' })
	.validator((id: string) => id)
	.handler(async ({ data }) => {
		const result = await basePostsQuery().where(eq(posts.id, data))

		return result[0] || null
	})

export const getNewFeed = createServerFn({ method: 'GET' }).handler(() =>
	basePostsQuery().orderBy(desc(posts.createdAt)),
)
export const userPostsById = createServerFn({ method: 'GET' })
	.validator((id: string) => id)
	.handler(({ data }) =>
		basePostsQuery()
			.orderBy(desc(posts.createdAt))
			.where(eq(posts.authorId, data)),
	)

export const getPopularFeed = createServerFn().handler(() =>
	basePostsQuery().orderBy(desc(count(likes.postId))),
)

export const likePost = createServerFn({ method: 'POST' })
	.middleware([authMiddleware])
	.validator((postId: string) => postId)
	.handler(async ({ data: postId, context: { userId } }) => {
		try {
			const result = await db.execute(sql`
			  WITH deleted AS (
          DELETE FROM likes
          WHERE user_id = ${userId} AND post_id = ${postId}
          RETURNING post_id AS postId, 'unliked' AS action
        )

        INSERT INTO likes (user_id, post_id)
        SELECT ${userId}, ${postId}
        WHERE NOT EXISTS (SELECT 1 FROM deleted)
        RETURNING post_id AS postId, 'liked' AS action

        UNION ALL

        SELECT postId, action FROM deleted;
      `)

			return result.rows[0] as {
				postId: string
				action: 'liked' | 'unliked'
			}
		} catch {
			return {
				error: {
					code: 404,
					message: 'post not found',
				},
			}
		}
	})
