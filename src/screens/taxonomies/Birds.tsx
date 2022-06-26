import { css } from '@emotion/css'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { ITaxonomy } from 'utils/types'
import { AddTaxonomy } from './AddUserTaxonomy'
import { Species } from './Species'
import * as colors from 'utils/colors'
import { SearchBar } from 'components/SearchBar'
type Props = {
  taxonomies: ITaxonomy[]
  hasSearch?: boolean
}

export const Birds: FC<Props> = ({ taxonomies, hasSearch = false }) => {
  const [birds, setBirds] = useState<ITaxonomy[]>([])

  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    setBirds(taxonomies)
  }, [birds, search, taxonomies])

  if (!birds) {
    return <p>No bird found</p>
  }

  return (
    <div className={css({})}>
      {birds.map(t => (
        <div
          key={t._id}
          className={css({
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            margin: '2px',
          })}
        >
          <Species
            _id={t._id}
            taxonomyName={t.taxonomyName}
            rank={t.rank}
            englishName={t.englishName}
            image={t.image}
            isApproved={t.isApproved}
            username={t.username}
            credit={t.credit}
            createdAt={t.createdAt}
          />
          <div
            className={css({
              flexDirection: 'column',
              height: 'auto',
              width: 'auto',
              maxWidth: '100%',
              backgroundColor: colors.plate,
              padding: '1em',
              transition: 'height 0.5s linear',
            })}
          >
            <AddTaxonomy
              id={t._id || ''}
              englishName={t.englishName}
              taxonomyName={t.taxonomyName}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
