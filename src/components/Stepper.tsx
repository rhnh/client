import { css } from '@emotion/css'
import {
  Children,
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useState,
  cloneElement,
  HtmlHTMLAttributes,
} from 'react'
import * as colors from 'utils/colors'
import { IconButtons, Button } from './themed-button'
import correctTick from 'assets/correct-tick.svg'
import { callAll } from 'utils'

interface Props {
  next(): void
  previous(): void
  step: number
}
/**
 *
 *
 *
 */
const StepperContext = createContext<Props | null>(null)

export const useStepper = () => {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error('You are using useStepper outside its Provider ')
  }
  return context
}

interface StepperProps {
  children: ReactNode
  tilesColor?: string
  isNextDisable?: boolean
}

export const NextStepButton: FC<
  { children: ReactElement } & HtmlHTMLAttributes<HTMLButtonElement>
> = ({ children }: { children: ReactElement }) => {
  const { next } = useStepper()
  return cloneElement(children, {
    onClick: callAll(() => next(), children.props.onClick),
  })
}
export const PreviousStepButton: FC<
  { children: ReactElement } & HtmlHTMLAttributes<HTMLButtonElement>
> = ({ children }: { children: ReactElement }) => {
  const { previous } = useStepper()
  return cloneElement(children, {
    onClick: callAll(() => previous(), children.props.onClick),
  })
}

export const Stepper: FC<StepperProps> = ({
  children,
  tilesColor,
  isNextDisable,
}) => {
  const [step, setStep] = useState<number>(0)
  const total = Children.count(children) - 1

  const next = () => {
    setStep(e => (e > total ? total : (e += 1)))
  }
  const previous = () => {
    setStep(e => (e < 0 ? 0 : (e -= 1)))
  }

  const arr = Children.map(children, (child, index) => {
    return index === step ? <>{child}</> : null
  })
  const totalSteps = Array.from(Array(total + 1).keys())
  return (
    <StepperContext.Provider value={{ next, previous, step }}>
      <div
        className={css({ display: 'flex', flexDirection: 'column', margin: 0 })}
      >
        <ul
          className={css({
            display: 'flex',
            margin: 0,
            justifyContent: 'center',
            alignItems: 'center',
            listStyle: 'none',
            left: 0,
            padding: '1em',
          })}
        >
          {totalSteps.map((s, i) => {
            return (
              <li
                className={css({
                  display: 'flex',
                  margin: 0,
                  left: 0,
                  // justifyContent: 'center',
                  alignItems: 'center',
                  ':not(:last-child)': { flex: 1 },
                  ':not(:last-child):after': {
                    content: '""',
                    zIndex: 2,
                    flex: 1,
                    height: '5px',
                    background:
                      s < step
                        ? tilesColor
                          ? tilesColor
                          : colors.secondary
                        : 'white',
                    borderColor: `1px solid ${
                      s < step
                        ? tilesColor
                          ? tilesColor
                          : colors.secondary
                        : colors.secondaryLight
                    }`,
                    borderRadius: '1em',
                    transition: 'all ease 0.5s',
                  },
                })}
                key={s}
              >
                {step >= i ? (
                  <IconButtons
                    toolTip={`Step:${s + 1}`}
                    bgImage={correctTick}
                    onClick={() => setStep(s)}
                  ></IconButtons>
                ) : (
                  <IconButtons
                    toolTip={`Step:${s + 1}`}
                    bgImage=""
                    title={`${1 + i}`}
                    titleColor={`${
                      tilesColor ? tilesColor : colors.secondaryDark
                    }`}
                  ></IconButtons>
                )}
              </li>
            )
          })}
        </ul>
        <div>{arr}</div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1em',
          })}
        >
          <Button
            variant="primary"
            disabled={step === 0}
            onClick={() => setStep(e => (e -= 1))}
          >
            &laquo; previous
          </Button>

          {total !== step ? (
            <Button
              disabled={isNextDisable}
              variant="primary"
              onClick={() => setStep(s => (s += 1))}
            >
              next &raquo;
            </Button>
          ) : (
            <Button variant="danger">finish</Button>
          )}
        </div>
      </div>
    </StepperContext.Provider>
  )
}
