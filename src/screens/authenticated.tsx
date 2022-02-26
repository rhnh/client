import { ErrorBoundary } from 'react-error-boundary'
import Footer from './Footer'
import { ErrorFallback } from 'utils/error'
import { AppRoutes } from 'components/AppRoutes'
import { AppNav } from 'components/AppNav'

const Authenticated = () => {
  return (
    <>
      <div className="container">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppNav />
          <AppRoutes />
        </ErrorBoundary>
      </div>
      <Footer />
    </>
  )
}

export default Authenticated
