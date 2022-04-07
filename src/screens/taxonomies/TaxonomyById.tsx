import { WarnSpan } from 'components/themed-components'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useTaxonomy } from './taxonomies-api'
import { Taxonomy } from './Taxonomy'

export const TaxonomyById: FC = () => {
  const { taxonomyId } = useParams()
  const { isLoading, data, isError } = useTaxonomy(taxonomyId || '')
  if (data === undefined || isError) {
    return <WarnSpan>Something Went wrong! Please re-login</WarnSpan>
  }
  if (isLoading) {
    return <p>loading...</p>
  }
  if (isError) {
    return <p>Oops</p>
  }

  return <Taxonomy {...data} />
}
