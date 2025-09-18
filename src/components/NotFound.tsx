import { useNavigate } from '@tanstack/react-router'

// biome-ignore lint/suspicious/noExplicitAny: this is ok
interface NotFoundProps<E extends Error = any> {
	error?: E
	message: string
}

export function NotFound({ message }: NotFoundProps) {
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
