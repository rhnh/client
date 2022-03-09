import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from 'utils/error'
import { AppRoutes } from 'components/AppRoutes'
import { AppNav } from 'components/AppNav'
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
          <AppNav />
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
