import { Menu } from 'components/Menu'
import { Button } from 'components/themed-components'
import { UserProvider } from 'contexts/userContext'
import { Link, Route, Routes } from 'react-router-dom'
import { Login } from './login'
import { Main } from './main'
import { Register } from './register'
import Logo from '../logo2.svg'
export const Unauthenticated = () => {
  return (
    <div>
      <img src={Logo} alt="safarilive" />

      <Menu>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </Menu>
      <UserProvider>
        <div className="container">
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
        <Button variant="primary">My button</Button>
        <Button variant="secondary">My button</Button>
      </UserProvider>
    </div>
  )
}
