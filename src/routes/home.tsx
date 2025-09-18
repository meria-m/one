import { Post } from '@app/components/Post'
import { newFeedOptions } from '@app/options/posts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/home')({
	component: RouteComponent,
})

function NewFeed() {
	const { data: posts } = useSuspenseQuery(newFeedOptions())

	return (
		<>
			{posts.map((post) => {
				return <Post key={post.id} post={post} />
			})}
		</>
	)
}

function RouteComponent() {
	return (
		<Suspense fallback="loading...">
			<NewFeed />
		</Suspense>
	)
}
