import { useAuth } from 'contexts/userContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import slugify from 'slugify'
import { IListTaxonomy } from 'utils/types'
// get list with all its items
export const useGetListItems = (listName: string) => {
  const { token, isLogin } = useAuth()
  return useQuery<IListTaxonomy[]>(
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

      const result = await res.json()
      return result
    },
    {
      enabled: isLogin && token ? true : false,
    },
  )
}

export const useGetBirdIds = () => {
  const { token, username, isLogin } = useAuth()
  return useQuery(
    'birds',
    async () => {
      return fetch(`/api/lists/birds/${username}`, {
        method: 'GET',
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
      refetchInterval: false,
    },
  )
}
export const useGetBird = (listName: string) => {
  const { token, isLogin } = useAuth()
  return useQuery(
    'birds',
    async () => {
      return fetch(`/api/lists/detail/${listName}`, {
        method: 'GET',
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
      refetchInterval: false,
    },
  )
}

export const useGetLists = () => {
  const { token, isLogin } = useAuth()

  const url = `/api/lists`
  return useQuery(
    'lists',
    () =>
      fetch(url, {
        method: 'GET',
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
    return fetch(`/api/lists/list/${slugify(listName)}`, {
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

  const { token, username } = useAuth()
  return useMutation(
    ({ listName, newListName }: { listName: string; newListName: string }) => {
      return fetch(`/api/lists/list/${slugify(listName)}`, {
        method: 'PUT',
        body: JSON.stringify({ newListName, listName, username }),
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
