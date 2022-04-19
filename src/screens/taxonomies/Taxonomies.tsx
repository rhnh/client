import { useState } from 'react'

import { SearchBar } from 'components/SearchBar'

import { css } from '@emotion/css'
import { Taxonomy } from './Taxonomy'

import { useTaxonomiesInfinite } from './taxonomies-api'

export const Taxonomies = () => {
  const { isLoading, data, isError, error } = useTaxonomiesInfinite()
  const err = error as Error
  const [search, setSearch] = useState('')

  const birds = data?.pages?.flat().filter((bird: any) => {
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
  const birdNames: string[] = (data?.pages
    .flat()
    .map(bird => bird.englishName) as string[]) || ['']

  return isLoading ? (
    <p>Loading</p>
  ) : isError ? (
    <p>{err.message} </p>
  ) : (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        '@media screen and (min-width:700px)': {
          maxWidth: '1024px',
          margin: '1em auto',
        },
      })}
    >
      <SearchBar data={birdNames} search={search} setSearch={setSearch} />

      {birds?.map(taxonomy => {
        if (taxonomy._id === undefined) {
          return <p>Not found</p>
        }
        return (
          <Taxonomy
            key={taxonomy._id}
            taxonomy={taxonomy.taxonomy}
            category={taxonomy.category}
            englishName={taxonomy.englishName}
            image={taxonomy.image}
            approved={false}
            info={taxonomy.info}
            username={''}
            _id={taxonomy._id}
          ></Taxonomy>
        )
      })}
    </div>
  )
}
