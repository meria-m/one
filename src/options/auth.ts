import { login, register } from '@app/api/auth'
import { mutationOptions } from '@tanstack/react-query'

export const loginMutationOptions = () =>
	mutationOptions({
		mutationKey: ['login'],
		mutationFn: login,
	})

export const registerMutationOptions = () =>
	mutationOptions({
		mutationKey: ['register'],
		mutationFn: register,
	})
