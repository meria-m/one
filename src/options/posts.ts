import { getNewFeed, getPopularFeed, getPostById, likePost } from '@api/posts'
import { mutationOptions, queryOptions } from '@tanstack/react-query'

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
		queryFn: () => getPostById({ data: id }),
	})

export const likePostMutation = (id: string) =>
	mutationOptions({
		mutationKey: ['posts', { id }, 'like'],
		mutationFn: () => likePost({ data: id }),
	})
