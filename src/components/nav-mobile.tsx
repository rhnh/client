import React, { Children, cloneElement, FC, isValidElement } from 'react'

import { NavUL } from './themed-components'
import menu from '../menu.svg'
import closeSVG from '../close.svg'
import { css } from '@emotion/css'
interface Props {
  on?: boolean
  className?: string
  onClick?: () => any
}
export const NavMobile: FC<Props> = ({ on, onClick, children }) => {
  return !on ? (
    <img
      src={`${menu}`}
      onClick={onClick}
      alt="menu"
      className={css({
        top: 0,
        right: 0,
        position: 'absolute',
        padding: '.6em',
      })}
    ></img>
  ) : (
    <div
      className={css({
        transition: ' all .5s ease-in-out',
      })}
    >
      <NavUL isMobile={true}>
        <img
          className={css({
            top: 0,
            right: 0,
            position: 'absolute',
            padding: '.6em',
          })}
          src={`${closeSVG}`}
          onClick={onClick}
          alt="close"
        ></img>
        {Children.map(children, child => {
          if (isValidElement(child)) {
            return (
              <li>
                {cloneElement(child, {
                  onClick: onClick,
                })}
              </li>
            )
          }
        })}
      </NavUL>
    </div>
  )
}
