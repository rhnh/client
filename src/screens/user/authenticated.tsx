import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from 'utils/error'
import { AppRoutes } from 'components/Routes'

import { useLocation, useNavigate } from 'react-router-dom'

import { Footer } from 'screens/main'
import { Header } from 'components/Header'

const Authenticated = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  return (
    <div className="container">
      <div className="content">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => navigate('/')}
        >
          <Header />
          {/* <Hero /> */}
          <div className="center">
            <AppRoutes />
            {isHome && <div className="aside">{/* <Facts /> */}</div>}
          </div>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  )
}

export default Authenticated
