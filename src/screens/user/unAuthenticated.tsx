import { Nav } from 'components/Nav'
import { AppRoutes } from 'components/Routes'
import { useLocation } from 'react-router-dom'
import { Footer } from 'screens/main'
import { Facts, Join } from 'screens/misc'

const UnAuthenticated = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  return (
    <>
      <div className="container">
        <Nav />

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
