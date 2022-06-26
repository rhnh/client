import { css } from '@emotion/css'
import { Hintput } from '@ribrary/hintput'
import { Modal, ModalContents, ModalOpenButton } from 'components/modal'

import { Button } from 'components/themed-button'
import { WarnBox } from 'components/themed-components'

import { ChangeEvent, FC, FormEvent, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'
import { useAddListItem, useGetSpeciesName } from './taxonomies-api'

export const CreateUserTaxonomy: FC = () => {
  const navigate = useNavigate()
  const { listName } = useParams()
  const { data } = useGetSpeciesName()
  const [englishName, setEnglishName] = useState('')
  const [taxonomyName, setTaxonomyName] = useState('')

  const {
    mutate: save,
    isError,
    isLoading,
    isSuccess,
  } = useAddListItem(listName || '')
  const species: ITaxonomy[] = data ? (data as ITaxonomy[]) : []
  const p = species.map(r => {
    return { englishName: r.englishName, taxonomyName: r.taxonomyName }
  })
  const englishNames: string[] = Array.isArray(data)
    ? (data?.map((bird: ITaxonomy) => bird.englishName) as string[])
    : []

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setEnglishName(e.target.value)
  }
  const handleChangeTax = (e: ChangeEvent<HTMLInputElement>) => {
    setTaxonomyName(e.target.value)
  }
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const b = p.find(d => {
      return d.englishName?.toLowerCase() === value.toLowerCase()
    })

    setTaxonomyName(b?.taxonomyName || '')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    save({ listName: listName || '', englishName, taxonomyName })
  }
  if (isLoading) {
    return <p>wait !</p>
  }
  if (isError) {
    return <WarnBox>Something went wrong.</WarnBox>
  }

  if (isSuccess) {
    return (
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>
    )
  }

  return (
    <Modal>
      <ModalOpenButton>
        <Button className={css({ margin: '1em' })} variant="secondary">
          Add New
        </Button>
      </ModalOpenButton>
      <ModalContents title="Adding new bird to  your list">
        <form
          onSubmit={handleSubmit}
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '.6em',
            padding: '1em',
            '>div': {
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
            },
          })}
        >
          <div>
            <label htmlFor="englishName">Name: </label>
            <Hintput
              items={englishNames}
              numberOfSuggestions={3}
              onBlur={handleBlur}
              type="text"
              id="englishName"
              name="englishName"
              placeholder="Enter bird name"
              onChange={handleChangeName}
              autoFocus
              className={css({
                width: '99%',
              })}
              value={englishName}
            />
          </div>
          <div>
            <label htmlFor="taxonomyName">Species: </label>
            <input
              className={css({ display: 'block' })}
              onChange={handleChangeTax}
              id="taxonomyName"
              name="taxonomyName"
              type="text"
              value={taxonomyName}
            />
          </div>
          <div>
            <Button variant="primary">Add</Button>
          </div>
        </form>
      </ModalContents>
    </Modal>
  )
}
