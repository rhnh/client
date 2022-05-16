import { css } from '@emotion/css'
import { Hintput } from '@ribrary/hintput'
import { Modal, ModalContents, ModalOpenButton } from 'components/modal'
import { Button } from 'components/themed-button'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { ITaxonomy } from 'utils/types'
import { useGetByRank } from './taxonomies-api'
import { IProps } from './types'

export const CreateSpecies: FC = () => {
  const { data } = useGetByRank('species')
  const ts = (data as ITaxonomy[]) || []
  const taxonomyNames: string[] = ts.map(t => t.taxonomyName)
  const [isExist, setIsExist] = useState<'yes' | 'no' | 'clear'>('clear')
  const [found, setFound] = useState('')
  const [species, setSpecies] = useState('')
  const [englishName, setEnglishName] = useState('')

  const handleSpeciesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSpecies(e.target.value)
  }
  const clearAll = () => {
    setFound('')
    setSpecies('')
    setIsExist('clear')
    setEnglishName('')
    document.getElementById('hintput')?.focus()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & IProps
    const englishName = target.englishName.value || ''
    const parent = target.parent.value || ''
    const order = target.order.value || ''
    const species = target.species.value || ''
    const family = target.family.value || ''
    const genus = target.genus.value || ''
    const info = target.info.value || ''
    const image = target.image.value || ''

    const nTaxonomy: ITaxonomy = {
      ancestors: [order, family, genus],
      parent,
      rank: 'species',
      taxonomyName: species,
      image: image,
      approved: false,
      username: '',
    }
  }

  useEffect(() => {
    if (isExist && found) {
      setEnglishName(found)
    }
  }, [found, isExist])

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const n = ts.filter(t => {
      return value
        .toLowerCase()
        .trim()
        .includes(t.taxonomyName.toLocaleLowerCase().trim())
    })

    if (n[0]) {
      setFound(n[0]?.englishName || '')
      setIsExist('yes')
    } else {
      setIsExist('no')
      setFound('')
    }
  }
  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="secondary">Add New Species</Button>
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
            <label htmlFor="hintput">Species or Binomial Name</label>
            <Hintput
              items={taxonomyNames}
              value={species}
              id="hintput"
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
              onChange={e => setEnglishName(e.target.value)}
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
                <input id="parent"></input>
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
                <label>Image url</label>
                <input
                  id="img_url"
                  placeholder="Image Url from img, url starting with i"
                />
              </>
            )}
            <div>
              {isExist !== 'yes' && (
                <Button
                  variant="primary"
                  type="submit"
                  // disabled={isExist === 'yes'}
                >
                  Save
                </Button>
              )}
              {isExist === 'yes' && (
                <Button variant="danger" onClick={() => clearAll()}>
                  Clear
                </Button>
              )}
            </div>
          </div>
        </form>
      </ModalContents>
    </Modal>
  )
}
