import { useQuery } from '@tanstack/react-query'
import { httpClient } from '../../../shared/api'
import type { User } from '../model'

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => httpClient.get<User>(`/users/${id}`),
  })
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => httpClient.get<User[]>('/users'),
  })
}
