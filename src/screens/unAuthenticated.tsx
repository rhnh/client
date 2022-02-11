import { css } from '@emotion/css'
import MenuUL from 'components/Menu'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Footer from './Footer'
import Logo from '../logo61.png'
import { Login } from './login'
import { Register } from './register'
import Article from './article'
import Facts from './Facts'
import Join from './Join'

const UnAuthenticated = () => {
  const [isHome, setIsHome] = useState(true)
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
              onClick={() => setIsHome(true)}
            />
          </Link>

          <MenuUL>
            <li>
              <Link to="/" onClick={() => setIsHome(true)}>
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsHome(false)} to="/articles">
                articles
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsHome(false)} to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsHome(false)} to="/register">
                Register
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsHome(false)} to="/about">
                about
              </Link>
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
                    <Article
                      title={'Karula'}
                      image_url="/profiles/images/leopard.jpeg"
                      body="Karula was a Leopard"
                    />
                  </div>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
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
