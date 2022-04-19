import { useAuth } from 'contexts/userContext'

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
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/about">about</NavLink>
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
        <NavLink to={`/${username}/lists`}>My BirdList</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/profile">{username}</NavLink>
      </li>
      <li>
        <NavLink to="/logout" onClick={() => logout()}>
          logout
        </NavLink>
      </li>
    </Nav>
  )
}
