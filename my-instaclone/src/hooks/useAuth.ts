import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/api-client'

export function useCurrentUser() {
  return useQuery(['auth', 'me'], async () => {
    const { data } = await api.get('users/me/')
    return data
  }, {
    retry: 0,
  })
}

export function useLogin() {
  const qc = useQueryClient()
  return useMutation(async (payload: {username: string, password: string}) => {
    const { data } = await api.post('auth/login/', payload)
    return data
  }, {
    onSuccess: () => qc.invalidateQueries(['auth', 'me']),
  })
}
