import { css } from '@emotion/css'
import { FC, useRef } from 'react'
import Logo from 'logo61.png'
import * as colors from 'utils/colors'
import github from 'assets/github.svg'
import twitter from 'assets/twitter.svg'
import snakeSvg from 'assets/snake.svg'
export const Footer: FC = () => {
  const footerRef = useRef<HTMLDivElement>(null)
  const footerHeight = footerRef.current?.clientHeight || 100
  const snakePosition = footerHeight - 75
  return (
    <div
      className={css({
        position: 'relative',
        display: 'block',
      })}
    >
      <img
        src={snakeSvg}
        alt="snake"
        className={css({
          position: 'absolute',
          bottom: `${snakePosition}px`,
          margin: 'auto',
          maxWidth: '100px',
          height: 'auto',
          zIndex: 1,
        })}
      />
      <footer
        ref={footerRef}
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
          width: '100%',
          textAlign: 'center',
          background: colors.green,
          marginBottom: 'auto',
          ul: {
            listStyle: 'none',
            margin: '1em 0',
          },
          li: {
            padding: '.4em 0',
          },
          color: '#87af89',
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
            <a
              className="social-list__link"
              href="https://github.com/rhnh/client"
            >
              <img
                src={github}
                width="20px"
                alt="https://github.com/rhnh/client/"
              />
            </a>
          </li>
          <li className="social-list__item">
            <a
              className="social-list__link"
              href="https://github.com/rhnh/salio-server"
            >
              <img
                src={github}
                width="20px"
                alt="https://github.com/rhnh/salio-server/"
              />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  )
}
