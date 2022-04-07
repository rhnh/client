import { ITaxonomy } from 'utils/types'
import { Taxonomies } from './Taxonomies'
import { useState } from 'react'

import { SearchBar } from 'components/SearchBar'
import { useTaxonomies } from './taxonomies-api'
import { css } from '@emotion/css'

export const TaxonomyScreen = () => {
  const { isLoading, data } = useTaxonomies()
  const [search, setSearch] = useState('')
  const birds: ITaxonomy[] = data?.filter((bird: any) => {
    if (search === '') {
      return bird
    } else {
      if (bird?.englishName) {
        return bird?.englishName
          .toLocaleLowerCase()
          .trim()
          .includes(search.toLocaleLowerCase().trim())
      } else {
        return ['']
      }
    }
  }) as ITaxonomy[]
  // const names: string[] = data?.map(bird => bird.englishName)

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      })}
    >
      <SearchBar search={search} setSearch={setSearch} data={data} />
      <Taxonomies taxonomies={birds} />
    </div>
  )
}
