import { css } from '@emotion/css'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { IListBirds } from 'utils/types'

export const ListItem: FC<IListBirds> = ({ _id, englishName, seen }) => {
  return (
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
        <Link to={`/taxonomy/${_id?.toLowerCase().replace(/[^a-z0-9]+/, '-')}`}>
          {englishName}
        </Link>
      </p>
      <p>Seen: {new Date(seen).toDateString()}</p>
    </div>
  )
}
