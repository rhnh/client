import Footer from './Footer'
import Facts from './Facts'
import Join from './Join'
import { AppNav } from 'components/AppNav'
import { AppRoutes } from 'components/AppRoutes'
import { useLocation } from 'react-router-dom'

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
