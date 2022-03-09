import { useAuth } from 'contexts/userContext'
import { useMutation, useQuery } from 'react-query'
import { SERVER_URL } from 'utils/configs'
import { ITaxonomy } from 'utils/types'

const getTaxonomies = async (): Promise<ITaxonomy[]> => {
  const response = await fetch(`${SERVER_URL}/taxonomies`)
  if (response.ok) {
    return response.json() as unknown as ITaxonomy[] | []
  } else {
    return []
  }
}

export function useTaxonomies() {
  return useQuery('taxonomies', getTaxonomies)
}

export function useAddListItem() {
  const { getLocalToken } = useAuth()
  const token = getLocalToken()

  return useMutation(
    ({
      listName,
      taxonomy,
      englishName,
    }: {
      listName: string
      englishName: string
      taxonomy: string
    }) => {
      return fetch(`${SERVER_URL}/lists/list/${listName}`, {
        method: 'POST',
        body: JSON.stringify({ englishName, taxonomy }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    },
  )
}
