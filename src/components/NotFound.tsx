import { useNavigate } from '@tanstack/react-router'
import type { FC } from 'react'

interface NotFoundProps {
	error?: any
	message: string
}

export const NotFound: FC<NotFoundProps> = ({ message }) => {
	const navigate = useNavigate()

	return (
		<div>
			<button
				type="button"
				onClick={() => {
					navigate({ to: '/home' })
				}}
			>
				home
			</button>
			<p>{message}</p>
		</div>
	)
}
