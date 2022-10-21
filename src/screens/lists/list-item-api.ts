import { useAuth } from 'contexts/userContext'
import { useMutation, useQueryClient } from 'react-query'
import { SERVER_URL } from 'utils/configs'

export const useRemoveListItem = (listName?: string) => {
  const queryClient = useQueryClient()
  const { token } = useAuth()
  return useMutation(
    ({ id, seen }: { id: string; seen: string }) => {
      if (!id || !listName) Promise.resolve(() => {})
      return fetch(`${SERVER_URL}/lists/list/${listName}/bird/${id}/${seen}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['list', listName])
      },
    },
  )
}
