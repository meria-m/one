import { useState } from 'react'

export function Auth({ error, text, onClick }) {
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
			<button type="button" onClick={onClick}>
				{text}
			</button>
		</div>
	)
}
