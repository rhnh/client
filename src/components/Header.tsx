import { css } from '@emotion/css'
import { Link } from 'react-router-dom'
import Logo from '../logo61.png'
import eagle from '../african-fish-eagle.jpg'
import { FC } from 'react'

export const Header: FC = ({ children }) => (
  <header
    className={css({
      background: `url(${eagle})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom 40% right 50%',
      backgroundBlendMode: 'color-burn',
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
          background: ' rgba(176, 175, 80, 0.3)',
          borderRadius: '20px 0px 20px 0',
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
