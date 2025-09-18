import { fetchAllUsersOptions } from '@app/options/users'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/users/all')({
	component: RouteComponent,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(fetchAllUsersOptions()),
})

function RouteComponent() {
	const { data, isLoading } = useQuery(fetchAllUsersOptions())

	if (isLoading) {
		return <p>loading...</p>
	}

	const users = data || []

	if (users.length === 0) {
		return <p>no users...</p>
	}

	return (
		<>
			{users.map((user) => {
				return (
					<Link
						key={user.id}
						to="/users/$username"
						params={{ username: user.username }}
					>
						<p>
							id: {user.id} username: {user.username}
						</p>
					</Link>
				)
			})}
		</>
	)
}
