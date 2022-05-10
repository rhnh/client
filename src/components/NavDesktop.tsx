import { css } from '@emotion/css'
import { FC } from 'react'
import * as colors from 'utils/colors'
import logo from 'logo6.png'
import { Link } from 'react-router-dom'

export const NavDesktop: FC = ({ children }) => {
  return (
    <header
      className={css({
        display: 'flex',
        flexDirection: 'row',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        justifyContent: 'space-between',
        padding: '.6em',
        alignContent: 'center',
        '@media screen and (max-width:850px)': {
          justifyContent: 'center',
          alignContent: 'left',
        },
        '@media screen and (max-width:700px)': {
          justifyContent: '',
          // alignContent: 'left',
        },
      })}
    >
      <section
        className={css({
          display: 'flex',
          alignContent: 'center',
          margin: 0,
          padding: '1em',
          maxWidth: '200px',
        })}
      >
        <Link to="/">
          <img
            src={logo}
            alt="safarilive"
            className={css({
              display: 'block',
              height: 'auto',
              width: 'auto',
              maxWidth: '200px',
              maxHeight: '50px',
              '@media screen and (max-width:850px)': {
                width: '150px',
              },
              '@media screen and (max-width:700px)': {
                justifyContent: '',
                // alignContent: 'left',
                width: '120px',
              },
            })}
          />
        </Link>
      </section>
      <section>
        <ul
          className={css({
            listStyle: 'none',
            display: 'flex',
            li: {},
            'li > a': {
              textDecoration: 'none',
              padding: '.4em',
            },
            'li > a:hover': {
              textDecoration: 'underline',
              color: colors.primary,
            },
            '@media screen and (max-width:600px)': {
              fontSize: '3em',
            },
          })}
        >
          {children}
        </ul>
      </section>
    </header>
  )
}
