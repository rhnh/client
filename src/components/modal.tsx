import VisuallyHidden from '@reach/visually-hidden'
import * as React from 'react'
import { callAll } from 'utils'
import * as colors from 'utils/colors'
import '@reach/dialog/styles.css'
import { DialogContent, DialogOverlay } from '@reach/dialog'

import './modal.css'
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
interface I {
  style?: React.CSSProperties
}
const ModalContentsBase: React.FC<I> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  const propsWithStyle = { ...props, style: {} }
  const { style } = props

  return (
    <DialogOverlay
      aria-label="dialog"
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      {...propsWithStyle}
    >
      <DialogContent
        className={css({
          padding: '.2em',
        })}
        aria-label="form"
        style={style}
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
const ModalContents: React.FC<
  PropsContent & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ title, children, ...props }: PropsContent) => {
  return (
    <ModalContentsBase {...props}>
      <ModalDismissButton>
        <button
          className={css({
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
              color: colors.danger,
            },
          })}
        >
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
      </ModalDismissButton>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <div
          className={css({
            padding: '.6em',
          })}
        >
          {title && <h3>{title}</h3>}
          {children}
        </div>
      </div>
    </ModalContentsBase>
  )
}

export {
  Modal,
  ModalDismissButton,
  ModalOpenButton,
  ModalContents,
  ModalContentsBase,
}
