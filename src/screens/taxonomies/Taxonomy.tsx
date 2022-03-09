import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'

export const Taxonomy: FC<ITaxonomy> = ({
  _id,
  englishName = '',
  taxonomy,
  image,
  parent,
}) => {
  return (
    <div key={_id}>
      <div>
        <Link
          to={`taxonomies/${englishName
            .toLowerCase()
            .replace(/[^a-z0-9]+/, '-')}`}
        >
          {image !== undefined ? (
            <img src={`/assets/${image}`} width="200px" alt={englishName}></img>
          ) : null}
        </Link>
      </div>
      <div className="desc">
        <p className="taxonomy-location">Binomial: {taxonomy}</p>
        <div className="cols-2">
          <p className="taxonomy-price">Species: {parent}</p>
        </div>
      </div>
      <div></div>
    </div>
  )
}
