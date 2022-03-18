import { css } from '@emotion/css'
import { Link } from 'react-router-dom'
import Logo from '../logo61.png'
import bgImage from './background.jpg'
import { FC } from 'react'

export const Header: FC = ({ children }) => (
  <header
    className={css({
      background: `url(${bgImage}) top / 100vh `,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%',
      backgroundPositionX: '',
      backgroundPositionY: '-150px',
      boxShadow:
        ' rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
    })}
  >
    <div
      className={css({
        minHeight: '150px',
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <Link
        to="/"
        className={css({
          background: 'rgba(156,175, 120, 0.49)',
          borderRadius: '20px 0px 20px 0',
          zIndex: '1000',
          // outline: '1px solid rgba(0, 0, 180, 0.139)',
        })}
      >
        <img
          src={Logo}
          alt="safarilive"
          className={css({
            padding: '.6em',
            maxWidth: '200px',
            paddingBottom: 0,
            margin: '1em',
          })}
        />
      </Link>
    </div>

    {children}
  </header>
)
