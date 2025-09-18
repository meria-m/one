import { loginMutationOptions } from '@app/options/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
})

function RouteComponent() {
	const { mutateAsync } = useMutation(loginMutationOptions())
	const queryClient = useQueryClient()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const onClick = () => {
		mutateAsync({ data: { username, password } }).then(() => {
			queryClient.invalidateQueries({ queryKey: ['posts', 'feed'] })
		})
	}

	// todo: use forms
	return (
		<div>
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
			<button type="button" onClick={onClick}>
				login
			</button>
		</div>
	)
}
