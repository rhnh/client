import { css } from '@emotion/css'
import { Menu } from 'components/Menu'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logo61.png'
const Header: FC = () => {
  return (
    <header className="header">
      <img
        src={Logo}
        alt="safarilive"
        className={css({
          padding: '.6em',
          maxWidth: '200px',
          paddingBottom: 0,
        })}
      />

      <Menu>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </Menu>
    </header>
  )
}

export default Header
