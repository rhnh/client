import { useAuth } from 'contexts/userContext'
import { QueryClient, useMutation } from 'react-query'

export const useRemoveListItem = (listName?: string) => {
  const queryClient = new QueryClient()
  const { token } = useAuth()
  return useMutation(
    ({ id }: { id: string }) => {
      if (!id || !listName) Promise.resolve(() => {})
      return fetch(`/api/lists/list/${listName}/bird/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['list', listName])
        queryClient.invalidateQueries('list')
        queryClient.invalidateQueries(listName)
      },
    },
  )
}
