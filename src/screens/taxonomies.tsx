import useTaxonomies from 'hooks/useTaxonomies'
import { ITaxonomy } from 'utils/types'
import { TaxonomyScreen } from './taxonomy'
import { ChangeEvent, useState } from 'react'

import { css } from '@emotion/css'
import { Hintput } from '@ribrary/hintput'

export const Taxonomies = () => {
  const { isLoading, data } = useTaxonomies()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const [search, setSearch] = useState('')

  const birds: ITaxonomy[] = data?.filter(bird => {
    if (search === '') {
      return bird
    } else {
      return bird.englishName
        .toLocaleLowerCase()
        .trim()
        .includes(search.toLocaleLowerCase().trim())
    }
  }) as ITaxonomy[]

  const names = data?.map(bird => bird.englishName) || ['']

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div>
      <section
        className={css({
          width: '100%',
          position: 'relative',
          display: 'flex',
        })}
      >
        <Hintput
          type="text"
          onChange={handleChange}
          onBlur={handleChange}
          name="search"
          placeholder="search"
          numberOfSuggestions={3}
          className={css({
            width: '100%',
            placeHolder: 'Search',
            fontSize: '30px', //optional
            borderStyle: 'dashed', //optional
            borderRadius: '19px', //optional
            padding: '30px',
            color: 'red',
            ':focus': {
              color: '#00B4CC;',
            },
            border: '9px solid yellow',
          })}
          items={names}
          value={search}
        />
      </section>
      <TaxonomyScreen taxonomies={birds} />
    </div>
  )
}
