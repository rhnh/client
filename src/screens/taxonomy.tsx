import { css } from '@emotion/css'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Taxonomy } from 'utils/types'
interface Props {
  taxonomies: Taxonomy[]
}

export const TaxonomyScreen: FC<Props> = ({ taxonomies }: Props) => {
  console.log(taxonomies, 'hahah why')
  // return <p>hello</p>
  if (taxonomies.length <= 0 || taxonomies === undefined) {
    return <p>No Taxonomy found</p>
  }
  return (
    <>
      {taxonomies.map(t => (
        <div key={t._id}>
          <div>
            <Link
              to={`taxonomies/${t.englishName
                .toLowerCase()
                .replace(/[^a-z0-9]+/, '-')}`}
            >
              <img src={`/assets/${t.image}`} alt={t.englishName}></img>
            </Link>
          </div>
          <div className="desc">
            <p className="taxonomy-location">Binomial: {t.binomial}</p>
            <div className="cols-2">
              <p className="taxonomy-price">Species: {t.parent}</p>
            </div>
          </div>
          <div></div>
        </div>
      ))}
    </>
  )
}
