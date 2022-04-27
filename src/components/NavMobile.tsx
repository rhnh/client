import { css } from '@emotion/css'
import { useToggle } from 'hooks/useToggle'
import { Children, cloneElement, FC, ReactElement, useEffect } from 'react'
import { CrudButton } from './themed-button'
import menu from 'assets/menu.svg'
import closeBtn from 'assets/close.svg'
import logo from 'logo6.png'
import * as colors from 'utils/colors'
import { callAll } from 'utils'
import { Link } from 'react-router-dom'

//

export const NavMobile: FC = ({ children }) => {
  const { on, toggle } = useToggle()

  useEffect(() => {
    if (on) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [on])
  return !on ? (
    <header
      className={css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        top: 0,
        left: 0,
        right: 0,
        clear: 'both',
        marginBottom: '1em',
      })}
    >
      <Link to="/">
        <img
          src={logo}
          alt="safarilive.org"
          className={css({
            padding: 0,
            margin: 0,
            marginTop: '10px',
            marginLeft: '10px',
            height: '30px',
            width: '200px',
          })}
        />
      </Link>
      <CrudButton bgImage={menu} onClick={toggle} />
    </header>
  ) : (
    <header
      className={css({
        padding: 0,
        margin: 0,
        top: 0,
        overflow: 'hidden',
        scrollBehavior: 'unset',
      })}
    >
      <section
        className={css({
          width: '100vw',
          minHeight: '100vh',
          background: colors.plate,
          listStyle: 'none',
          position: 'absolute',
          overflow: 'hidden',
          left: 0,
          right: 0,
          top: 0,
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          zIndex: 10000,
        })}
      >
        <img
          src={closeBtn}
          alt="x"
          onClick={toggle}
          className={css({
            display: 'block',
            float: 'right',
            alignSelf: 'flex-end',
            position: 'absolute',
            padding: '15px',
            top: 0,
            right: 'auto',

            img: {
              display: 'block',
              right: 0,
            },
          })}
        />
        <ul
          className={css({
            listStyle: 'none',
            paddingTop: '2em',
            alignContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'left',
            display: 'flex',
            padding: 0,
            margin: 0,
            overflow: 'hidden',
            marginTop: '5em',
            li: {
              margin: '2em',
            },
          })}
        >
          {Children.map(children as ReactElement, lists => {
            if (lists.props)
              return Children.map(lists?.props.children, links => {
                return cloneElement(lists, {
                  onClick: callAll(() => toggle(), links.props.onClick),
                })
              })
          })}
        </ul>
      </section>
    </header>
  )
}
