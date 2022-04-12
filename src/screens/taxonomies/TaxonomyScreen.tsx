import { Taxonomies } from './Taxonomies'
import { useState } from 'react'

import { SearchBar } from 'components/SearchBar'
import { useTaxonomiesInfinite } from './taxonomies-api'
import { css } from '@emotion/css'

export const TaxonomyScreen = () => {
  const { isLoading, data } = useTaxonomiesInfinite()
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
        return ['']
      }
    }
  })

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
      <SearchBar search={search} setSearch={setSearch} data={birds} />
      <Taxonomies taxonomies={birds} />
    </div>
  )
}
