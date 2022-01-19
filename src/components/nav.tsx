import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo2.svg'
import { NavUL } from './themed-components'

export const Nav: FC = props => {
  const { children } = props
  return (
    <div className="navigation-bar">
      <div id="navigation-container">
        <img className="logo" src={`${logo}`} alt="safari" />
        <NavUL isMobile={false}>
          <li>
            <a href="#">Lists</a>
          </li>
          <li>
            <a href="#">On Show</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Register</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </NavUL>
      </div>
    </div>
  )
}
