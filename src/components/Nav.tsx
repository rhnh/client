import { useAuth } from 'contexts/userContext'
import { Link } from 'react-router-dom'
import MenuUL from './Menu'

import { FC } from 'react'
import { Header } from './Header'

export const Nav: FC = () => {
  const { logout, isLogin, username } = useAuth()
  return !isLogin ? (
    <Header>
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
    </Header>
  ) : (
    <Header>
      <MenuUL>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/taxonomies">Birds</Link>
        </li>
        <li>
          <Link to="/posts">articles</Link>
        </li>
        <li>
          <Link to={`/${username}/lists`}>My BirdList</Link>
        </li>

        <div className="nav-right nav-right--logged">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">{username}</Link>
          </li>
          <li>
            <Link to="/" onClick={() => logout()}>
              logout
            </Link>
          </li>
        </div>
      </MenuUL>
    </Header>
  )
}
