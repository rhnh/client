import { useAuth } from 'contexts/userContext'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useInfiniteQuery } from 'react-query'
import { IRank, ITaxonomy } from 'utils/types'

const getTaxonomies = async () => {
  const url = `/api/taxonomies/species`
  try {
    const response = await fetch(url)
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      return []
    }
  } catch (error) {
    console.error(error, url)
    return []
  }
}

export function useGetTaxonomiesInfinite() {
  const { isLogin, token } = useAuth()
  return useInfiniteQuery<ITaxonomy[], unknown, ITaxonomy[]>(
    'taxonomies',
    getTaxonomies,
    {
      getPreviousPageParam: firstPage => firstPage ?? undefined,
      getNextPageParam: lastPage => lastPage ?? undefined,
      enabled: isLogin && token ? true : false,
    },
  )
}

export function useGetTaxonomies() {
  const { isLogin, token } = useAuth()

  return useQuery<ITaxonomy[]>('taxonomies', getTaxonomies, {
    enabled: isLogin && token ? true : false,
  })
}

/**
 *
 * @param id of a taxonomy{bird}
 * @returns
 */
export function useTaxonomyById({ _id }: { _id: string }) {
  const { getLocalToken } = useAuth()
  const token = getLocalToken()
  return useQuery<ITaxonomy, Error>(
    ['taxonomy', _id],
    () =>
      fetch(`/api/taxonomies/id/${_id}`, {
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
      enabled: token ? true : false,
    },
  )
}

export function useGetTaxonomyByName({
  taxonomyName = '',
}: {
  taxonomyName: string
}) {
  const { getLocalToken } = useAuth()
  const token = getLocalToken()
  return useQuery<ITaxonomy, Error>(
    ['taxonomyName', taxonomyName],
    () => {
      return fetch(`/api/taxonomies/taxonomyName/${taxonomyName}`, {
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
      )
    },
    {
      enabled: token && taxonomyName ? true : false,
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
      taxonomyName,
      englishName,
    }: {
      listName: string
      englishName: string
      taxonomyName?: string
    }) => {
      return fetch(`/api/lists/list/${listName}`, {
        method: 'POST',
        body: JSON.stringify({ englishName, taxonomyName }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lists', listName])
        queryClient.invalidateQueries(['list', listName])
        queryClient.invalidateQueries('taxonomies')
        queryClient.invalidateQueries('birdIds')
      },
    },
  )
}

export function useRemoveListItem(listName: string) {
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
      return fetch(`/api/lists/list/${listName}`, {
        method: 'DELETE',
        body: JSON.stringify({ englishName, taxonomy }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries([
          ['lists', listName],
          ['taxonomies', 'infinite'],
        ]),
    },
  )
}

/**
 * useSpeciesNameOnly
 */
export function useGetSpeciesName() {
  const { token } = useAuth()
  return useQuery(['taxonomy', 'names'], () => {
    return fetch('/api/taxonomies/names', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
  })
}

//get by rank name
export function useGetByRank(rank: IRank) {
  const { token } = useAuth()
  return useQuery(
    ['ranks', rank],
    () => {
      return fetch(`/api/taxonomies/rank/${rank}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
    },
    {
      enabled: typeof token === 'string' && token !== '' ? true : false,
    },
  )
}

export function useCreate() {
  const { token } = useAuth()
  return useMutation(({ t }: { t: ITaxonomy }) => {
    return fetch(`/api/taxonomies`, {
      method: 'POST',
      body: JSON.stringify(t),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  })
}
