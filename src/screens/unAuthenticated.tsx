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
import { ErrorBoundary } from 'react-error-boundary'
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
  // // E.g. log to an error logging client here

  // return <p>this happened</p>
  console.log(info, error)
}
const UnAuthenticated = () => {
  const [isHome, setIsHome] = useState(true)
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
                onClick={() => setIsHome(true)}
              />
            </Link>
            <button
              onClick={() => {
                throw new Error('')
              }}
            >
              opp
            </button>
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
        </ErrorBoundary>
      </div>
      <Footer />
    </>
  )
}

export default UnAuthenticated
