import { useAuth } from 'contexts/userContext'
import { Link } from 'react-router-dom'
import MenuUL from './Menu'
import Logo from '../logo61.png'
import { css } from '@emotion/css'
import { FC } from 'react'

export const AppNav: FC = () => {
  const { logout, isLogin } = useAuth()
  console.log(isLogin)
  return !isLogin ? (
    <header className="header">
      <Link to="/">
        <img
          src={Logo}
          alt="safarilive"
          className={css({
            padding: '.6em',
            maxWidth: '200px',
            paddingBottom: 0,
            margin: '1em',
          })}
        />
      </Link>

      <MenuUL>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/articles">articles</Link>
        </li>
        <li>
          <Link to="/Taxonomies">Birds</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </MenuUL>
    </header>
  ) : (
    <header className="header">
      <Link to="/">
        <img
          src={Logo}
          alt="safarilive"
          className={css({
            padding: '.6em',
            maxWidth: '200px',
            paddingBottom: 0,
            margin: '1em',
          })}
        />
      </Link>
      <MenuUL>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/lists">My BirdList</Link>
        </li>

        <li className="nav-right">
          <Link to="/" onClick={() => logout()}>
            logout
          </Link>
        </li>
      </MenuUL>
    </header>
  )
}
