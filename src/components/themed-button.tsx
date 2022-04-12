import { CSSProperties } from '@emotion/serialize'
import * as colors from 'utils/colors'
import styled from '@emotion/styled'
import { getObjectKeyValue } from 'utils'
import { Link } from 'react-router-dom'

type ButtonProps = {
  variant: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

interface Variants {
  primary: CSSProperties
  secondary: CSSProperties
  danger: CSSProperties
}

const buttonVariant: Variants = {
  primary: {
    background: colors.primary,
    color: colors.baseText,
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.secondaryText,
  },
  danger: {
    background: colors.primary,
    color: colors.primaryText,
  },
}

export const Button = styled('button')<ButtonProps>(
  {
    border: 'none',
    padding: '.6em',
    fontSize: '1em',
    borderRadius: '2em',
    width: '100%',
    // margin: '.5em .2em',
    textTransform: 'uppercase',
    transitionDuration: '0.2s',
    cursor: 'pointer',
    color: colors.primaryText,
    '@media only screen and (min-width: 600px)': {
      maxWidth: '210px',
    },
  },
  ({ variant: variants = 'primary', disabled = false }) => {
    return disabled
      ? {
          cursor: 'auto',
          // color: 'black',
          backgroundColor: colors.neutral,
          color: colors.baseText,
          border: `1px solid ${colors.baseText}`,
        }
      : variants !== 'primary'
      ? {
          ...getObjectKeyValue<any, string>(variants)(buttonVariant),
          ':hover': {
            opacity: '.8',
            background: colors.secondary,
            border: `2px solid ${colors.secondaryText}`,
            color: colors.secondaryText,
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
    background: colors.primary,
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
          backgroundColor: colors.neutral,
          color: 'gray',
          // border: `1px solid ${colors.orangeDark}`,
        }
      : variants === 'secondary'
      ? {
          ...getObjectKeyValue<any, string>(variants)(buttonVariant),
          ':hover': {
            opacity: '.8',
            background: colors.secondary,
            color: colors.secondaryText,
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
