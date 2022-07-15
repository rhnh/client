import { css } from '@emotion/css'

import '@reach/dialog/styles.css'
import '@reach/tooltip/styles.css'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'
import * as colors from 'utils/colors'
import { getParentRank } from 'utils/tools'

export const Species: FC<ITaxonomy> = ({
  _id,
  englishName,
  image,
  taxonomyName,
  info,
  ancestors,
  parent,
  username,
  credit,
  rank,
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
        flexDirection: 'column',
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
              src={`${image}`}
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
        <div className="taxonomyName">
          {' '}
          {rank === 'species' && (
            <span>
              <i>Species:</i>{' '}
            </span>
          )}{' '}
          {englishName}
        </div>
        <div className="taxonomy">
          <span>
            <i> {rank === 'species' ? 'Binomial' : rank}:</i>
          </span>

          {taxonomyName}
        </div>

        {parent ? (
          <div className="taxonomy">
            <span>
              <i>{getParentRank(rank).toUpperCase()}: </i>
            </span>
            <Link to={`/taxonomies/taxonomyName/${parent}`}>{parent}</Link>
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
        {username && (
          <i className={css({ alginSelf: 'flex-end' })}>Added by {username} </i>
        )}
        {credit && (
          <p>
            Thanks to imgur.com and Thanks to {credit} on <br />
            <a href={`https://unsplash.com/@${credit}`}>unsplash.com</a>{' '}
          </p>
        )}
      </div>
    </div>
  )
}
