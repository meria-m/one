import { NotFound } from '@app/components/NotFound'
import { Post } from '@app/components/Post'
import { postByIdOptions } from '@app/options/posts'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$id')({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(postByIdOptions(params.id))
	},
})

function RouteComponent() {
	const navigate = useNavigate()
	const params = Route.useParams()
	const { data: post, isLoading } = useQuery(postByIdOptions(params.id))

	if (isLoading) {
		return <p>loading...</p>
	}

	if (!post) {
		return <NotFound message="post not found" />
	}

	return (
		<>
			<button type="button" onClick={() => navigate({ to: '/home' })}>
				back
			</button>
			<Post post={post} />
		</>
	)
}
