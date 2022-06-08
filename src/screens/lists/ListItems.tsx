import { css } from '@emotion/css'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'
import { CRUDListItems } from './CRUDListItems'

export const ListItems: FC<{ birds: ITaxonomy[]; listName: string }> = ({
  birds,
  listName,
}) => {
  return (
    <>
      {birds.length > 0 ? (
        birds?.map(bird => (
          <div
            key={bird._id}
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
                to={`/taxonomies/taxonomy/id/${bird._id
                  ?.toLowerCase()
                  .replace(/[^a-z0-9]+/, '-')}`}
              >
                {bird.englishName}
              </Link>
            </p>
            <p>
              Added to your list on: <strong></strong>
            </p>
            <CRUDListItems
              englishName={bird.englishName}
              id={bird._id}
              listName={listName}
            />
          </div>
        ))
      ) : (
        <p>No bird found</p>
      )}
    </>
  )
}
