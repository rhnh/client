import { css } from '@emotion/css'
import { Hintput } from '@ribrary/hintput'
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from 'components/modal'
import { Button } from 'components/themed-button'
import React, { ChangeEvent, FC, FormEvent } from 'react'
import { IRank } from 'utils/types'

type Props = {
  selectSpecies(e: IRank | ''): void
  handleSubmit(e: FormEvent<HTMLFormElement>): void
  taxonomyNames: string[]
  species: string
  handleSpeciesChange(e: ChangeEvent<HTMLInputElement>): void
  handleBlur(e: ChangeEvent<HTMLInputElement>): void
  englishName: string
  handleSelectEName(s: string): void
  handleSelectNameEvent(e: ChangeEvent<HTMLInputElement>): void
  parents: string[]
  handleSelectBlurParent(e: ChangeEvent<HTMLInputElement>): void
  isExist: 'yes' | 'no' | 'none'
  handleClearAll(): void
}

export const CreateSpeciesForm: FC<Props> = ({
  selectSpecies,
  handleSubmit,
  handleSpeciesChange,
  handleBlur,
  taxonomyNames,
  species,
  englishName,
  parents,
  handleSelectEName,
  handleSelectNameEvent,
  handleSelectBlurParent,
  handleClearAll,
  isExist,
}) => {
  return (
    <Modal>
      <ModalOpenButton>
        <Button onClick={() => selectSpecies('species')} variant="secondary">
          Add New Species
        </Button>
      </ModalOpenButton>
      <ModalContents
        className={css({
          background: 'red',
        })}
      >
        <form onSubmit={handleSubmit}>
          <div
            className={css({
              maxWidth: '90%',
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
              gap: '1em',
            })}
          >
            <label htmlFor="species">Species or Binomial Name</label>
            <Hintput
              items={taxonomyNames}
              value={species}
              id="species"
              className={css({
                width: '99%',
              })}
              onChange={handleSpeciesChange}
              onBlur={handleBlur}
              placeholder="Species or Binomial Name"
            />

            <label>English Name</label>
            <input
              type="text"
              placeholder="English name"
              value={englishName}
              name="englishName"
              onChange={handleSelectNameEvent}
            />
            {isExist === 'no' && (
              <>
                <label htmlFor="info">Info</label>
                <textarea
                  cols={30}
                  rows={10}
                  id="info"
                  placeholder="Enter info"
                ></textarea>
                <label htmlFor="parent">Parent</label>
                <Hintput
                  id="parent"
                  items={parents}
                  onBlur={handleSelectBlurParent}
                ></Hintput>
                <fieldset
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                  })}
                >
                  <legend>Ancestors</legend>
                  <label htmlFor="order">Order</label>
                  <input
                    id="order"
                    placeholder="Enter name of the Order"
                  ></input>
                  <label htmlFor="family">Family</label>
                  <input
                    id="family"
                    placeholder="Enter name of the Family"
                  ></input>
                  <label htmlFor="genus">Genus</label>
                  <input
                    id="genus"
                    placeholder="Enter name of the Genus"
                  ></input>
                </fieldset>
                <label htmlFor="image">Image url</label>
                <input
                  id="image"
                  placeholder="Image Url from img, url starting with i"
                />
              </>
            )}
            <div>
              {isExist !== 'yes' && (
                <ModalDismissButton>
                  <Button
                    variant="primary"
                    type="submit"
                    // disabled={isExist === 'yes'}
                  >
                    Save
                  </Button>
                </ModalDismissButton>
              )}
              {isExist === 'yes' && (
                <ModalDismissButton>
                  <Button variant="danger" onClick={() => handleClearAll()}>
                    Clear
                  </Button>
                </ModalDismissButton>
              )}
            </div>
          </div>
        </form>
      </ModalContents>
    </Modal>
  )
}
