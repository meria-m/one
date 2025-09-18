import { getCount } from '@api/count'
import { queryOptions } from '@tanstack/react-query'

export const getCountOptions = () =>
	queryOptions({
		queryKey: ['count'],
		queryFn: getCount,
	})
