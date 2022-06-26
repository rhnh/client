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
    color: colors.baseText,
    background: colors.tertiary,
  },
}

export const Button = styled('button')<ButtonProps>(
  {
    border: 'none',
    padding: '.2em 0.6em',
    fontSize: '1em',
    borderRadius: '2em',
    // margin: '.5em .2em',
    textTransform: 'uppercase',
    transitionDuration: '0.2s',
    cursor: 'pointer',
    color: colors.primaryText,
    margin: '.6em',
    '@media only screen and (min-width: 600px)': {
      maxWidth: '210px',
      padding: '.4em 1.6em',
    },
  },
  ({ variant: variants = 'primary', disabled = false, style }) => {
    return disabled
      ? {
          cursor: 'auto',
          // color: 'black',
          backgroundColor: colors.neutral,
          color: 'grey',
          border: `1px solid ${colors.baseText}`,
          ...style,
        }
      : variants !== 'primary'
      ? {
          ...getObjectKeyValue<any, string>(variants)(buttonVariant),
          ':hover': {
            opacity: '.8',
            background: colors.secondary,
            color: colors.secondaryText,
            ...style,
          },
        }
      : {
          ...getObjectKeyValue<any, string>(variants)(buttonVariant),
          ':hover': {
            opacity: '.8',
            ...style,
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
    padding: '.6em 1.6em',
    fontSize: '1em',
    borderRadius: '2em',
    margin: '.5em  auto',
    textTransform: 'uppercase',
    background: colors.primary,
    transitionDuration: '0.2s',
    cursor: 'pointer',

    '@media only screen and (min-width: 600px)': {
      maxWidth: '210px',
    },
  },
  ({ variant: variants = 'primary', disabled = false, style }) => {
    return disabled
      ? {
          cursor: 'auto',
          // color: 'black',
          backgroundColor: colors.neutral,
          color: 'gray',
          // border: `1px solid ${colors.orangeDark}`,
          ...style,
        }
      : variants === 'secondary'
      ? {
          ...getObjectKeyValue<any, string>(variants)(buttonVariant),
          ':hover': {
            opacity: '.8',
            background: colors.secondary,
            color: colors.secondaryText,
            ...style,
          },
        }
      : {
          ...getObjectKeyValue<any, string>(variants)(buttonVariant),
          ':hover': {
            opacity: '.8',
            ...style,
          },
        }
  },
)

export const CircleButton = styled.button({
  fontsize: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  color: colors.redText,
  // padding: '1em',
  marginLeft: 'auto',
})

interface Prop {
  bgImage: string
  toolTip: string
  imgStyle?: CSSProperties | any
  toolTipDisabled?: string
  title?: string
  titleColor?: string
}
/**
 *
 * @param - bgImage an imageIcon for, imgStyle for image
 * @returns
 */
export const IconButtons: FC<
  Prop & ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  bgImage,
  onClick,
  style,
  toolTip,
  imgStyle,
  disabled,
  toolTipDisabled,
  title,
  titleColor,
}) => {
  const tip = disabled ? toolTipDisabled : toolTip
  return (
    <div>
      <Tooltip label={tip}>
        <button
          disabled={disabled}
          onClick={onClick}
          className={css({
            border: 'none',
            // padding: '.2em',
            background: 'transparent',
            // maxWidth: '25px',
            // maxHeight: 'auto',
            // margin: '.2em',
            ...style,
            opacity: disabled ? 0.2 : 1,
          })}
        >
          {bgImage ? (
            <img
              src={bgImage}
              alt={title ?? 'x'}
              className={css({
                display: 'block',
                height: '20px',
                color: titleColor ?? 'black',
                border: `1px solid ${titleColor}`,
                borderRadius: '50%',
                padding: '.2em',
                textAlign: 'center',
                lineHeight: '20px',
                width: '20px',
                ':hover': {
                  opacity: 0.5,
                  cursor: 'pointer',
                },
                ...imgStyle,
              })}
            ></img>
          ) : (
            <span
              className={css({
                height: '6px',
                width: '6px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                color: titleColor ?? 'black',
                border: `2px solid ${titleColor}`,
                borderRadius: '50%',
                lineHeight: '5px',
                textAlign: 'center',
                padding: '6px',
                margin: 'auto',
              })}
            >
              {title}
            </span>
          )}
        </button>
      </Tooltip>
    </div>
  )
}

export const IconLinks: FC<Prop & LinkProps> = ({
  bgImage,
  onClick,
  style,
  toolTip,
  onTouchCancel,
  imgStyle,
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
          height: '20px',
          width: '20px',
          ':hover': {
            opacity: 0.5,
          },
          ...imgStyle,
        })}
      ></img>
    </Link>
  </Tooltip>
)

export const CloseButton = styled('button')({
  borderRadius: '30px',
  position: 'absolute',
  padding: '0',
  margin: 0,
  width: '40px',
  right: '1px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // background: 'red',
  // color: 'white',
  // border: `1px solid gray`,
  border: 'none',
  cursor: 'pointer',
  background: 'transparent',
  color: '#000',
  top: '1px',
  '>*': {
    fontSize: '2rem',
  },
  ':hover': {
    color: colors.tertiary,
  },
})
