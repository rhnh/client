import { useAuth } from 'contexts/userContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { INotification } from 'utils/types'
const QName = 'notifications'
const url = '/api/notifications/'
export const useSetActive = () => {
  const { userInfo, token } = useAuth()
  const queryClient = useQueryClient()
  const isAdmin = userInfo?.role === 'admin'
  return useMutation(
    async (id: string) => {
      if (!isAdmin) {
        return Promise.resolve(() => [])
      }
      const res = await fetch(`${url}/notification/${id}`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return await res.json()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notification')
        queryClient.invalidateQueries(QName)
      },
    },
  )
}

export const useGet = () => {
  const { token, userInfo } = useAuth()
  const isAdmin = userInfo?.role === 'admin'
  return useQuery<INotification[]>(
    QName,
    async () => {
      const res = await fetch(`${url}`, {
        method: 'get',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.status === 401) {
        window.location.reload()
      }
      return await res.json()
    },
    { enabled: isAdmin },
  )
}

export const useCreate = () => {
  const { token, userInfo } = useAuth()
  const queryClient = useQueryClient()

  const isAdmin = userInfo?.role === 'admin' || userInfo?.role === 'mod'
  return useMutation(
    async (notification: INotification) => {
      if (!isAdmin) {
        return Promise.resolve(() => [])
      }
      const res = await fetch(`${url}/notification`, {
        method: 'post',
        body: JSON.stringify(notification),
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.status === 401) {
        window.location.reload()
      }
      return await res.json()
    },
    {
      onSuccess: () => queryClient.invalidateQueries(QName),
    },
  )
}

export const useGetById = (id: string) => {
  return useQuery<INotification>('notifications', async () => {
    const res = await fetch(`${url}/notification/${id}`, {})
    return await res.json()
  })
}
