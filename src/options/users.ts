import { fetchAllUsers, fetchUserById, fetchUserByUsername } from '@api/users'
import { queryOptions } from '@tanstack/react-query'

export const fetchAllUsersOptions = () => {
	return queryOptions({
		queryKey: ['users', 'profiles'],
		queryFn: fetchAllUsers,
	})
}
export const userByIdOptions = (id?: string | null) => {
	return queryOptions({
		queryKey: ['users', { id }],
		queryFn: async ({ client }) => {
			const user = await fetchUserById({ data: id! })

			if (user) {
				client.setQueryData(['users', { username: user.username }], user)
			}

			return user || null
		},
		enabled: !!id,
	})
}

export const userByUsernameOptions = (username?: string | null) => {
	return queryOptions({
		queryKey: ['users', { username }],
		queryFn: async ({ client }) => {
			const user = await fetchUserByUsername({ data: username! })

			if (user) {
				client.setQueryData(['users', { id: user.id }], user)
			}

			return user || null
		},
		enabled: !!username,
	})
}
