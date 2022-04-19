import { FC, useEffect, useState } from 'react'
import { NavDesktop } from './NavDesktop'
import { NavMobile } from './NavMobile'

export const Nav: FC = ({ children }) => {
  const [size, setSize] = useState(window.screen.width)
  const isMobile = size < 700

  useEffect(() => {
    const changeWidth = () => {
      setSize(window.screen.width)
    }
    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])
  return isMobile ? (
    <NavMobile>{children} </NavMobile>
  ) : (
    <NavDesktop>{children}</NavDesktop>
  )
}
