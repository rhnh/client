import VisuallyHidden from '@reach/visually-hidden'
import * as React from 'react'
import { callAll } from 'utils'

import '@reach/dialog/styles.css'
import { DialogContent, DialogOverlay } from '@reach/dialog'
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

const ModalDismissButton: React.FC<
  { children: React.ReactElement } & React.HtmlHTMLAttributes<HTMLButtonElement>
> = ({ children }: { children: React.ReactElement }) => {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(children, {
    onClick: callAll(() => setIsOpen(false), children.props.onClick),
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

const ModalContentsBase: React.FC = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)

  return (
    <DialogOverlay
      aria-label="dialog"
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      {...props}
      className={css({
        position: 'relative',
      })}
    >
      <DialogContent
        className={css({
          padding: '.2em',
          position: 'relative',
        })}
      >
        {children}
      </DialogContent>
    </DialogOverlay>
  )
}

interface PropsContent {
  title?: string

  children: React.ReactNode
}
const ModalContents: React.FC<PropsContent> = ({
  title,
  children,
  ...props
}: PropsContent) => {
  return (
    <ModalContentsBase {...props}>
      <ModalDismissButton>
        <CircleButton
          className={css({
            position: 'absolute',
            top: '10px',
            right: '10px',
          })}
        >
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </CircleButton>
      </ModalDismissButton>

      {title && <h3>{title}</h3>}
      {children}
    </ModalContentsBase>
  )
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents }
