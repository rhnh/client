import { useToggle } from 'hooks/useToggle'
import React, { FC, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

type Props = {}

export const Menu: FC<Props> = (props: Props) => {
  const isMax = useMediaQuery({ maxWidth: 600 })

  const [size, setSize] = useState(window.screen.width)
  const isMobile = size < 600

  useEffect(() => {
    const changeWidth = () => {
      setSize(window.screen.width)
    }
    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  const { on, getTogglerProps } = useToggle()
  return <div>Menu</div>
}
