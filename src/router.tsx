import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'

export const createRouter = () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { staleTime: 60 * 1000 } },
	})

	const router = createTanstackRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: 'intent',
		scrollRestoration: true,
		defaultPreloadDelay: 1000,
	})

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	})

	return router
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>
	}
}
