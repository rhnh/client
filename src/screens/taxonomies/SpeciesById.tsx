import {
  FullPageSpinner,
  ReLoginButton,
  WarnBox,
} from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useTaxonomyById } from './taxonomies-api'
import { Species } from './Species'

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

  return isLoading ? (
    <FullPageSpinner />
  ) : isError ? (
    <WarnBox>error</WarnBox>
  ) : data ? (
    <Species {...data} />
  ) : null
}
