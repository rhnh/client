import { useAuth } from 'contexts/userContext'
import { useMutation, useQuery } from 'react-query'
import { SERVER_URL } from 'utils/configs'

export const useGetUserList = (listName: string) => {
  const { getLocalToken } = useAuth()
  const token = getLocalToken()

  return useQuery(['list', listName], () => {
    return fetch(`${SERVER_URL}/lists/list/${listName}`, {
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
  return useQuery(
    'lists',
    () => {
      return fetch(`${SERVER_URL}/lists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => res.json())
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  )
}

export const useDeleteList = () => {
  const { getLocalToken } = useAuth()
  const token = getLocalToken()
  return useMutation((listName: string) => {
    return fetch(`${SERVER_URL}/lists/${listName}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  })
}
