import { css } from '@emotion/css'
import { FC } from 'react'
import Logo from 'logo61.png'
import * as colors from 'utils/colors'
import github from 'assets/github.svg'
import twitter from 'assets/twitter.svg'
export const Footer: FC = () => {
  return (
    <footer
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '2px solid #cbd5ff',
        paddingTop: '1em',

        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        backgroundColor: 'red',
        width: '100%',
        textAlign: 'center',
        background: colors.neutral,

        marginBottom: 'auto',

        ul: {
          listStyle: 'none',
          margin: '1em 0',
        },
        li: {
          padding: '.4em 0',
        },
      })}
    >
      <ul
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        })}
      >
        <li>
          <a href="/">
            <img
              src={Logo}
              alt="safarilive"
              className={css({
                maxWidth: '100px',
              })}
            />
          </a>
        </li>
        <li className="social-list__item">
          <a
            className="social-list__link"
            href="https://twitter.com/safariliveorg"
          >
            <img
              src={twitter}
              width="20px"
              alt="https://twitter.com/safariliveorg"
            />
          </a>
        </li>
        <li className="social-list__item">
          <a className="social-list__link" href="https://github.com/rhhn/">
            <img src={github} width="20px" alt="https://github.com/rhnh/" />
          </a>
        </li>
      </ul>
    </footer>
  )
}
