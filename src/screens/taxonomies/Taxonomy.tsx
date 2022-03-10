import { css } from '@emotion/css'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useTaxonomy } from './useTaxonomies'

export const Taxonomy: FC = () => {
  const { taxonomyId } = useParams()
  const { isLoading, data, isError } = useTaxonomy(taxonomyId || '')
  if (data === undefined || isError) {
    return <p>Something Went wrong!</p>
  }
  if (isLoading) {
    return <p>loading...</p>
  }
  if (isError) {
    return <p>Oops</p>
  }
  const { _id, englishName, image, taxonomy, info } = data
  return (
    <div
      key={_id}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '2em',
        borderBottom: '2px solid green',
        padding: '1em',
      })}
    >
      <div>
        {image !== undefined ? (
          <img src={`/assets/${image}`} width="200px" alt={englishName} />
        ) : (
          <img
            src={`/assets/bird-placeholder.jpg`}
            width="200px"
            alt={englishName}
          />
        )}
      </div>
      <div className="desc">
        <div className="taxonomyName">Name: {englishName}</div>
        <div className="taxonomy">Species: {taxonomy}</div>
        <div className="taxonomy">Species: {taxonomy}</div>
        <div className="taxonomy">
          info:{' '}
          {info ?? (
            <span
              className={css({
                color: 'red',
              })}
            >
              No details available
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
