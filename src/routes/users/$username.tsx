import { Feed } from '@app/components/Feed'
import { NotFound } from '@app/components/NotFound'
import { userPostsById } from '@app/options/posts'
import { userByUsernameOptions } from '@app/options/users'
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
	const { data: posts } = useSuspenseQuery(userPostsById(userId))
	return <Feed posts={posts} />
}

function RouteComponent() {
	const navigate = useNavigate()
	const { user } = Route.useLoaderData()

	return (
		<div>
			<button type="button" onClick={() => navigate({ to: '/home' })}>
				back
			</button>
			<p>
				id: {user.id} username: {user.username}
			</p>
			<Suspense fallback={'loading'}>
				<UserProfileFeed userId={user.id} />
			</Suspense>
		</div>
	)
}
