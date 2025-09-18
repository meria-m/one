import { db } from '@app/db/drizzle'
import { posts, postsRelations, users } from '@app/db/schema'
import { seed } from 'drizzle-seed'

async function main() {
	await seed(db, { users, posts, postsRelations }).refine(() => ({
		users: {
			count: 100,
			with: {
				posts: 10,
			},
		},
	}))
}

main()
