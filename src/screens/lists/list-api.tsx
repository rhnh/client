import { useAuth } from 'contexts/userContext'
import { useMutation, useQuery } from 'react-query'
import { IList } from 'utils/types'

export const useGetUserList = (listName: string) => {
  const { token } = useAuth()

  return useQuery(['list', listName], () => {
    return fetch(`/api/lists/list/${listName}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
  })
}

export const useGetBirdIds = () => {
  const { token, username } = useAuth()
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
        return res.json()
      })
    },
    {
      enabled: !!username,
      refetchOnWindowFocus: false,
    },
  )
}

export const useLists = () => {
  const { getLocalToken } = useAuth()
  const token = getLocalToken()
  const url = '/api/lists'
  return useQuery('lists', async () => {
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const response = await data.json()
    return response as IList[]
  })
}

export const useDeleteList = () => {
  const { token } = useAuth()
  return useMutation((listName: string) => {
    return fetch(`/api/lists/${listName}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  })
}
