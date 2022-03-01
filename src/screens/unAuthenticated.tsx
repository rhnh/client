import { css } from '@emotion/css'
import MenuUL from 'components/Menu'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Logo from '../logo61.png'
import { Login } from './login'
import { Register } from './register'
import { FeaturedPost } from './post'
import Facts from './Facts'
import Join from './Join'
import Posts from './posts'
import AddPost from './add-post'
import { Lists } from './lists'
import { Taxonomies } from './taxonomies'

const UnAuthenticated = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  return (
    <>
      <div className="container">
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
              <Link to="/birds">Birds</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
          </MenuUL>
        </header>
        <div className="content">
          <Routes>
            <Route>
              <Route
                index
                element={
                  <div className="main">
                    <FeaturedPost
                      title={'Karula'}
                      image_url="/profiles/images/leopard.jpeg"
                      body="Karula was a Leopard"
                    />
                  </div>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route path="/birds" element={<Taxonomies />} />
              <Route path="/posts" element={<Posts />}></Route>
            </Route>
          </Routes>
          {isHome && (
            <div className="aside">
              <Join />
              <Facts />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UnAuthenticated
