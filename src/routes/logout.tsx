import { logout } from '@app/api/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/logout')({
	beforeLoad: () =>
		logout().then(() => {
			throw redirect({ to: '/home' })
		}),
})
