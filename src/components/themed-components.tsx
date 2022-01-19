import { CSSProperties } from '@emotion/serialize'
import styled from '@emotion/styled'
import { Dialog as ReachDialog } from '@reach/dialog'
import { getObjectKeyValue } from 'utils'
import { Link as ButtonLink } from 'react-router-dom'
import * as colors from 'utils/colors'

type ULProps = {
  isMobile: boolean
}
export const NavUL = styled('ul')<ULProps>(
  {
    display: 'flex',
    listStyle: 'none',
    width: '100%',
    margin: 0,
    padding: 0,
    zIndex: 1000,
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'black',
    height: '60%',
    li: {
      width: '100%',
      padding: 0,
      margin: 0,
    },
    'li> a': {
      textDecoration: 'none',
      width: '100%',
      display: 'block',
      padding: '1em 0',
      textAlign: 'center',
      color: 'white',
    },
    'li > a:hover': {
      color: 'white',
      background: '#aa0000',
    },
  },
  ({ isMobile = false }) => {
    return !isMobile
      ? {}
      : {
          position: 'absolute',
          listStyle: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
    color: '#fff',
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

export const Input = styled('input')({
  fontSize: '1.2erem',
  // padding: '10px 10px 10px -40px',
  // display: 'block',
  // border: 'none',
  borderBottom: `1px solid ${colors.primary}`,
  width: '100%',
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

export const LinkButton = styled(ButtonLink)({
  padding: '.6em',
  fontSize: '1em',
  borderRadius: '2em',
  width: '100%',
  margin: '.5em .2em',
  textTransform: 'uppercase',
  transitionDuration: '0.2s',
  cursor: 'pointer',
  // color: 'black',
  backgroundColor: colors.textLight,
  color: 'gray',
  border: `1px solid ${colors.textDark}`,

  ':hover': {
    backgroundColor: colors.textLight,
    color: colors.textLight,
  },
})
