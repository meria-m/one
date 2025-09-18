import type * as schema from '@app/db/schema'

export type User = typeof schema.users.$inferSelect
export type Post = Omit<typeof schema.posts.$inferSelect, 'userId'> & {
	author: User
	likes: number
}

export interface SessionUser {
	userId?: User['id']
}
