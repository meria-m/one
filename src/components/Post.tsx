import type { Post as P } from '@app/types'
import { Link } from '@tanstack/react-router'

interface PostProps {
	post: P
}

export function Post({ post }: PostProps) {
	return (
		<div className="text-red-500">
			<Link to="/users/$username" params={{ username: post.author.username }}>
				<p>post made by {post.author.username}</p>
			</Link>
			<Link to="/posts/$id" params={{ id: post.id }}>
				<p>{post.content}</p>
				<p>made in {post.createdAt.toString()}</p>
				<p>likes: {post.likes}</p>
			</Link>
		</div>
	)
}
