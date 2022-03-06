import React, { Children, cloneElement, FC, isValidElement } from 'react'
import { NavUL } from './themed-components'

const liWrapper = (children: any) => {
  return Children.map(children, child => {
    if (isValidElement(child) && child.type === 'li') {
      return cloneElement(child, {})
    } else {
      throw new Error('You need to each <a> with <li>')
    }
  })
}

export const Nav: FC = props => {
  const { children } = props
  return (
    <div>
      <NavUL isMobile={false}>{children}</NavUL>
    </div>
  )
}
