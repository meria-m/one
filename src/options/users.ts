import { fetchAllUsers, fetchUserByUsername } from '@api/users'
import { queryOptions } from '@tanstack/react-query'

export const fetchAllUsersOptions = () => {
	return queryOptions({
		queryKey: ['users', 'profiles'],
		queryFn: fetchAllUsers,
	})
}
// export const userByIdOptions = (id: string) => {
// 	return queryOptions({
// 		queryKey: ['users',  { id }],
// 		queryFn: async ({ client }) => {
// 			const user = await fetchUserById({ data: id })

// 			if (user) client.setQueryData(['users', 'username', user.username], user)

// 			return user
// 		},
// 	})
// }

export const userByUsernameOptions = (username: string) => {
	return queryOptions({
		queryKey: ['users', { username }],
		queryFn: async () => {
			const user = await fetchUserByUsername({ data: username })
			return user || null
		},
	})
}
