import { css, keyframes } from '@emotion/css'

import React, { FC, useEffect, useState } from 'react'
import '@reach/dialog/styles.css'
import * as colors from 'utils/colors'
import { CircleButton } from 'components/themed-button'
import VisuallyHidden from '@reach/visually-hidden'
import warnIcon from 'assets/warn.svg'
import infoIcon from 'assets/info.svg'
const fadeOut = keyframes`
    from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`
interface IBanner {
  text: string
  type: 'info' | 'warn'
}
const Banner: FC<IBanner> = ({ text, type }) => {
  const [showDialog, setShowDialog] = useState<boolean>(true)
  useEffect(() => {
    if (showDialog) {
      const timeId = setTimeout(() => {
        setShowDialog(false)
      }, 5000)

      return () => {
        clearTimeout(timeId)
      }
    }
  }, [showDialog])
  return showDialog ? (
    <div
      className={css({
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        background: colors.plate,
        minHeight: '75px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: showDialog ? 'all in 2s' : '',
        animation: showDialog ? `${fadeOut} 2s 2s both` : '',
      })}
    >
      <section>
        <img
          className={css({
            maxWidth: '30%',
            height: 'auto',
            marginLeft: '1em',
          })}
          src={type === 'info' ? infoIcon : warnIcon}
          alt={type}
        />
      </section>
      <p> {text}</p>
      <CircleButton onClick={() => setShowDialog(false)}>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </CircleButton>{' '}
    </div>
  ) : null
}

export const InfoBanner = ({ text }: { text: string }) => {
  return <Banner type={'info'} text={text} />
}

export const WarnBanner = ({ text }: { text: string }) => {
  return <Banner type={'warn'} text={text} />
}
