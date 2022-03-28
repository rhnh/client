import { useAuth } from 'contexts/userContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { SERVER_URL } from 'utils/configs'

import { ITaxonomy } from 'utils/types'

const getTaxonomies = async (): Promise<ITaxonomy[]> => {
  const url = `${SERVER_URL}/taxonomies`

  try {
    const response = await fetch(url)

    if (response.ok) {
      return response.json() as unknown as ITaxonomy[] | []
    } else {
      return []
    }
  } catch (error) {
    console.error(error, url)
    return []
  }
}

export function useTaxonomies() {
  return useQuery('taxonomies', getTaxonomies)
}

export function useTaxonomy(_id: string) {
  const { getLocalToken } = useAuth()
  const token = getLocalToken()
  return useQuery<ITaxonomy, Error>(
    ['taxonomy', _id],
    () =>
      fetch(`${SERVER_URL}/taxonomies/taxonomy/${_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(
        res => {
          if (res.ok) return res.json()
          throw new Error('something went wrong')
        },
        err => {
          return err
        },
      ),
    {
      retry: 1,
    },
  )
}

export function useAddListItem(listName: string) {
  const { getLocalToken } = useAuth()
  const token = getLocalToken()
  const queryClient = useQueryClient()

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
    {
      onSuccess: () => queryClient.invalidateQueries(['lists', listName]),
    },
  )
}
