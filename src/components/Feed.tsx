import type { Post as P } from '@app/types'
import { Post } from './Post'

interface FeedProps {
	posts: P[]
}

export function Feed({ posts }: FeedProps) {
	return (
		<div>
			{posts.map((post) => {
				return <Post key={post.id} post={post} />
			})}
		</div>
	)
}
