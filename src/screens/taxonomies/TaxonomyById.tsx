import {
  FullPageSpinner,
  ReLoginButton,
  WarnSpan,
} from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useTaxonomy } from './taxonomies-api'
import { Taxonomy } from './Taxonomy'

export const TaxonomyById: FC = () => {
  const { isLogin } = useAuth()
  const { taxonomyId } = useParams()
  const { isLoading, data, isError, error } = useTaxonomy(taxonomyId || '')
  console.log(isLogin, 'logged')
  if (!isLogin) {
    return <ReLoginButton />
  }
  if (!data && isLoading) {
    return <FullPageSpinner />
  }
  console.log(error)
  return isLoading ? (
    <FullPageSpinner />
  ) : isError ? (
    <WarnSpan>error</WarnSpan>
  ) : data ? (
    <Taxonomy {...data} />
  ) : null
}
