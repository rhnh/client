import { css } from '@emotion/css'
import { Menu } from 'components/Menu'
import { Link } from 'react-router-dom'
import Logo from '../logo2.svg'

export const Authenticated = () => {
  return (
    <div>
      <img src={Logo} alt="safarilive" />
      <Menu>
        <Link to="/">Home</Link>
      </Menu>
    </div>
  )
}
