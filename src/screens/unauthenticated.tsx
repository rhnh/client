import { UserProvider } from 'contexts/userContext'
import { Route, Routes } from 'react-router-dom'
import { Login } from './login'
import Main from './Main'
import { Register } from './register'
import Logo from '../logo61.png'
import { css } from '@emotion/css'

import Footer from './Footer'
export const Unauthenticated = () => {
  return (
    <div>
      <img
        src={Logo}
        alt="safarilive"
        className={css({
          padding: '.6em',
          maxWidth: '200px',
          paddingBottom: 0,
        })}
      />
      <UserProvider>
        <div className="">
          <Routes>
            <Route path="/">
              <Route index element={<Main />} />
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
    </div>
  )
}
