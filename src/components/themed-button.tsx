import { CSSProperties } from '@emotion/serialize'
import * as colors from 'utils/colors'
import styled from '@emotion/styled'
import { getObjectKeyValue } from 'utils'
import { Link, LinkProps } from 'react-router-dom'
import { ButtonHTMLAttributes, FC } from 'react'
import { css } from '@emotion/css'
import Tooltip from '@reach/tooltip'

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

export const CircleButton = styled.button({
  fontsize: '1.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  color: colors.redText,
  padding: '1em',
  marginLeft: 'auto',
})

interface Prop {
  bgImage: string
  toolTip: string
  imgStyle?: CSSProperties
}

export const IconButtons: FC<
  Prop & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ bgImage, onClick, style, toolTip, imgStyle }) => {
  return (
    <Tooltip label={toolTip}>
      <button
        onClick={onClick}
        className={css({
          border: 'none',
          padding: '.2em',
          background: 'transparent',
          maxWidth: '25px',
          maxHeight: 'auto',
          margin: '.2em',
          ...style,
        })}
      >
        <img
          src={bgImage}
          alt="x"
          className={css({
            display: 'block',
            minHeight: '20px',
            minWeight: '20px',
            ':hover': {
              opacity: 0.5,
            },
            ...imgStyle,
          })}
        ></img>
      </button>
    </Tooltip>
  )
}

export const IconLinks: FC<Prop & LinkProps> = ({
  bgImage,
  onClick,
  style,
  toolTip,
  onTouchCancel,
  ...props
}) => (
  <Tooltip label={toolTip}>
    <Link
      {...props}
      className={css({
        border: 'none',
        padding: 'none',
        margin: 0,
        background: 'transparent',
        ...style,
      })}
    >
      <img
        src={bgImage}
        alt="x"
        className={css({
          display: 'block',
          minHeight: '20px',
          minWeight: '20px',
          ':hover': {
            opacity: 0.5,
          },
        })}
      ></img>
    </Link>
  </Tooltip>
)
