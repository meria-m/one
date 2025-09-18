import {
	getNewFeed,
	getPopularFeed,
	getPostById,
	getUserProfileFeed,
} from '@api/posts'
import { queryOptions } from '@tanstack/react-query'

export const newFeedOptions = () =>
	queryOptions({
		queryKey: ['posts', 'feed', 'new'],
		queryFn: getNewFeed,
	})

export const popularFeedOptions = () =>
	queryOptions({
		queryKey: ['posts', 'feed', 'popular'],
		queryFn: getPopularFeed,
	})

export const postByIdOptions = (id: string) =>
	queryOptions({
		queryKey: ['posts', { id }],
		queryFn: async () => {
			const post = await getPostById({ data: id })

			return post || null
		},
	})

export const userPostsById = (id: string) =>
	queryOptions({
		queryKey: ['users', { id }, 'feed'],
		queryFn: () => getUserProfileFeed({ data: id }),
	})
