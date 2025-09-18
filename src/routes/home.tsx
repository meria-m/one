import { Feed } from '@app/components/Feed'
import { newFeedOptions, popularFeedOptions } from '@app/options/posts'
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

function PopularFeed() {
	const { data: posts } = useSuspenseQuery(popularFeedOptions())
	return <Feed posts={posts} />
}

function RouteComponent() {
	return (
		<div>
			<p>welcome to ur mom</p>
			<div className="flex flex-row">
				<Suspense fallback="loading new feed">
					<NewFeed />
				</Suspense>
				<Suspense fallback="loading popular feed">
					<PopularFeed />
				</Suspense>
			</div>
		</div>
	)
}
