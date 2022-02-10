import { useAuth } from 'contexts/userContext'
import { Link, Route, Routes } from 'react-router-dom'
import { Login } from './login'
import Main from './Main'
import MenuUL from 'components/Menu'
import { Register } from './register'
import Logo from '../logo61.png'
import { css } from '@emotion/css'
import { ErrorBoundary } from 'react-error-boundary'
import Footer from './Footer'
function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      {/* <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button> */}
    </div>
  )
}

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // Do something with the error
  // E.g. log to an error logging client here
  console.log(error)
}
const Authenticated = () => {
  const { logout } = useAuth()

  return (
    <>
      <div className="container">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={myErrorHandler}
        >
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
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/lists">My BirdList</Link>
              </li>
              <li className="nav-right">
                <Link to="/" onClick={() => logout()}>
                  logout
                </Link>
              </li>
            </MenuUL>
          </header>
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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </div>
        </ErrorBoundary>
      </div>
      <Footer />
    </>
  )
}

export default Authenticated
