import { css } from '@emotion/css'
import { FC } from 'react'
import Logo from 'logo61.png'
import * as colors from 'utils/colors'
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

        alignSelf: 'flex-end',
        width: '100%',
        textAlign: 'center',
        background: colors.secondary,

        marginBottom: 'auto',

        ul: {
          listStyle: 'none',
          margin: '1em 0',
        },
        'ul > li': {
          padding: '.4em 0',
        },
        'ul > li > a ': {
          color: colors.primaryDark,
        },
        'ul > li > a:hover': {
          color: colors.PrimaryLight,
        },
      })}
    >
      <ul className="social-list">
        <li className="social-list__item">
          <a
            className="social-list__link"
            href="https://twitter.com/safariliveorg"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li className="social-list__item">
          <a className="social-list__link" href="https://github.com">
            <i className="fab fa-github"></i>
          </a>
        </li>
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
      </ul>
    </footer>
  )
}
