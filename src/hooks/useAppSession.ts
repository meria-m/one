import type { SessionUser } from '@app/types'
import { useSession } from '@tanstack/react-start/server'

export const useAppSession = () =>
	useSession<SessionUser>({
		password: process.env.PASSWORD!,
	})
