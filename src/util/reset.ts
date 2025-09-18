import { db } from '@app/db/drizzle'
import * as schema from '@app/db/schema'
import { reset } from 'drizzle-seed'

async function main() {
	await reset(db, schema)
}

main()
