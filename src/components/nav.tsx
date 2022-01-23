import { css } from '@emotion/css'
import React, { Children, cloneElement, FC, isValidElement } from 'react'
import { NavUL } from './themed-components'

export const Nav: FC = props => {
  const { children } = props
  return (
    <div>
      <div>
        <NavUL isMobile={false}>
          {Children.map(children, child => {
            if (isValidElement(child)) {
              return <li> {cloneElement(child, {})}</li>
            }
          })}
        </NavUL>
      </div>
    </div>
  )
}
