import { registerMutationOptions } from '@app/options/auth'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/register')({
	component: RouteComponent,
})

function RouteComponent() {
	const { mutate, error } = useMutation(registerMutationOptions())

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
				onClick={() => mutate({ data: { username, password } })}
				type="button"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				Register
			</button>
		</div>
	)
}
