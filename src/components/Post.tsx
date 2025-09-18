import type { Post as P } from '@app/types'
import { Link } from '@tanstack/react-router'
import type { FC } from 'react'

interface PostProps {
	post: P
}

export const Post: FC<PostProps> = ({ post }) => {
	return (
		<div>
			<Link to="/users/$username" params={{ username: post.author.username }}>
				<p>post made by {post.author.username}</p>
			</Link>
			<Link to="/posts/$id" params={{ id: post.id }}>
				<b>{post.content}</b>
				<p>made in {post.createdAt.toString()}</p>
				<p>likes: {post.likes}</p>
			</Link>
		</div>
	)
}
