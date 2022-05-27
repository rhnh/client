import { css } from '@emotion/css'

import '@reach/dialog/styles.css'
import '@reach/tooltip/styles.css'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'
import * as colors from 'utils/colors'

export const Species: FC<ITaxonomy> = ({
  _id,
  englishName,
  image,
  taxonomyName,
  info,
  ancestors,
  parent,
  isApproved,
}) => {
  const ranks = ['order', 'family', 'genus', 'species']

  return (
    <div
      key={_id}
      className={css({
        display: 'flex',

        gap: '1em',
        padding: '.6em',
        transition: ' height 0.25s linear',
        overflow: 'hidden',
        background: colors.plate,

        '@media screen and (min-width:700px)': {
          flexDirection: 'row',
          width: '100%',
          maxWidth: '1024px',
        },
        img: {
          width: '100%',
        },
      })}
    >
      <Link
        to={`/taxonomies/taxonomy/id/${_id
          ?.toString()
          .toLowerCase()
          .replace(/[^a-z0-9]+/, '-')}`}
      >
        {image !== undefined && image !== '' ? (
          <div
            className={css({
              position: 'relative',
            })}
          >
            <img
              src={`/assets/${image}`}
              className={css({
                width: '200px',
                height: 'auto',
                minWidth: '200px',
                '@media screen and (min-width:700px)': {
                  maxWidth: '200px',
                },
              })}
              alt={englishName}
            ></img>
          </div>
        ) : (
          <img
            src={`/assets/bird-placeholder.jpg`}
            className={css({
              height: 'auto',
              width: '200px',
              minWidth: '200px',
              '@media screen and (min-width:700px)': {
                maxWidth: '200px',
              },
            })}
            alt={englishName}
          />
        )}
      </Link>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          transition: ' height 0.25s linear',
        })}
      >
        <div className="taxonomyName"> {englishName}</div>
        <div className="taxonomy"> {taxonomyName}</div>
        {parent ? (
          <div className="taxonomy">
            <Link to={`/taxonomies/taxonomyName/${parent}`}>{parent}</Link>
          </div>
        ) : null}
        {info ? (
          <div className="taxonomy">
            <p> {info}</p>
          </div>
        ) : null}
        {info ? (
          <div className="taxonomy">
            <p> {info}</p>
          </div>
        ) : null}
        {ancestors ? (
          <div>
            {ancestors?.map((ans, i) => (
              <div key={i}>
                <span>
                  {ranks[i].toUpperCase()}:{' '}
                  <Link to={`/taxonomies/taxonomyName/${ans}`}> {ans}</Link>
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
