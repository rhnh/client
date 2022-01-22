import { useMediaQuery } from 'react-responsive'
import { Nav } from './nav'
import { NavMobile } from './nav-mobile'
import { useToggle } from 'hooks/useToggle'
import { FC } from 'react'

export const Menu: FC = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const { on, getTogglerProps } = useToggle()
  return isMobile ? (
    <NavMobile {...getTogglerProps({ on: on })}>{children}</NavMobile>
  ) : (
    <Nav>{children}</Nav>
  )
}
