import { css } from '@emotion/css'
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from 'components/modal'
import { Stepper, StepperContent } from 'components/Stepper'
import {
  StepperIndicatorBasic,
  StepperNavButtons,
} from 'components/Stepper.util'
import { Button, LinkedButton } from 'components/themed-button'
import {
  FlexColumn,
  InfoBox,
  ReLoginButton,
} from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FC, FormEvent, useReducer } from 'react'
import { ITaxonomy } from 'utils/types'
import { useCreateTaxonomy } from '../taxonomies-api'
import { BaseTaxonomy } from './BaseTaxonomy'

const reducer = (state: ITaxonomy, action: ITaxonomy) => {
  return { ...state, ...action }
}

export const CreateFamily: FC = () => {
  const { username, isLogin } = useAuth()

  const { mutate: save, isSuccess, reset } = useCreateTaxonomy()
  const [taxonomy, dispatch] = useReducer(reducer, {
    rank: 'family',
    isApproved: false,
    username,
    taxonomyName: '',
    englishName: '',
    parent: '',
    image: '',
    ancestors: [''],
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    save({ taxonomy })
  }

  const updateState = (t: ITaxonomy) => {
    dispatch(t)
  }

  if (isSuccess) {
    return (
      <Modal>
        <ModalContents>
          <InfoBox>Thanks for add new {taxonomy.rank}</InfoBox>
          <ModalDismissButton>
            <Button variant="secondary" onClick={() => reset()}>
              Close
            </Button>
          </ModalDismissButton>
        </ModalContents>
      </Modal>
    )
  }

  if (!isLogin) {
    return <ReLoginButton />
  }
  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="secondary">Family</Button>
      </ModalOpenButton>
      <ModalContents>
        <form onSubmit={handleSubmit}>
          <Stepper>
            <StepperIndicatorBasic />
            <StepperContent>
              <BaseTaxonomy taxonomy={taxonomy} updateTaxonomy={updateState} />
              <fieldset className={css({ minHeight: '100px' })}>
                <FlexColumn>
                  <legend>Ancestors</legend>
                  <label htmlFor="order">Order</label>
                  <input
                    type="text"
                    id="order"
                    value={taxonomy?.ancestors[0] || ''}
                    onChange={e => {
                      const temp: ITaxonomy = taxonomy
                      temp.ancestors[0] = e.target.value
                      dispatch(temp)
                    }}
                  />
                </FlexColumn>
              </fieldset>
              <div>
                {isSuccess ? (
                  <FlexColumn>
                    Thanks for contributing!
                    <ModalDismissButton>
                      <LinkedButton
                        to="/taxonomies/unapproved"
                        variant="secondary"
                      >
                        Click .
                      </LinkedButton>
                    </ModalDismissButton>
                    here to approved
                  </FlexColumn>
                ) : (
                  <FlexColumn>
                    <h2>{taxonomy.englishName}</h2>
                    <h2>{taxonomy.taxonomyName}</h2>
                    <h2>{taxonomy.info}</h2>
                  </FlexColumn>
                )}
              </div>
            </StepperContent>
            {!isSuccess && (
              <StepperNavButtons
                isFinishedDisable={
                  (taxonomy.englishName === '' &&
                    taxonomy.taxonomyName === '') ||
                  isSuccess
                }
              />
            )}
          </Stepper>
        </form>
      </ModalContents>
    </Modal>
  )
}
