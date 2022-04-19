import { css } from '@emotion/css'
import { LinkedButton } from 'components/themed-button'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const Join: FC = () => {
  return (
    <section
      className={css({
        // textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',

        marginBottom: '1em',
      })}
    >
      <h3>Join to create birding list</h3>
      <LinkedButton to="/register" variant="primary">
        Register
      </LinkedButton>
      <LinkedButton variant="secondary" to="/login">
        Login
      </LinkedButton>
      <Outlet />
    </section>
  )
}
