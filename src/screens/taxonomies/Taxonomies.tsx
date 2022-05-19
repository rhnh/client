import { useEffect } from 'react'
import { useAuth } from 'contexts/userContext'
import { ITaxonomy } from 'utils/types'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Species } from './Species'
import { ReLoginButton } from 'components/themed-components'
interface MYResult {
  page: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalPages: number
  nextPage: number
  previousPage: number
  totalItems: number
  items: ITaxonomy[]
}
export const Taxonomies = () => {
  const { isLogin, token } = useAuth()
  const { ref, inView } = useInView()

  const myFetch = async (d: unknown, token: string): Promise<MYResult> => {
    const c: number = d as unknown as number
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

    const j = (await res.json()) as MYResult
    return j
  }
  const isAuth = isLogin && token ? true : false
  const {
    status,
    data,
    error: err,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['taxonomies'],
    ({ pageParam = 0 }) => myFetch(pageParam, token),
    {
      getNextPageParam: (currentPage, pages) => {
        return currentPage.nextPage
      },
      enabled: isAuth,
    },
  )

  const error: Error = err as Error

  useEffect(() => {
    if (inView && isLogin) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, isLogin])
  if (!isLogin) {
    return <ReLoginButton />
  }
  return (
    <div>
      <h1>list of Birds</h1>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data?.pages &&
            data?.pages.map(d =>
              d.items.map(t => (
                <Species
                  key={t._id}
                  info={t.info}
                  _id={t._id}
                  taxonomyName={t.taxonomyName}
                  rank={t.rank}
                  image={t.image}
                  approved={t.approved}
                  username={t.username}
                />
              )),
            )}

          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load Newer'
                : 'Nothing more to load'}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? 'Background Updating...'
              : null}
          </div>
        </>
      )}
      <hr />
      <Link to="/about"></Link>
    </div>
  )
}
