import { ErrorBoundary } from 'react-error-boundary'
import Footer from './Footer'
import { ErrorFallback } from 'utils/error'
import { AppRoutes } from 'components/AppRoutes'
import { AppNav } from 'components/AppNav'
import Join from './Join'
import Facts from './Facts'
import { useLocation } from 'react-router-dom'

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
