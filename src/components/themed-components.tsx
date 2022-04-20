import styled from '@emotion/styled'
import { Dialog as ReachDialog } from '@reach/dialog'
import warnIcon from 'assets/warn.svg'
import * as colors from 'utils/colors'
import { css, keyframes } from '@emotion/css'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { LinkedButton } from './themed-button'
import { FC, InputHTMLAttributes } from 'react'

type ULProps = {
  isMobile: boolean
}

const fadeIn = keyframes`
    from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
export const NavUL = styled('ul')<ULProps>(
  {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    zIndex: 1000,
    background: colors.neutral,
    height: '60%',
    animation: `${fadeIn} .2s .2s both`,
    li: {
      width: '100%',
      padding: 0,
      margin: 0,
    },
    'li> a': {
      textDecoration: 'none',
      width: '100%',
      display: 'block',
      padding: '.5em 0',
      textAlign: 'center',
      color: colors.redText,
      textTransform: 'capitalize',
      borderBottom: `2px solid ${colors.neutral}`,
    },
    'li > a:hover': {
      background: colors.neutral,
      color: colors.red,
      borderBottom: `2px solid ${colors.red}`,
    },
  },
  ({ isMobile = false }) => {
    return !isMobile
      ? {
          // justifyContent: 'space-between',
          justifyContent: 'left',

          li: {
            maxWidth: '100px',
            float: 'left',
          },
          'li>a': {
            left: 0,
          },
          '.nav-right': {
            marginLeft: 'auto',
            display: 'flex',
          },
          '.nav-right--logged>li:last-child': {
            backgroundColor: colors.base,
          },
          '.nav-right>li a': {
            padding: '.5em 2em',
          },
          '.nav-right--logged > li:last-child:hover': {
            color: 'white',
            backgroundColor: colors.secondary,
            textDecoration: 'underline',
          },
        }
      : {
          position: 'absolute',
          listStyle: 'none',
          flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center',
          paddingTop: '6em',
          width: '100%',
          height: '100%',
          li: {
            width: '100%',
            paddingBottom: '.6em',
            marginTop: 0,
            paddingTop: 0,
            padding: '1em 0',
          },
          'li > a': {
            padding: '1em',
          },
        }
  },
)

export const Input = styled('input')({
  fontSize: '1em',
  // padding: '10px 10px 10px -40px',
  // display: 'block',
  // border: 'none',
  borderBottom: `1px solid ${colors.redText}`,
  width: '100%',

  padding: '12px 20px',
  margin: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: '4px',
})

export const Label = styled('label')({
  fontSize: '1.2rem;',
  margin: '.2em 0',
  display: 'block',
})

export const Dialog = styled(ReachDialog)({
  display: 'block',
  borderRadius: '.6em',

  '@media only screen and (min-width: 600px)': {
    maxWidth: '450px',
    borderRadius: '.6em',
    paddingBottom: '3.5em',
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
    margin: '20vh auto',
  },
})

// export const LinkButton = styled(ButtonLink)({
//   padding: '.6em',
//   fontSize: '1em',
//   borderRadius: '2em',
//   width: '100%',
//   margin: '.5em .2em',
//   textTransform: 'uppercase',
//   transitionDuration: '0.2s',
//   cursor: 'pointer',
//   // color: 'black',
//   backgroundColor: colors.textLight,
//   color: 'gray',
//   border: `1px solid ${colors.textDark}`,

//   ':hover': {
//     backgroundColor: colors.textLight,
//     color: colors.textLight,
//   },
// })

interface NavProps {
  to: string
}
export const NavLink: FC<NavProps & InputHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  to,
  ...props
}) => {
  let resolved = useResolvedPath(to)
  let match = useMatch({ path: resolved.pathname, end: true })
  return (
    <Link
      className={css({
        color: match ? 'red' : 'black',
      })}
      to={to}
      {...props}
    >
      {typeof children === 'string' ? children?.toUpperCase() : children}
    </Link>
  )
}

export const WarnSpan = styled('div')({
  background: colors.danger,
  padding: '2.5em',
  borderRadius: '10px',

  margin: 0,
  backgroundImage: `url(${warnIcon})`,
  backgroundSize: '30px',
  backgroundPosition: '6px 30px',
  minHeight: '10px',
  backgroundRepeat: 'no-repeat',
  textAlign: 'left',
})

export const InfoSpan = styled('div')({
  background: colors.info,
  padding: '2.5em',
  borderRadius: '10px',
  margin: 0,
  backgroundImage: 'url(assets/info.svg)',
  backgroundSize: '30px',
  backgroundPosition: '10px 30px',
  height: '10px',
  backgroundRepeat: 'no-repeat',
  textAlign: 'left',
})
export const ReLoginButton = () => {
  return (
    <WarnSpan>
      Something Went wrong! Please{' '}
      <LinkedButton to="/login" variant="primary">
        Login
      </LinkedButton>
    </WarnSpan>
  )
}

interface PropsUL {
  isMobile: boolean
}

export const UL = styled('ul')<PropsUL>(({ isMobile = false }) => {
  return !isMobile
    ? {
        listStyle: 'none',
      }
    : {
        listStyle: 'none',
      }
})
export const LI = styled('li')<PropsUL>(({ isMobile = false }) => {
  return !isMobile
    ? {
        listStyle: 'none',
      }
    : {
        listStyle: 'none',
      }
})
