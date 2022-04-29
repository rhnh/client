import { useState } from 'react'
import { SearchBar } from 'components/SearchBar'
import { css } from '@emotion/css'
import { Species } from './Species'
import { useTaxonomiesInfinite } from './taxonomies-api'
import { FullPageSpinner, ReLoginButton } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'

export const Taxonomies = () => {
  const {
    isLoading,
    data: taxonomies,
    isError,
    error,
  } = useTaxonomiesInfinite()

  const err = error as Error
  const [search, setSearch] = useState('')
  const { isLogin } = useAuth()

  if (!isLogin) {
    return <ReLoginButton />
  }
  if (!taxonomies || taxonomies?.pages.flat().length <= 0) {
    return null
  }
  const birds = taxonomies?.pages?.flat().filter((bird: any) => {
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

  const birdNames: string[] = (taxonomies?.pages
    .flat()
    .map(bird => bird.englishName) as string[]) || ['']

  return isLoading ? (
    <FullPageSpinner />
  ) : isError ? (
    <p>{err.message} </p>
  ) : (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <div className="center">
        <SearchBar data={birdNames} search={search} setSearch={setSearch} />
      </div>

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
  )
}
