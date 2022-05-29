import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'
import { Species } from './Species'
import { useGetTaxonomyByName } from './taxonomies-api'

export const TaxonomyName: FC = () => {
  const { taxonomyName } = useParams()
  const { isLoading, data } = useGetTaxonomyByName({
    taxonomyName: taxonomyName || '',
  })
  if (isLoading) {
    return <p>loading</p>
  }
  const taxonomies: ITaxonomy[] = data as unknown as ITaxonomy[]
  if (!taxonomies) {
    return null
  }
  if (taxonomies?.length === 0) {
    return <p>No resources found</p>
  }
  return (
    <div>
      {taxonomies && taxonomies.length >= 0 ? (
        <>
          <span>There are {taxonomies?.length} birds that belong to </span>
          <h3>{taxonomies[0]?.parent}</h3>
        </>
      ) : null}
      {taxonomies.map(taxonomy => {
        return (
          <Species
            key={taxonomy._id}
            taxonomyName={taxonomy.taxonomyName}
            rank={taxonomy.rank}
            englishName={taxonomy.englishName}
            image={taxonomy.image}
            createdAt={taxonomy.createdAt}
            credit={taxonomy.credit}
            isApproved={false}
            username={''}
            info={taxonomies.length === 1 ? taxonomy.info : ''}
            _id={taxonomy._id}
            parent={taxonomy.parent}
          />
        )
      })}
    </div>
  )
}
