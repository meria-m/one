import { fetchAllUsers, fetchUserById, fetchUserByUsername } from '@api/users'
import { userPostsById } from '@app/api/posts'
import { queryOptions } from '@tanstack/react-query'

export const fetchAllUsersOptions = () => {
	return queryOptions({
		queryKey: ['users', 'profiles'],
		queryFn: fetchAllUsers,
	})
}
export const userByIdOptions = (id?: string) => {
	return queryOptions({
		queryKey: ['users', { id }],
		queryFn: async ({ client }) => {
			if (!id) return null

			const user = await fetchUserById({ data: id })

			if (user) {
				client.setQueryData(['users', { username: user.username }], user)
			}

			return user
		},
	})
}

export const userByUsernameOptions = (username: string) => {
	return queryOptions({
		queryKey: ['users', { username }],
		queryFn: async ({ client }) => {
			const user = await fetchUserByUsername({ data: username })

			if (user) {
				client.setQueryData(['users', { id: user.id }], user)
			}

			return user
		},
	})
}

export const userPostsByIdOptions = (id: string) =>
	queryOptions({
		queryKey: ['users', { id }, 'feed'],
		queryFn: () => userPostsById({ data: id }),
	})
