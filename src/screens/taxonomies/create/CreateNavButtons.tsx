import { css } from '@emotion/css'
import React, { FC } from 'react'

type Props = {
  goBack: () => void
  goForward: () => void
  step: number
  end: number
}

export const CreateNavButtons: FC<Props> = ({
  step,
  end,
  goBack,
  goForward,
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
      })}
    ></div>
  )
}
