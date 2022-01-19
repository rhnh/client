import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { Nav } from './nav'
import { NavMobile } from './nav-mobile'

interface Props {}

export const Menu = (props: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? (
    <NavMobile />
  ) : (
    <Nav>
      <li>
        <Link to="/">Home</Link>
      </li>
    </Nav>
  )
}
