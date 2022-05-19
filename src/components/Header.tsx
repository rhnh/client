import { css } from '@emotion/css'
import { useAuth } from 'contexts/userContext'
import * as colors from 'utils/colors'
import { FC } from 'react'
import { Nav } from './Nav'

import { NavLink } from './themed-components'

export const Header: FC = () => {
  const { logout, isLogin, username } = useAuth()

  return !isLogin ? (
    <Nav>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/posts">articles</NavLink>
      </li>
      <li>
        <NavLink to="/taxonomies">Birds</NavLink>
      </li>
      <li>
        <NavLink to="/users/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/users/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/main/about">about</NavLink>
      </li>
    </Nav>
  ) : (
    <Nav>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/taxonomies">Birds</NavLink>
      </li>
      <li>
        <NavLink to="/posts">articles</NavLink>
      </li>
      <li>
        <NavLink to={`/lists/${username}`}>BirdLists</NavLink>
      </li>
      <li>
        <NavLink to="/main/about">About</NavLink>
      </li>
      <li>
        <NavLink to={`/users/profile/${username}`}>{username}</NavLink>
      </li>
      <li>
        <NavLink
          className={css({
            color: colors.darkSecondary,
          })}
          to="/logout"
          onClick={() => logout()}
        >
          logout
        </NavLink>
      </li>
    </Nav>
  )
}
