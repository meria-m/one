import * as fs from 'node:fs'
import { createServerFn } from '@tanstack/react-start'

async function readCount() {
	return parseInt(
		await fs.promises.readFile('count.txt', 'utf-8').catch(() => '0'),
		10,
	)
}

async function writeCount(num: number): Promise<number> {
	const count = await readCount()
	const result = count + num
	await fs.promises.writeFile('count.txt', `${result}`)

	return result
}

export const getCount = createServerFn({ method: 'GET' }).handler(readCount)

export const setCount = createServerFn({ method: 'POST' })
	.validator((d: number) => d)
	.handler(({ data }) => writeCount(data))
