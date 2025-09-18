import type { SessionUser } from '@app/types'
import { useSession } from '@tanstack/react-start/server'

export const useAppSession = () =>
	useSession<SessionUser>({
		// biome-ignore lint/style/noNonNullAssertion: we know this exists
		password: process.env.PASSWORD!,
	})
