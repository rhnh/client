import { css } from '@emotion/css'
import { ReLoginButton } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'
import { CreateFamily } from './CreateFamily'
import { CreateGenus } from './CreateGenus'
import { CreateOrder } from './CreateOrder'
import { CreateSpecies } from './CreateSpecies'

export const TaxonomyRoute: FC = () => {
  const { isLogin } = useAuth()
  if (!isLogin) {
    return <ReLoginButton />
  }
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        margin: 'auto',
      })}
    >
      <h3> Please Select a Category you want to add.</h3>
      <CreateOrder />
      <CreateFamily />
      <CreateGenus />
      <CreateSpecies />
    </div>
  )
}
