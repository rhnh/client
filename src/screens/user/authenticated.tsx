import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from 'utils/error'
import { AppRoutes } from 'components/Routes'
import { Nav } from 'components/Nav'
import { useLocation } from 'react-router-dom'
import { Facts } from 'screens/misc'
import { Footer } from 'screens/main'

const Authenticated = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  return (
    <>
      <div className="container">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Nav />
          <div className="content">
            <AppRoutes />
            {isHome && (
              <div className="aside">
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

export default Authenticated
