import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	beforeLoad: (ctx) => {
		if (ctx.location.pathname === '/') throw redirect({ to: '/home' })
	},
})
