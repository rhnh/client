import VisuallyHidden from '@reach/visually-hidden'
import { callAll } from 'utils'
import '@reach/dialog/styles.css'
import { DialogContent, DialogOverlay } from '@reach/dialog'

import './modal.css'
import { css } from '@emotion/css'
import { CloseButton } from './themed-button'
import {
  createContext,
  cloneElement,
  CSSProperties,
  Dispatch,
  FC,
  HtmlHTMLAttributes,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

const ModalContext = createContext<
  [isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>]
>([false, () => {}])

interface PropsModal {
  isShow?: boolean
  children: ReactNode
}
const Modal: FC<PropsModal> = ({ isShow = false, ...props }: PropsModal) => {
  const [isOpen, setIsOpen] = useState(isShow)
  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

const ModalDismissButton: FC<
  { children: ReactElement } & HtmlHTMLAttributes<HTMLButtonElement>
> = ({ children }: { children: ReactElement }) => {
  const [, setIsOpen] = useContext(ModalContext)
  return cloneElement(children, {
    onClick: callAll(() => setIsOpen(false), children.props.onClick),
  })
}

function ModalOpenButton({ children: child }: { children: ReactElement }) {
  const [, setIsOpen] = useContext(ModalContext)

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}
interface I {
  style?: CSSProperties
}
const ModalContentsBase: FC<I> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useContext(ModalContext)
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

  children: ReactNode
}
const ModalContents: FC<PropsContent & HtmlHTMLAttributes<HTMLDivElement>> = ({
  title,
  children,
  ...props
}: PropsContent) => {
  return (
    <ModalContentsBase {...props}>
      <ModalDismissButton>
        <CloseButton>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </CloseButton>
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
