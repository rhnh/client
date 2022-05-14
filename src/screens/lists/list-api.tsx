import { useAuth } from 'contexts/userContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { IListBird } from 'utils/types'

export const useGetUserList = (listName: string) => {
  const { token, isLogin } = useAuth()

  return useQuery<IListBird[]>(
    ['list', listName],
    async () => {
      const res = await fetch(`/api/lists/list/${listName}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (res.status === 401) {
        window.location.reload()
      }
      return await res.json()
    },
    {
      enabled: isLogin && token ? true : false,
    },
  )
}

export const useGetBirdIds = () => {
  const { token, username, isLogin } = useAuth()
  return useQuery(
    'birdIds',
    async () => {
      return fetch(`/api/lists/birds/${username}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(res => {
        if (res.status === 401) {
          window.location.reload()
        }
        return res.json()
      })
    },
    {
      enabled: isLogin && token ? true : false,
    },
  )
}

export const useLists = () => {
  const { token, isLogin } = useAuth()

  const url = '/api/lists'
  return useQuery(
    'lists',
    () =>
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        if (res.status === 401) {
          window.location.reload()
        }
        return res.json()
      }),

    { enabled: isLogin && token ? true : false },
  )
}

export const useDeleteList = () => {
  const { token } = useAuth()
  return useMutation((listName: string) => {
    return fetch(`/api/lists/${listName}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      if (res.status === 401) {
        window.location.reload()
      }
      return res.json
    })
  }, {})
}
export const useUpdateList = (listName: string) => {
  const queryClient = useQueryClient()

  const { token } = useAuth()
  return useMutation(
    ({ listId, newListName }: { listId: string; newListName: string }) => {
      return fetch(`/api/lists/list/${listId}`, {
        method: 'PUT',
        body: JSON.stringify({ newListName }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['list', listName])
        queryClient.invalidateQueries(['lists', listName])
        queryClient.invalidateQueries(['lists'])
      },
    },
  )
}
