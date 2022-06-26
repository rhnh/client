import { TaxonomiesProps } from './types'

export const fetchTaxonomies = async ({
  pageParam,
  isLogin,
  token,
}: {
  pageParam: unknown
  token: string
  isLogin: boolean
}): Promise<TaxonomiesProps> => {
  const c: number = pageParam as unknown as number

  if (!isLogin || token === '') {
    return Promise.resolve({
      page: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      totalPages: 1,
      nextPage: 1,
      previousPage: 1,
      totalItems: 1,
      items: [],
    })
  }
  const res = await fetch(`/api/taxonomies/paginated/?page=${c}&limit=2`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!isLogin && res.status === 401) {
    return Promise.resolve({
      page: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      totalPages: 1,
      nextPage: 1,
      previousPage: 1,
      totalItems: 1,
      items: [],
    })
  }

  const result = (await res.json()) as TaxonomiesProps
  return result
}
