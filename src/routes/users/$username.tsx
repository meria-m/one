import { Feed } from '@app/components/Feed'
import { NotFound } from '@app/components/NotFound'
import { useMe } from '@app/hooks/useMe'
import { userByUsernameOptions, userPostsByIdOptions } from '@app/options/users'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, notFound, useNavigate } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/users/$username')({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const user = await context.queryClient.ensureQueryData(
			userByUsernameOptions(params.username),
		)

		if (!user) throw notFound()

		return { user }
	},
	notFoundComponent: () => <NotFound message="user not found" />,
})

function UserProfileFeed({ userId }) {
	const { data: posts } = useSuspenseQuery(userPostsByIdOptions(userId))

	return <Feed posts={posts} />
}

function RouteComponent() {
	const { user } = Route.useLoaderData()
	const me = useMe()
	const navigate = useNavigate()
	const myProfile = user.id === me?.id

	return (
		<div>
			<button type="button" onClick={() => navigate({ to: '/home' })}>
				back
			</button>
			<p className={myProfile ? 'text-amber-600' : 'text-black'}>
				id: {user.id} username: {user.username}
			</p>
			<Suspense fallback={'loading...'}>
				<UserProfileFeed userId={user.id} />
			</Suspense>
		</div>
	)
}
