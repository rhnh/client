import { css } from '@emotion/css'
import { LinkedButton } from 'components/themed-button'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const Join: FC = () => {
  return (
    <section
      className={css({
        // textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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

export default Join
