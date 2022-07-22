import styled from '@emotion/styled'
import { Dialog as ReachDialog } from '@reach/dialog'
import warnIcon from 'assets/warn.svg'
import infoIcon from 'assets/info.svg'
import * as colors from 'utils/colors'
import { css, keyframes } from '@emotion/css'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { LinkedButton } from './themed-button'
import { FC, InputHTMLAttributes } from 'react'
import spinnerIcon from 'assets/spinner.svg'
import { Hintput } from '@ribrary/hintput'
type ULProps = {
  isMobile: boolean
}

const fadeIn = keyframes`
    from {
    opacity: 0,
  }
  to {
    opacity: 1,
  }
`
export const NavUL = styled('ul')<ULProps>(
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
)

export const Input = styled('input')({
  fontSize: '1em',
  // padding: '10px 10px 10px -40px',
  // display: 'block',
  // border: 'none',
  borderBottom: `1px solid ${colors.redText}`,
  width: 'auto',

  padding: '12px 20px',
  margin: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: '4px',
})

export const Label = styled('label')({
  fontSize: '1.2rem,',
  margin: '.2em 0',
  display: 'block',
})

export const Dialog = styled(ReachDialog)({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '.6em',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
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
        color: match ? colors.red : 'black',
      })}
      to={to}
      {...props}
    >
      {typeof children === 'string' ? children?.toUpperCase() : children}
    </Link>
  )
}

interface IPlate {
  type: 'info' | 'warn'
}

const Box = styled('div')(
  ({ type }: IPlate) => {
    return type === 'warn'
      ? {
          background: colors.tertiary,
          backgroundImage: `url(${warnIcon})`,
        }
      : {
          background: colors.info,
          backgroundImage: `url(${infoIcon})`,
        }
  },
  {
    padding: '2.5em',
    borderRadius: '10px',
    margin: '1em',
    backgroundSize: '30px',
    backgroundPosition: '6px 30px',
    minHeight: '10px',
    backgroundRepeat: 'no-repeat',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
)

export const WarnBox: FC = ({ children }) => <Box type="warn">{children}</Box>

export const InfoBox: FC = ({ children }) => <Box type="info">{children}</Box>

export const ReLoginButton = () => {
  return (
    <section
      className={css({
        maxWidth: '60%',
        margin: '2em auto',
      })}
    >
      <Box type="info">
        You are not logged in! or Something went wrong
        <LinkedButton to="/users/login" variant="primary">
          Login
        </LinkedButton>
      </Box>
    </section>
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

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const Spinner = ({ size = 20 }: { size?: number }) => (
  <img
    src={spinnerIcon}
    alt="x"
    className={css({
      maxWidth: `${size}px`,
      animation: `${spin} 1s linear infinite `,
    })}
  />
)
export const FullPageSpinner: FC = () => {
  return (
    <section
      className={css({
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <img
        src={spinnerIcon}
        className={css({
          animation: `${spin} 1s linear infinite`,
        })}
        alt="Loading..."
      />
    </section>
  )
}

export const Form = styled('form')({
  display: 'flex',
  margin: '1em',
  marginRight: ' auto',
  marginLeft: ' auto',
  flexDirection: 'column',
  width: '100%',
  '* label': {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    fontSize: '18px',
    color: '#112A46',
    height: '20px',
    marginTop: '10px',
    marginLeft: '10px',
    textAlign: 'right',
    clear: 'both',
    float: 'left',
    marginRight: '15px',
  },
  ' input': {
    height: '20px',
    width: '80%',
    border: '1px solid #000',
    marginTop: '10px',
    float: 'left',
  },
})

export const HintputStyled = styled(Hintput)({
  border: 0,
  zIndex: 1,
  backgroundColor: 'transparent',
  borderBottom: `2px solid ${colors.secondaryDark}`,
  font: 'inherit',
  fontSize: '1.125rem',
  padding: '.25rem 0',
  color: colors.tertiary,
})

export const FlexColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
})
