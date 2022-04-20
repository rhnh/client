import { css } from '@emotion/css'
import { Header } from 'components/Header'
import { AppRoutes } from 'components/Routes'
import { ErrorBoundary } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import { Footer } from 'screens/main'

import { ErrorFallback } from 'utils/error'

const UnAuthenticated = () => {
  const navigate = useNavigate()

  return (
    <>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <Header />
        <div className="content">
          <div
            className={css({
              // height: '100vh',
              '@media screen and (min-width:700px)': {
                maxWidth: '1024px',
                margin: 'auto',
              },
            })}
          >
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => navigate('/')}
            >
              {/* <Hero /> */}
              <AppRoutes />
            </ErrorBoundary>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default UnAuthenticated
