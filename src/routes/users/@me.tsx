import { NotFound } from '@app/components/NotFound'
import { userByIdOptions } from '@app/options/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/@me')({
	component: RouteComponent,
	loader: async ({ context }) => {
		if (!context.user) throw new Error('not logged in')

		const { userId } = context.user

		const me = await context.queryClient.ensureQueryData(
			userByIdOptions(userId),
		)

		return { me: me! }
	},

	errorComponent: () => <NotFound message="not logged in" />,
})

function RouteComponent() {
	const { me } = Route.useLoaderData()

	return <div>hello {me.username}!</div>
}
