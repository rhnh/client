import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { useGetTaxonomiesInfinite } from './taxonomies-api'
import { Birds } from './Birds'
import { SearchBar } from 'components/SearchBar'

export const Taxonomies = () => {
  const { ref, inView } = useInView()
  const [search, setSearch] = useState<string>('')
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
    if (inView) {
      if (hasNextPage) fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView])

  return (
    <div>
      <h1>List of Birds</h1>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <SearchBar
            search={search}
            reset={() => setSearch('')}
            handleChange={e => {
              setSearch(e.target.value)
            }}
          />
          {data?.pages &&
            data?.pages.map((page, index) => (
              <Birds
                taxonomies={page?.items?.filter(f =>
                  f.englishName === ''
                    ? f
                    : f.englishName
                        ?.toLowerCase()
                        .includes(search.toLowerCase()),
                )}
                key={index}
              />
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
