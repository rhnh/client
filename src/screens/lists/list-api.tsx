import { useAuth } from 'contexts/userContext'
import { useMutation, useQuery } from 'react-query'
import { IList } from 'utils/types'

export const useGetUserList = (listName: string) => {
  const { getLocalToken } = useAuth()
  const token = getLocalToken()

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
  const { getLocalToken } = useAuth()
  const token = getLocalToken()
  return useMutation((listName: string) => {
    return fetch(`/api/lists/${listName}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  })
}
