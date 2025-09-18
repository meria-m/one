import { NotFound } from '@app/components/NotFound'
import { userByIdOptions } from '@app/options/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/@me')({
	component: RouteComponent,
	loader: async ({ context }) => {
		if (!context.user) return null

		const me = await context.queryClient.ensureQueryData(
			userByIdOptions(context.user.userId),
		)

		if (!me) throw new Error('could not load me??? THIS IS A BUG!')

		return me
	},
	errorComponent: ({ error }) => <NotFound message={error.message} />,
})

function RouteComponent() {
	const me = Route.useLoaderData()

	if (!me) {
		return <p>not logged in</p>
	}

	return <div>hello {me.username}!</div>
}
