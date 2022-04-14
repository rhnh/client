import { css } from '@emotion/css'
import Dialog from '@reach/dialog'
import { Button, CircleButton } from 'components/themed-button'

import React, { Dispatch, FC } from 'react'

type Props = {
  isOpen: boolean
  showDialog: Dispatch<'delete' | 'edit' | 'hide'>
  label?: string
  handleSubmit: () => void
  actionLabel: string
  aria: string
  title: string
}

export const CrudDialog: FC<Props> = ({
  isOpen,
  showDialog,
  label,
  handleSubmit,
  aria,
  actionLabel,
  title,
}) => {
  if (!label) {
    return <p>No list name</p>
  }
  return (
    <Dialog
      isOpen={isOpen}
      aria-label={`form ${aria}`}
      onDismiss={() => showDialog('hide')}
      className={css({
        position: 'relative',
      })}
    >
      <h2>{title}</h2>
      <CircleButton
        className={css({
          position: 'absolute',
          top: 0,
          right: 0,
        })}
        onClick={() => showDialog('hide')}
      >
        x
      </CircleButton>
      <h3>
        Are you show ? You want to{' '}
        <span>
          <strong
            className={css({
              color: 'red',
            })}
          >
            {actionLabel}
          </strong>
        </span>{' '}
        {label}
      </h3>
      <div>
        <Button variant="primary" onClick={handleSubmit}>
          Yes
        </Button>
        <Button variant="secondary" onClick={() => showDialog('hide')}>
          No
        </Button>
      </div>
    </Dialog>
  )
}
