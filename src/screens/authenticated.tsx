import Aside from './aside'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
export const Authenticated = () => {
  return (
    <div className="container">
      <Header />
      <Main />
      <Aside />
      <Footer />
    </div>
  )
}
