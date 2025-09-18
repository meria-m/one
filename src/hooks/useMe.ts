import { userByIdOptions } from '@app/options/users'
import { Route } from '@app/routes/__root'
import { useQuery } from '@tanstack/react-query'

export const useMe = () => {
	const { user } = Route.useRouteContext()
	const { data: me } = useQuery(userByIdOptions(user?.userId))

	return me
}
