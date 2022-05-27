import { useEffect } from 'react'
import { useAuth } from 'contexts/userContext'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ReLoginButton } from 'components/themed-components'
import { useGetTaxonomiesInfinite } from './taxonomies-api'
import { Birds } from './utils/Birds'

export const Taxonomies = () => {
  const { isLogin } = useAuth()
  const { ref, inView } = useInView()

  const {
    status,
    data,
    error: err,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetTaxonomiesInfinite()

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
            data?.pages.map((page, index) => (
              <Birds taxonomies={page.items} key={index} />
            ))}
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
