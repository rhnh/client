import { useMediaQuery } from 'react-responsive'

import { NavMobile } from './nav-mobile'
import { useToggle } from 'hooks/useToggle'
import { FC } from 'react'
import { NavUL } from './themed-components'

const MenuUL: FC = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 600 })
  const { on, getTogglerProps } = useToggle()
  return isMobile ? (
    <NavMobile {...getTogglerProps({ on: on })}>{children}</NavMobile>
  ) : (
    <NavUL isMobile={false}>{children}</NavUL>
  )
}
export default MenuUL
