import { css } from '@emotion/css'
import { FC } from 'react'
import Logo from '../logo61.png'
import * as colors from '../utils/colors'
const Footer: FC = () => {
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
        background: '#000',

        marginBottom: 'auto',

        ul: {
          listStyle: 'none',
          margin: '1em 0',
        },
        'ul > li': {
          padding: '.4em 0',
        },
        'ul > li > a ': {
          color: colors.shadeBlue,
        },
        'ul > li > a:hover': {
          color: colors.blue,
        },
      })}
    >
      <ul className="social-list">
        <li className="social-list__item">
          <a className="social-list__link" href="http://dribbble.com">
            <i className="fab fa-dribbble"></i>
          </a>
        </li>
        <li className="social-list__item">
          <a className="social-list__link" href="https://twitter.com">
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

export default Footer
