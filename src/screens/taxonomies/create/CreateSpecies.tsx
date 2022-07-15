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

export const CreateSpecies: FC = () => {
  const { username, isLogin } = useAuth()
  const { mutate: save, isSuccess, reset } = useCreateTaxonomy()
  console.log(username)
  const [taxonomy, dispatch] = useReducer(reducer, {
    rank: 'species',
    isApproved: false,
    username,
    taxonomyName: '',
    englishName: '',
    parent: '',
    image: '',
    ancestors: [],
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    save({ taxonomy })
  }

  const updateState = (t: ITaxonomy) => {
    dispatch(t)
  }

  if (!isLogin) {
    return <ReLoginButton />
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

  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="secondary">Species</Button>
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
                  <label htmlFor="family">Family</label>
                  <input
                    type="text"
                    id="family"
                    value={taxonomy?.ancestors[1] || ''}
                    onChange={e => {
                      const temp: ITaxonomy = taxonomy
                      temp.ancestors[1] = e.target.value
                      dispatch(temp)
                    }}
                  />
                  <label htmlFor="genus">Genus</label>
                  <input
                    type="text"
                    id="genus"
                    value={taxonomy?.ancestors[2] || ''}
                    onChange={e => {
                      const temp: ITaxonomy = taxonomy
                      temp.ancestors[2] = e.target.value
                      dispatch(temp)
                    }}
                  />
                </FlexColumn>
              </fieldset>
              <FlexColumn>
                <label htmlFor="credit">Credit for image</label>
                <input
                  type="text"
                  id="credit"
                  onChange={e =>
                    dispatch({ ...taxonomy, credit: e.target.value })
                  }
                />
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  id="image"
                  onChange={e =>
                    dispatch({ ...taxonomy, image: e.target.value })
                  }
                ></input>
              </FlexColumn>
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
