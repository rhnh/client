import { css } from '@emotion/css'
import Menu from 'components/Menu'
import { UserProvider } from 'contexts/userContext'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Footer from './Footer'
import Logo from '../logo61.png'
import { Login } from './login'
import Main from './Main'
import { Register } from './register'
import Featured from './featured'
import Facts from './Facts'
import Join from './Join'
const UnAuthenticated = () => {
  const [isHome, setIsHome] = useState(true)
  return (
    <>
      <UserProvider>
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

          <Menu>
            <Link to="/" onClick={() => setIsHome(true)}>
              Home
            </Link>
            <Link onClick={() => setIsHome(false)} to="/about">
              About
            </Link>
            <Link onClick={() => setIsHome(false)} to="/login">
              Login
            </Link>
            <Link onClick={() => setIsHome(false)} to="/register">
              Register
            </Link>
            <Link onClick={() => setIsHome(false)} to="/contact">
              Contact
            </Link>
          </Menu>
        </header>
        <div className="content">
          <Routes>
            <Route>
              <Route
                index
                element={
                  <Main>
                    <Featured />
                  </Main>
                }
              />
              <Route
                path="/register"
                element={<Register ShowModel={<button>Register</button>} />}
              />
              <Route
                path="/login"
                element={<Login ShowModel={<button>Register</button>} />}
              />
            </Route>
          </Routes>
          {isHome && (
            <div className="aside">
              <Join />
              <Facts />
            </div>
          )}
        </div>
      </UserProvider>
      <Footer />
    </>
  )
}

export default UnAuthenticated
