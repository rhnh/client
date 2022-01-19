import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo2.svg'
import { NavUL } from './themed-components'
import { css } from '@emotion/css'
import menu from '../menu.svg'
import closeSVG from '../close.svg'
interface Props {}

export const NavMobile = (props: Props) => {
  const [toggle, setToggle] = useState<boolean>(true)

  return (
    <div>
      <div
        className={css({
          display: 'flex',
          padding: '1em',
        })}
      >
        <img
          className={css({
            display: 'block',
          })}
          src={`${logo}`}
          alt="safarilive"
        />
        <div
          className={css({
            marginLeft: 'auto',
            color: '#aa0000',
            '>img': {
              display: 'block',
            },
          })}
        >
          {toggle ? (
            <img
              src={`${closeSVG}`}
              alt="close"
              onClick={() => setToggle(false)}
            ></img>
          ) : (
            <img
              src={`${menu}`}
              alt="menu"
              onClick={() => setToggle(true)}
            ></img>
          )}
        </div>
      </div>
      {toggle && (
        <div
          className={css({
            left: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          })}
        >
          <NavUL isMobile={true}>
            <li>
              <Link to="#">Lists</Link>
            </li>
            <li>
              <Link to="#">On Show</Link>
            </li>
            <li>
              <Link to="#">Login</Link>
            </li>
            <li>
              <Link to="#">Register</Link>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
          </NavUL>
        </div>
      )}
    </div>
  )
}
