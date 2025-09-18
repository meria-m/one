import { NotFound } from '@app/components/NotFound'
import { Post } from '@app/components/Post'
import { postByIdOptions } from '@app/options/posts'
import { createFileRoute, notFound, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$id')({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const post = await context.queryClient.ensureQueryData(
			postByIdOptions(params.id),
		)

		if (!post) throw notFound()

		context.queryClient.setQueryData(
			['users', { username: post.author.username }],
			post.author,
		)
		return { post }
	},
	notFoundComponent: () => <NotFound message="post not found" />,
})

function RouteComponent() {
	const navigate = useNavigate()
	const { post } = Route.useLoaderData()

	return (
		<>
			<button type="button" onClick={() => navigate({ to: '/home' })}>
				back
			</button>
			<Post post={post} />
		</>
	)
}
