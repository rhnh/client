import {
  FullPageSpinner,
  ReLoginButton,
  WarnBox,
} from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'
import { Species } from './Species'
import { useTaxonomyById } from './taxonomies-api'

export const SpeciesById: FC = () => {
  const { isLogin } = useAuth()
  const { id } = useParams()
  const { isLoading, data, isError } = useTaxonomyById({
    _id: id || '',
  })

  if (!isLogin) {
    return <ReLoginButton />
  }
  if (!data && isLoading) {
    return <FullPageSpinner />
  }

  // const t: ITaxonomy = (data as ITaxonomy) ?? []
  return isLoading ? (
    <FullPageSpinner />
  ) : isError ? (
    <WarnBox>error</WarnBox>
  ) : data ? (
    <Species {...data} />
  ) : null
}
