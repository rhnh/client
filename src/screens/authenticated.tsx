import { UserProvider } from 'contexts/userContext'
import { Link, Route, Routes } from 'react-router-dom'
import { Login } from './login'
import Main from './Main'
import Menu from 'components/Menu'
import { Register } from './register'
import Logo from '../logo61.png'
import { css } from '@emotion/css'

import Footer from './Footer'
const Authenticated = () => {
  return (
    <>
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

        <Menu>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/lists">My BirdList</Link>
          <Link to="/contact">Logout</Link>
        </Menu>
      </header>
      <UserProvider>
        <div className="">
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <Main>
                    <p>Welcome home</p>
                  </Main>
                }
              />
              <Route
                path="/login"
                element={<Login ShowModel={<button>login</button>} />}
              />
              <Route
                path="/register"
                element={<Register ShowModel={<button>Register</button>} />}
              />
            </Route>
          </Routes>
        </div>
      </UserProvider>
      <Footer />
    </>
  )
}

export default Authenticated
