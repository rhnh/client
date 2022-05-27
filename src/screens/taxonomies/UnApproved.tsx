import { css } from '@emotion/css'
import React, { FC } from 'react'
import { ITaxonomy } from 'utils/types'
import * as colors from 'utils/colors'
import { useGetUnApproved } from './taxonomies-api'
import { Link } from 'react-router-dom'

interface WithContributor extends ITaxonomy {
  contributor: string
  role: string
}
const ranks = ['order', 'family', 'genus', 'species']

let taxonomies: WithContributor[] = []
export const UnApproved: FC = () => {
  const { data } = useGetUnApproved()
  taxonomies = (data as WithContributor[]) || []
  return (
    <div>
      {taxonomies.map((t, i) => (
        <div
          key={t._id}
          className={css({
            display: 'flex',
            // border: '2px solid #ffeae2',
            maxWidth: '100%',
            gap: '1em',
            padding: '1em',
            transition: ' height 0.25s linear',
            margin: '1em',
            overflow: 'hidden',
            background: colors.plate,
            flexDirection: 'column',
            '@media screen and (min-width:700px)': {
              flexDirection: 'row',
              margin: '1em auto',

              maxWidth: '1024px',
            },
            img: {
              width: '100%',
            },
          })}
        >
          <Link
            to={`/taxonomies/taxonomy/id/${t._id
              ?.toString()
              .toLowerCase()
              .replace(/[^a-z0-9]+/, '-')}`}
          >
            {t.image !== undefined && t.image !== '' ? (
              <div
                className={css({
                  position: 'relative',
                })}
              >
                <img
                  src={`/assets/${t.image}`}
                  className={css({
                    width: '200px',
                    height: 'auto',
                    minWidth: '200px',
                    '@media screen and (min-width:700px)': {
                      maxWidth: '200px',
                    },
                  })}
                  alt={t.englishName || t.taxonomyName}
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
                alt={t.englishName || t.taxonomyName}
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
            <div className="taxonomyName"> {t.englishName}</div>
            <div className="taxonomy"> {t.taxonomyName}</div>
            {t.parent ? (
              <div className="taxonomy">
                <Link to={`/taxonomies/taxonomyName/${t.parent}`}>
                  {t.parent}
                </Link>
              </div>
            ) : null}
            {t.info ? (
              <div className="taxonomy">
                <p> {t.info}</p>
              </div>
            ) : null}
            {t.info ? (
              <div className="taxonomy">
                <p> {t.info}</p>
              </div>
            ) : null}
            {t.ancestors ? (
              <div>
                {t.ancestors?.map((ans, i) => (
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
          <div
            className={css({
              marginLeft: 'auto',
              display: 'flex',
              flexDirection: 'column',
            })}
          ></div>
        </div>
      ))}
    </div>
  )
}
