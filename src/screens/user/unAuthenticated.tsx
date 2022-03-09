import { AppNav } from 'components/AppNav'
import { AppRoutes } from 'components/AppRoutes'
import { useLocation } from 'react-router-dom'
import { Footer } from 'screens/main'
import { Facts, Join } from 'screens/misc'

const UnAuthenticated = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  return (
    <>
      <div className="container">
        <AppNav />

        <div className="content">
          <AppRoutes />
          {isHome && (
            <div className="aside">
              <Join />
              <Facts />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UnAuthenticated
