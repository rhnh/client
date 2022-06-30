import { css } from '@emotion/css'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IListTaxonomy } from 'utils/types'
import { CRUDListItems } from './CRUDListItems'

export const ListItems: FC<{ birds: IListTaxonomy[] }> = ({ birds: param }) => {
  const [birds, setBirds] = useState<IListTaxonomy[]>([])
  useEffect(() => {
    if (param) {
      setBirds(param)
    }
  }, [param])

  const listName = birds[0]?.listName

  return (
    <>
      {birds.length > 0 ? (
        birds?.map(bird => (
          <div
            key={bird.seen}
            className={css({
              padding: '1em',
              border: '1px solid gray',
              display: 'flex',
              marginBottom: '3px',
              flexDirection: 'column',
            })}
          >
            <p>
              Name:{' '}
              <Link
                to={`/taxonomies/taxonomy/id/${bird.birdId
                  ?.toLowerCase()
                  .replace(/[^a-z0-9]+/, '-')}`}
              >
                {bird.englishName}
              </Link>
            </p>
            <p>species: {bird.taxonomyName}</p>
            <p>
              Added to your list on:{' '}
              <strong>{new Date(bird.seen ?? '200').toLocaleString()}</strong>
            </p>

            <p>
              Location: <strong>{bird.location}</strong>
            </p>
            <CRUDListItems
              englishName={bird.englishName}
              id={bird.birdId}
              listName={listName}
              seen={bird.seen}
              isApproved={bird.isApproved}
            />
          </div>
        ))
      ) : (
        <p>No bird found</p>
      )}
    </>
  )
}
