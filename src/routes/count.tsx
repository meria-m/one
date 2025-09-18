import { setCount } from '@app/api/count'
import { getCountOptions } from '@app/options/count'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/count')({
	component: Home,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(getCountOptions()),
})

function Home() {
	const queryClient = useQueryClient()
	const { data: count } = useQuery(getCountOptions())

	const { mutate } = useMutation({
		mutationFn: (n: number) => setCount({ data: n }),
		onSuccess: (count) => {
			queryClient.setQueryData(['count'], count)
		},
	})

	return (
		<>
			<p>count is {count}</p>
			<button
				type="button"
				onClick={() => {
					mutate(1)
				}}
			>
				+
			</button>
		</>
	)
}
