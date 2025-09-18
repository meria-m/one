import { loginMutationOptions } from '@app/options/auth'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const { mutateAsync, error } = useMutation(loginMutationOptions())

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	// todo: use forms
	return (
		<div>
			{error?.message}
			<input
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				name="username"
			/>

			<input
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				name="password"
			/>

			<button
				type="button"
				onClick={() => {
					mutateAsync({ data: { username, password } }).then(() => {
						navigate({ to: '/users/@me' })
					})
				}}
			>
				login
			</button>
		</div>
	)
}
