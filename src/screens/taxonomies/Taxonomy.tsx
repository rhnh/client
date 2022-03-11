import { css } from '@emotion/css'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'
import { useTaxonomy } from './useTaxonomies'

export const TaxonomyById: FC = () => {
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

  return <Taxonomy {...data} />
}

export const Taxonomy: FC<ITaxonomy> = ({
  _id,
  englishName,
  image,
  taxonomy,
  info,
}) => {
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
        <Link to={`/taxonomy/${_id?.toLowerCase().replace(/[^a-z0-9]+/, '-')}`}>
          {image !== undefined ? (
            <img src={`/assets/${image}`} width="200px" alt={englishName}></img>
          ) : (
            <img
              src={`/assets/bird-placeholder.jpg`}
              width="200px"
              alt={englishName}
            />
          )}
        </Link>
      </div>
      <div className="desc">
        <div className="taxonomyName">Name: {englishName}</div>
        <div className="taxonomy">Species: {taxonomy}</div>
        <div className="taxonomy">{info ? <p>Info: {info}</p> : null}</div>
      </div>
    </div>
  )
}
