import { css, keyframes } from '@emotion/css'

import React, { FC, useEffect, useState } from 'react'
import '@reach/dialog/styles.css'
import * as colors from 'utils/colors'
import { CircleButton } from 'components/themed-button'
import VisuallyHidden from '@reach/visually-hidden'
import warnIcon from 'assets/warn.svg'
import infoIcon from 'assets/info.svg'

import { createPortal } from 'react-dom'
import { useQuery } from 'react-query'
import { INotification } from 'utils/types'
import { useAuth } from 'contexts/userContext'

const fadeOut = keyframes`
    from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const node = document.createElement('div')
document.body.appendChild(node)

export const Notification: FC = () => {
  const { userInfo } = useAuth()
  const { data } = useQuery<INotification>(['notification'], async () => {
    const res = await fetch('/api/notifications/active')
    if (res.status === 401) {
      window.location.reload()
    }
    if (res.status === 400) {
      return {}
    }
    return await res.json()
  })

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const message = data?.message ?? ''
  const messageType = data?.messageType ?? ''

  useEffect(() => {
    if (data?.isActive) {
      setIsOpen(true)
      const timeId = setTimeout(() => {
        setIsOpen(false)
      }, 5000)

      return () => {
        setIsOpen(false)
        console.log('hello')
        clearTimeout(timeId)
      }
    }
  }, [data?.isActive, setIsOpen])

  if (!isOpen) {
    return null
  }

  return (isOpen &&
    (userInfo?.role === data?.audience ||
      userInfo?.role === 'admin' ||
      userInfo?.role === 'mod')) ||
    data?.audience === 'all'
    ? createPortal(
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
            transition: isOpen ? 'all in 2s' : '',
            animation: isOpen ? `${fadeOut} 2s 2s both` : '',
          })}
        >
          <section>
            <img
              className={css({
                maxWidth: '30%',
                height: 'auto',
                marginLeft: '1em',
              })}
              src={messageType === 'info' ? infoIcon : warnIcon}
              alt={messageType}
            />
          </section>
          <p> {message}</p>
          <CircleButton
            onClick={() => {
              setIsOpen(false)
            }}
          >
            <VisuallyHidden
              onClick={() => {
                setIsOpen(false)
              }}
            >
              Close
            </VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>{' '}
        </div>,
        node,
      )
    : null
}
