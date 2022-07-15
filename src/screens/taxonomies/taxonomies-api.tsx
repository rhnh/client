import { useAuth } from 'contexts/userContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useInfiniteQuery } from 'react-query'
import { IRank, ITaxonomy } from 'utils/types'

import { fetchTaxonomies } from './api'
/**
 *
 *################# CREATE
 *
 */

export function useAddListItem(listName: string) {
  const { getLocalToken } = useAuth()
  const token = getLocalToken()
  const queryClient = useQueryClient()

  return useMutation(
    ({
      listName,
      taxonomyName,
      englishName,
      location,
    }: {
      listName: string
      location: string
      englishName: string
      taxonomyName?: string
    }) => {
      return fetch(`/api/lists/list/${listName}`, {
        method: 'POST',
        body: JSON.stringify({ englishName, taxonomyName, location }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['list', listName])
      },
    },
  )
}
export function useCreateTaxonomy() {
  const queryClient = useQueryClient()
  const { token } = useAuth()
  return useMutation(
    async ({ taxonomy }: { taxonomy: ITaxonomy }) => {
      if (
        taxonomy.taxonomyName === '' ||
        (taxonomy.rank !== 'order' && taxonomy.parent === '')
      ) {
        return
      }
      const res = await fetch(`/api/taxonomies`, {
        method: 'post',
        body: JSON.stringify(taxonomy),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return await res.json()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ranks')
        queryClient.invalidateQueries('unapproved')
      },
    },
  )
}

/**
 *
 *################# READ
 *
 */

const getTaxonomies = async ({
  token,
  isLogin,
}: {
  token: string
  isLogin: boolean
}) => {
  const url = `/api/taxonomies/species`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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

  // const isAuth = isLogin && token ? true : false //for now
  return useInfiniteQuery(
    ['taxonomies'],
    ({ pageParam = 0 }) => fetchTaxonomies({ pageParam, token, isLogin }),
    {
      getNextPageParam: (currentPage, pages) => {
        if (currentPage.hasNextPage) {
          return currentPage.nextPage
        }
      },
      // enabled: isAuth, //for now
      refetchOnWindowFocus: false,
    },
  )
}

export function useGetTaxonomies() {
  const { isLogin, token } = useAuth()

  return useQuery<ITaxonomy[]>(
    'taxonomies',
    () => getTaxonomies({ token, isLogin }),
    {
      enabled: isLogin && token ? true : false,
    },
  )
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
      refetchOnMount: false,
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

/**
 * useSpeciesNameOnly
 */
export function useGetSpeciesName() {
  const { token } = useAuth()
  return useQuery(
    ['taxonomy', 'names'],
    async () => {
      const res = await fetch('/api/taxonomies/names', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return await res.json()
    },
    {
      enabled: token ? true : false,
    },
  )
}

/**
 *
 * @param rank
 * @returns all taxonomies for given rank
 */
export function useGetByRank(rank: IRank | '') {
  const { token } = useAuth()
  return useQuery(
    ['ranks', rank],
    async () => {
      const res = await fetch(`/api/taxonomies/rank/${rank}`, {
        method: 'GET',

        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      return await res.json()
    },
    {
      enabled:
        typeof token === 'string' &&
        token !== '' &&
        rank !== '' &&
        rank !== 'none'
          ? true
          : false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      retry: false,
      refetchIntervalInBackground: false,
    },
  )
}

/**
 *
 * @param parent
 * @returns get all taxonomies which has the given parent
 */
export function useGetByParent(parent: string) {
  const { token } = useAuth()
  return useQuery(
    ['taxonomy', parent],
    async () => {
      const res = await fetch(`/api/taxonomies/parent/${parent}`, {
        method: 'GET',

        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      return await res.json()
    },
    {
      enabled:
        typeof token === 'string' && token !== '' && parent !== '' && !!parent
          ? true
          : false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      retry: false,
      refetchIntervalInBackground: false,
    },
  )
}
/**
 *
 * @param parent
 * @parm rank
 * @returns get  all taxonomies's ancestors
 */
export function useGetAncestors({
  parent,
  rank,
}: {
  parent: string
  rank: string
}) {
  const { token } = useAuth()

  return useQuery(
    'ancestors',
    async () => {
      const res = await fetch(`/api/taxonomies/ancestors/${parent}/${rank}`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return await res.json()
    },
    {
      enabled:
        typeof token === 'string' &&
        token !== '' &&
        parent !== '' &&
        rank !== ''
          ? true
          : false,
      refetchOnWindowFocus: false,
    },
  )
}
/**
 *
 * @returns get all list of unApproved to taxonomies, which are add by mod/admin for approval.
 */
export function useGetUnApproved() {
  const { token } = useAuth()

  return useQuery(
    'unapproved',
    async () => {
      const res = await fetch(`/api/taxonomies/unapproved`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return await res.json()
    },
    {
      enabled: typeof token === 'string' && token !== '' ? true : false,
      refetchOnWindowFocus: false,
    },
  )
}

/**
 *
 *################# DELETE
 *
 */
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
 *
 *################# DELETE
 *
 */

export function useUpdateTaxonomy() {
  const queryClient = useQueryClient()
  const { token } = useAuth()
  return useMutation(
    async ({ taxonomy, id }: { taxonomy: ITaxonomy; id: string }) => {
      if (
        taxonomy.taxonomyName === '' ||
        (taxonomy.rank !== 'order' && taxonomy.parent === '') ||
        id === '' ||
        !id
      ) {
        return
      }
      const res = await fetch(`/api/taxonomies/taxonomy/${id}`, {
        method: 'put',
        body: JSON.stringify(taxonomy),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return await res.json()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ranks')
        queryClient.invalidateQueries('unapproved')
      },
    },
  )
}
