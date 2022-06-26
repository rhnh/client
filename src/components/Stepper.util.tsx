import { css } from '@emotion/css'
import { FC, FormEvent, useEffect, useState } from 'react'
import { NextStepButton, PreviousStepButton, useStepper } from './Stepper'
import { Button, IconButtons } from './themed-button'
import * as colors from 'utils/colors'
import correctTick from 'assets/correct-tick.svg'

export const StepperNavButtons: FC<{
  isNextDisable?: boolean
  isFinishedDisable?: boolean
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void
}> = ({ isNextDisable = false, handleSubmit, isFinishedDisable = false }) => {
  const { total, step } = useStepper()

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        margin: '1em',
      })}
    >
      <PreviousStepButton>
        <Button type="button" variant="primary" disabled={step === 0}>
          &laquo; previous
        </Button>
      </PreviousStepButton>

      {total !== step ? (
        <NextStepButton>
          <Button type="button" disabled={isNextDisable} variant="primary">
            next &raquo;
          </Button>
        </NextStepButton>
      ) : (
        <Button disabled={isFinishedDisable} variant="danger" type="submit">
          finish
        </Button>
      )}
    </div>
  )
}

interface SIBProps {
  //StepperIndicatorBasicProps
  tilesColor?: string
}

export const StepperIndicatorBasic: FC<SIBProps> = ({ tilesColor }) => {
  const { step, setCurrentStep, total } = useStepper()
  const [totalSteps, setTotalSteps] = useState<number[]>([])

  useEffect(() => {
    setTotalSteps(Array.from(Array(total + 1).keys()))
  }, [total])
  return (
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
                onClick={() => setCurrentStep(s)}
              ></IconButtons>
            ) : (
              <IconButtons
                toolTip={`Step:${s + 1}`}
                bgImage=""
                title={`${1 + i}`}
                titleColor={`${tilesColor ? tilesColor : colors.secondaryDark}`}
              ></IconButtons>
            )}
          </li>
        )
      })}
    </ul>
  )
}
