import VisuallyHidden from '@reach/visually-hidden'
import * as React from 'react'
import { callAll } from 'utils'

import '@reach/dialog/styles.css'
import { Dialog } from './themed-components'
import { CircleButton } from './themed-button'

import { css } from '@emotion/css'

const ModalContext = React.createContext<
  [isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>]
>([false, () => {}])

interface PropsModal {
  isShow?: boolean
  children: React.ReactNode
}
const Modal: React.FC<PropsModal> = ({
  isShow = false,
  ...props
}: PropsModal) => {
  const [isOpen, setIsOpen] = React.useState(isShow)
  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalDismissButton({
  children: child,
}: {
  children: React.ReactElement
}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalOpenButton({
  children: child,
}: {
  children: React.ReactElement
}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

const ModalContentsBase: React.FC = props => {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog
      aria-label="dialog"
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      {...props}
    />
  )
}

interface PropsContent {
  title: string

  children: React.ReactNode
}
const ModalContents: React.FC<PropsContent> = ({
  title,
  children,
  ...props
}: PropsContent) => {
  return (
    <ModalContentsBase {...props}>
      <div
        className={css({
          marginLeft: 'auto',
        })}
      >
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>

      <h3>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents }
