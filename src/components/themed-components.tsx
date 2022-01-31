import { CSSProperties } from '@emotion/serialize'
import styled from '@emotion/styled'
import { Dialog as ReachDialog } from '@reach/dialog'
import { getObjectKeyValue } from 'utils'
import { Link } from 'react-router-dom'
import * as colors from 'utils/colors'
import { keyframes } from '@emotion/css'

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
    background: '#1c1f2b',
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
      color: '#cbd5ff',
      textTransform: 'capitalize',
    },
    'li > a:hover': {
      color: '#cbd5ff',
      background: '#aa0000',
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
          'li:last-child': {
            marginLeft: 'auto',
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

type ButtonProps = {
  variant: 'primary' | 'secondary'
  disabled?: boolean
}

interface Variants {
  primary: CSSProperties
  secondary: CSSProperties
}

const buttonVariant: Variants = {
  primary: {
    background: '#005cb2',
    color: '#cbd5ff',
  },
  secondary: {
    // border: `1px solid ${colors.secondary_dark}`,
    border: `1px solid ${colors.textDark}`,
    backgroundColor: colors.textLight,
    color: colors.textDark,
  },
}

export const Button = styled('button')<ButtonProps>(
  {
    border: 'none',
    padding: '.6em',
    fontSize: '1em',
    borderRadius: '2em',
    width: '100%',
    margin: '.5em .2em',
    textTransform: 'uppercase',
    background: '#ff0000',
    transitionDuration: '0.2s',
    cursor: 'pointer',

    '@media only screen and (min-width: 600px)': {
      maxWidth: '210px',
    },
  },
  ({ variant: variants = 'primary', disabled = false }) => {
    return disabled
      ? {
          cursor: 'auto',
          // color: 'black',
          backgroundColor: '#e76f51',
          color: 'gray',
          // border: `1px solid ${colors.primary}`,
        }
      : variants !== 'primary'
      ? {
          ...getObjectKeyValue<any, string>(variants)(buttonVariant),
          ':hover': {
            opacity: '.8',
            background: colors.textLight,
            border: `1px solid ${colors.primary}`,
            color: colors.primary,
          },
        }
      : {
          ...getObjectKeyValue<any, string>(variants)(buttonVariant),
          ':hover': {
            opacity: '.8',
          },
        }
  },
)

interface LinkedButtonProps extends ButtonProps {
  to: string
}
export const LinkedButton = styled(Link)<LinkedButtonProps>(
  {
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    border: 'none',
    padding: '.6em',
    fontSize: '1em',
    borderRadius: '2em',
    width: '100%',
    margin: '.5em .2em',
    textTransform: 'uppercase',
    background: '#ff0000',
    transitionDuration: '0.2s',
    cursor: 'pointer',

    '@media only screen and (min-width: 600px)': {
      maxWidth: '210px',
    },
  },
  ({ variant: variants = 'primary', disabled = false }) => {
    return disabled
      ? {
          cursor: 'auto',
          // color: 'black',
          backgroundColor: '#e76f51',
          color: 'gray',
          // border: `1px solid ${colors.primary}`,
        }
      : variants !== 'primary'
      ? {
          ...getObjectKeyValue<any, string>(variants)(buttonVariant),
          ':hover': {
            opacity: '.8',
            background: colors.textLight,
            border: `1px solid ${colors.primary}`,
            color: colors.primary,
          },
        }
      : {
          ...getObjectKeyValue<any, string>(variants)(buttonVariant),
          ':hover': {
            opacity: '.8',
          },
        }
  },
)

export const Input = styled('input')({
  fontSize: '1.2erem',
  // padding: '10px 10px 10px -40px',
  // display: 'block',
  // border: 'none',
  borderBottom: `1px solid ${colors.primary}`,
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

export const CircleButton = styled.button({
  fontsize: '1.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: 'none',
  background: 'none',
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
