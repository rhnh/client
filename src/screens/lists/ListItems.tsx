import { css } from '@emotion/css'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IListBird } from 'utils/types'

export const ListItems: FC<{ birds: IListBird[] }> = ({ birds }) => {
  return (
    <>
      {birds?.map(bird => (
        <div
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
            Added to your list on:{' '}
            <strong> {new Date(bird.createdAt).toDateString()}</strong>
          </p>
        </div>
      ))}
    </>
  )
}
