import { NotFound } from '@app/components/NotFound'
import { Post } from '@app/components/Post'
import { userPostsById } from '@app/options/posts'
import { userByUsernameOptions } from '@app/options/users'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/users/$username')({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(
			userByUsernameOptions(params.username),
		)
	},
})

function UserProfileFeed({ userId }) {
	const { data: posts } = useSuspenseQuery(userPostsById(userId))

	return (
		<>
			{posts.map((post) => {
				return <Post key={post.id} post={post} />
			})}
		</>
	)
}

function RouteComponent() {
	const navigate = useNavigate()
	const params = Route.useParams()
	const { data: user } = useQuery(userByUsernameOptions(params.username))

	if (!user) {
		return <NotFound message="user not found" />
	}

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
