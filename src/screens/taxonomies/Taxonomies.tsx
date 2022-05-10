import { useState } from 'react'
import { SearchBar } from 'components/SearchBar'
import { css } from '@emotion/css'
import { Species } from './Species'
import { useTaxonomies } from './taxonomies-api'
import { FullPageSpinner } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'

export const Taxonomies = () => {
  const {
    isLoading,
    data: taxonomies,
    isError,
    error,
    isFetching,
  } = useTaxonomies()
  const { isLogin, isLoading: isLoadingAuth } = useAuth()

  const err = error as Error
  const [search, setSearch] = useState('')

  if (!isLogin) {
    return <p>Not logged in</p>
  }
  const birds = taxonomies?.filter((bird: any) => {
    if (search === '') {
      return bird
    } else {
      if (bird?.englishName) {
        return bird?.englishName
          .toLocaleLowerCase()
          .trim()
          .includes(search.toLocaleLowerCase().trim())
      } else {
        return bird
      }
    }
  })

  const birdNames: string[] = (taxonomies?.map(
    bird => bird.englishName,
  ) as string[]) || ['']

  return isLoading || isLoadingAuth ? (
    <FullPageSpinner />
  ) : isError ? (
    <p>{err.message} </p>
  ) : (
    <>
      <SearchBar data={birdNames} search={search} setSearch={setSearch} />

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        })}
      >
        {' '}
        {isFetching ? <p>...loading</p> : null}
        {birds?.map(taxonomy => {
          if (taxonomy._id === undefined && !taxonomy) {
            return <p>Not found</p>
          }
          return (
            <Species
              key={taxonomy._id}
              taxonomyName={taxonomy.taxonomyName}
              rank={taxonomy.rank}
              englishName={taxonomy.englishName}
              image={taxonomy.image}
              approved={false}
              username={''}
              _id={taxonomy._id}
              parent={taxonomy.parent}
              ancestors={taxonomy.ancestors}
            />
          )
        })}
      </div>
    </>
  )
}
