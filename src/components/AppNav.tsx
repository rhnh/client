import { useAuth } from 'contexts/userContext'
import { Link } from 'react-router-dom'
import MenuUL from './Menu'
import Logo from '../logo61.png'
import { css } from '@emotion/css'
import { FC } from 'react'

export const AppNav: FC = () => {
  const { logout, isLogin } = useAuth()

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
          <Link to="/posts">articles</Link>
        </li>
        <li>
          <Link to="/taxonomies">Birds</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <div className="nav-right">
          <li>
            <Link to="/about">about</Link>
          </li>
        </div>
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
          <Link to="/taxonomies">Birds</Link>
        </li>
        <li>
          <Link to="/lists">My BirdList</Link>
        </li>

        <div className="nav-right nav-right--logged">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={() => logout()}>
              logout
            </Link>
          </li>
        </div>
      </MenuUL>
    </header>
  )
}
