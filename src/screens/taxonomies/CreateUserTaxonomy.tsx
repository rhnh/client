import { css } from '@emotion/css'
import { Hintput } from '@ribrary/hintput'
import { Button } from 'components/themed-button'
import { WarnBox } from 'components/themed-components'

import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'
import { useAddListItem, useTaxonomies } from './taxonomies-api'

export const CreateUserTaxonomy: FC = () => {
  const navigate = useNavigate()

  const [inputFieldsState, setInputFieldsState] = useState<ITaxonomy>({
    username: 'mon',
    taxonomyName: '',
    rank: 'species',
    englishName: '',
    image: '',
    approved: false,
  })
  const { listName } = useParams()
  const { data } = useTaxonomies()
  const [found, setFound] = useState('')

  const { mutate, isError, isLoading, isSuccess } = useAddListItem(
    listName || '',
  )

  const englishNames: string[] = data?.map(
    (bird: ITaxonomy) => bird.englishName,
  ) as string[] | []

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    setInputFieldsState(preValue => ({ ...preValue, [name]: value }))
  }
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setFound(e.target.value)
  }
  useEffect(() => {
    const i = data?.find(
      (bird: ITaxonomy) =>
        bird.englishName?.toLowerCase() === found.toLowerCase(),
    )
    if (i) {
      setInputFieldsState(i)
    }
  }, [data, found])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const englishName = inputFieldsState?.englishName
    const taxonomyName = inputFieldsState?.taxonomyName

    if (
      englishName !== '' &&
      taxonomyName !== '' &&
      englishName !== undefined &&
      listName !== undefined &&
      taxonomyName !== undefined
    ) {
      mutate({ listName, englishName, taxonomyName })
    } else {
    }
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
    <div
      className={css({
        minHeight: '100vh',
        '@media screen and (min-width:700px)': {
          maxWidth: '1024px',
          margin: '1em auto',
        },
      })}
    >
      <form
        onSubmit={handleSubmit}
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '.6em',
          padding: '1em',
        })}
      >
        <div>
          <label htmlFor="englishName">Bird Name: </label>
          <Hintput
            items={englishNames}
            numberOfSuggestions={3}
            onBlur={handleBlur}
            type="text"
            id="englishName"
            name="englishName"
            placeholder="Enter bird name"
            onChange={handleChange}
            autoFocus
            value={inputFieldsState?.englishName}
          />
        </div>
        <div>
          <label htmlFor="taxonomyName">Species: </label>
          <input
            onChange={handleChange}
            id="taxonomyName"
            name="taxonomyName"
            type="text"
            value={inputFieldsState?.taxonomyName}
          />
        </div>
        <div>
          <Button
            variant="primary"
            disabled={
              inputFieldsState?.englishName === ''
              // || inputFieldsState?.taxonomy === ''
            }
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  )
}
