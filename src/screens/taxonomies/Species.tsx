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
    <section
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
      <section
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          transition: ' height 0.25s linear',
        })}
      >
        <section className="taxonomyName">
          {' '}
          {rank === 'species' && <span>Species: </span>} <em>{englishName}</em>
        </section>
        <section className="taxonomy">
          <span>{rank === 'species' ? 'Binomial' : rank}:</span>
          <em>{taxonomyName}</em>
        </section>

        {parent ? (
          <section className="taxonomy">
            <span>
              <i>{getParentRank(rank).toUpperCase()}: </i>
            </span>
            <Link to={`/taxonomies/taxonomyName/${parent}`}>{parent}</Link>
          </section>
        ) : null}

        {info ? (
          <section className="taxonomy">
            <p> {info}</p>
          </section>
        ) : null}
        {ancestors ? (
          <section>
            {ancestors?.map((ans, i) => (
              <section key={i}>
                <span>
                  {ranks[i].toUpperCase()}:{' '}
                  <Link to={`/taxonomies/taxonomyName/${ans}`}> {ans}</Link>
                </span>
              </section>
            ))}
          </section>
        ) : null}
        {username && (
          <section>
            Added by:
            <em className={css({ alginSelf: 'flex-end' })}> {username} </em>
          </section>
        )}
        {credit && (
          <section>
            <p>
              Thanks to:
              <em> imgur.com</em>
            </p>
            <p>
              Thanks to:
              <em>
                <a href={`https://unsplash.com/@${credit}`}>{credit}</a>{' '}
              </em>
            </p>
          </section>
        )}
      </section>
    </section>
  )
}
