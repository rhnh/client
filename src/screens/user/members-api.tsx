import { useAuth } from 'contexts/userContext'
import { useMutation, useQueryClient } from 'react-query'
import { SERVER_URL } from 'utils/configs'
import { IRole } from 'utils/types'

const client = ({
  method,
  token,
  pathname,
  body,
}: {
  method: string
  token: string
  pathname: string
  body?: any
}) => {
  return fetch(`${SERVER_URL}/${pathname}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
}

export const useDeleteMember = () => {
  const queryClient = useQueryClient()

  const { token } = useAuth()
  return useMutation(
    ({ username }: { username: string }) => {
      return client({
        method: 'delete',
        pathname: `users/members/${username}`,
        token,
      })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('members'),
    },
  )
}

export const usePrivilege = () => {
  const queryClient = useQueryClient()
  const { token } = useAuth()
  return useMutation(
    ({ username, role }: { username: string; role: IRole }) => {
      return client({
        method: 'put',
        pathname: `users/members/${username}`,
        token,
        body: { role },
      })
    },
    {
      onSuccess: () => queryClient.invalidateQueries('members'),
    },
  )
}
