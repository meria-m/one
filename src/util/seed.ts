import * as schema from '../db/schema'
import 'dotenv/config'
import { db } from '@app/db/drizzle'
import { reset, seed } from 'drizzle-seed'

async function main() {
	await reset(db, schema)

	await seed(db, schema).refine(() => ({
		users: {
			count: 100,
			with: {
				posts: 10,
			},
		},
		likes: {
			count: 100,
		},
	}))
}

main()
