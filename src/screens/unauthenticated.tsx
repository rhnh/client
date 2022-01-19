import { Header } from 'components/header'
import { Nav } from 'components/nav'
import { Button } from 'components/themed-components'
import { UserProvider } from 'contexts/userContext'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Login } from './login'
import { Main } from './main'
import { Register } from './register'

export const Unauthenticated = () => {
  return (
    <div>
      <Header>
        <Nav></Nav>
      </Header>
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
