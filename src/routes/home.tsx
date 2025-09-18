import { Feed } from '@app/components/Feed'
import { newFeedOptions } from '@app/options/posts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/home')({
	component: RouteComponent,
})

function NewFeed() {
	const { data: posts } = useSuspenseQuery(newFeedOptions())
	return <Feed posts={posts} />
}

function RouteComponent() {
	return (
		<div>
			<p>welcome to ur mom</p>
			<Suspense fallback="loading...">
				<NewFeed />
			</Suspense>
		</div>
	)
}
