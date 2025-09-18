import { logout } from '@app/api/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logout')({
	beforeLoad: () => logout(),
})
