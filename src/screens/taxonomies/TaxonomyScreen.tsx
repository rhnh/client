import { useTaxonomies } from 'screens/taxonomies/useTaxonomies'
import { ITaxonomy } from 'utils/types'
import { Taxonomies } from './Taxonomies'
import { ChangeEvent, useState } from 'react'

import { css } from '@emotion/css'
import { Hintput } from '@ribrary/hintput'

export const TaxonomyScreen = () => {
  const { isLoading, data } = useTaxonomies()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const [search, setSearch] = useState('')

  const birds: ITaxonomy[] = data?.filter(bird => {
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
    <div>
      <section
        className={css({
          width: '100%',
          position: 'relative',
          display: 'flex',
        })}
      >
        <input
          type="text"
          onChange={handleChange}
          onBlur={handleChange}
          name="search"
          placeholder="Search"
          // numberOfSuggestions={3}
          // className={css({
          //   width: '100%',
          //   placeHolder: 'Search',
          //   fontSize: '30px', //optional
          //   borderStyle: 'dashed', //optional
          //   borderRadius: '19px', //optional
          //   padding: '30px',
          //   color: 'red',
          //   ':focus': {
          //     color: '#00B4CC;',
          //   },
          //   border: '9px solid yellow',
          // })}
          style={{
            width: '100%',
            border: '3px solid #00B4CC',
            borderRight: 'none',
            padding: '15px',
            height: '20px',
            outline: '1px solid #00B4CC',
            borderRadius: '5px 0 0 5px',
            color: '#9DBFAF',
          }}
          // items={names}
          value={search}
        />
        <button
          style={{
            float: 'left',
            width: '20%',
            padding: '10px',
            background: '#00B4CC',
            color: 'white',
            fontSize: '9px',
            outline: '1px solid #00B4CC',
            borderTop: '2px solid #00B4CC',
            borderLeft: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '0 5px 5px 0',
          }}
        >
          <i className="fa fa-search"></i>
        </button>
        )
      </section>
      <Taxonomies taxonomies={birds} />
    </div>
  )
}
