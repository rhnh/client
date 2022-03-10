import { css } from '@emotion/css'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'

interface Props {
  taxonomies: ITaxonomy[]
}

export const Taxonomies: FC<Props> = ({ taxonomies }: Props) => {
  if (taxonomies.length <= 0 || taxonomies === undefined) {
    return <p>No Bird found</p>
  }
  return (
    <>
      {taxonomies.map((t: ITaxonomy) => (
        <div
          key={t._id}
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '2em',
            borderBottom: '2px solid green',
            padding: '1em',
          })}
        >
          <div>
            <Link
              to={`/taxonomy/${t._id
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/, '-')}`}
            >
              {t.image !== undefined ? (
                <img
                  src={`/assets/${t.image}`}
                  width="200px"
                  alt={t.englishName}
                ></img>
              ) : (
                <img
                  src={`/assets/bird-placeholder.jpg`}
                  width="200px"
                  alt={t.englishName}
                />
              )}
            </Link>
          </div>
          <div className="desc">
            <div className="taxonomyName">Name: {t.englishName}</div>
            <div className="taxonomy">Species: {t.taxonomy}</div>
          </div>
        </div>
      ))}
    </>
  )
}
