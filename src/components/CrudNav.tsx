import {
  Children,
  cloneElement,
  FC,
  HtmlHTMLAttributes,
  isValidElement,
  ReactElement,
  useState,
} from 'react'
import settingBTN from 'assets/settings.svg'
import { IconButtons } from './themed-button'
import { css, keyframes } from '@emotion/css'
import { callAll } from 'utils'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(180deg)' },
})

type Props = {
  orientation: 'left' | 'right' | 'down' | 'up'
  children:
    | ReactElement<HtmlHTMLAttributes<HTMLButtonElement>>
    | ReactElement<HtmlHTMLAttributes<HTMLButtonElement>>[]
}

export const CRUDNav: FC<Props> = ({ orientation = 'left', children }) => {
  const [isVisible, setIsVisible] = useState(false)
  let childrenWithClick

  if (Array.isArray(children) === false && isValidElement(children)) {
    childrenWithClick = cloneElement(children, {
      onClick: callAll(() => setIsVisible(false), children.props.onClick),
    })
  } else {
    const c: ReactElement[] = (children as ReactElement[]) || []
    childrenWithClick = Children.map(c, d => {
      return cloneElement(d, {
        onClick: callAll(() => {
          setIsVisible(true)
        }, d.props.onClick),
      })
    })
  }

  switch (orientation) {
    case 'right':
      return (
        <div
          className={css({
            display: 'flex',
            padding: '.2em 1em',
            alignItems: 'center',
          })}
        >
          <IconButtons
            bgImage={settingBTN}
            toolTip={'Settings'}
            onClick={() => setIsVisible(!isVisible)}
            imgStyle={{ ':hover': { animation: `${spin} 1s linear ` } }}
          />

          {isVisible && childrenWithClick}
        </div>
      )

    case 'left':
      return (
        <div
          className={css({
            display: 'flex',
          })}
        >
          {isVisible && childrenWithClick}
          <IconButtons
            bgImage={settingBTN}
            toolTip={'Settings'}
            onClick={() => setIsVisible(!isVisible)}
          />
        </div>
      )
    case 'down':
      return (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <IconButtons
            bgImage={settingBTN}
            toolTip={'Settings'}
            onClick={() => setIsVisible(!isVisible)}
          />
          {isVisible && childrenWithClick}
        </div>
      )
    case 'up':
      return (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          {isVisible && childrenWithClick}
          <IconButtons
            bgImage={settingBTN}
            toolTip={'Settings'}
            onClick={() => setIsVisible(!isVisible)}
          />
        </div>
      )
    default:
      return null
  }
}
