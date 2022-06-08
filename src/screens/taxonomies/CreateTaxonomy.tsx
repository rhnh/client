import { css } from '@emotion/css'
import { Hintput } from '@ribrary/hintput'
import { Modal, ModalContents, ModalOpenButton } from 'components/modal'
import { Button } from 'components/themed-button'
import { Spinner } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IRank, ITaxonomy } from 'utils/types'
import { useCreate, useGetAncestors, useGetByRank } from './taxonomies-api'
import { IProps } from './types'

export const CreateTaxonomy: FC = () => {
  const { isLogin, username } = useAuth()
  const [order, setOrder] = useState('')
  const [family, setFamily] = useState('')
  const [genus, setGenus] = useState('')
  const [parent, setParent] = useState('')
  const [rank, setRank] = useState<IRank | ''>('')
  const { data: ranks, isError, isLoading } = useGetByRank(rank)
  const { data, isLoading: loadingParents } = useGetAncestors({
    parent,
    rank,
  })

  const ancestors = data !== undefined ? data[0] : []
  const { mutate: save, isLoading: loadingSave, isSuccess } = useCreate()
  const ts = (ranks as ITaxonomy[]) || []
  const [isExist, setIsExist] = useState(false)

  const [tN, setTN] = useState('')
  const [englishName, setEnglishName] = useState('')
  const ancestorsNames: string[] = ancestors?.ancestors
  const taxonomyNames: string[] = ts.map(t => t.taxonomyName) || []
  const parentsName: string[] = (ts.map(t => t.parent) as string[]) || []

  const handleTN = (e: ChangeEvent<HTMLInputElement>) => {
    setIsExist(false)
    setTN(e.target.value)
  }

  const clearAll = () => {
    setTN('')
    setIsExist(false)
    setEnglishName('')
    document.getElementById('taxonomyName')?.focus()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & IProps
    const englishName = target.englishName.value || ''
    const parent = target.parent.value || ''
    const order = target.order.value || ''
    const taxonomyName = target.taxonomyName.value || ''
    const family = target.family.value || ''
    const genus = target.genus.value || ''
    const info = target.info.value || ''
    const image = target.image.value || ''

    const taxonomy: ITaxonomy = {
      ancestors: [order, family, genus],
      parent,
      rank: 'species',
      taxonomyName,
      image: image,
      isApproved: false,
      username,
      englishName,
      info,
    }
    return save({ taxonomy })
  }

  const handleBlurTN = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const n = ts.filter(t => {
      return t.taxonomyName.toLowerCase().trim() === value.toLowerCase().trim()
    })
    if (n.length === 1) {
      setIsExist(true)
    } else {
      setIsExist(false)
    }
  }

  const handlePBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value
    setParent(value)
    const found = ancestorsNames?.filter(
      name => name.toLowerCase().trim() === value.toLowerCase().trim(),
    )
    if (found?.length === 1) {
      setOrder(ancestorsNames[0] || '')
      setFamily(ancestorsNames[1] || '')
      setGenus(ancestorsNames[2] || '')
    } else {
      setOrder('')
      setFamily('')
      setGenus('')
    }
  }
  if (isSuccess) {
    return (
      <p>
        You have successfully added new <Link to="/">Home</Link>{' '}
      </p>
    )
  }
  return isLogin ? (
    <Modal>
      <ModalOpenButton>
        <Button variant="secondary">Add New Taxonomy</Button>
      </ModalOpenButton>
      <ModalContents
        style={{ width: '80%', padding: '1em', margin: '2em auto' }}
      >
        <h1>Add new Species</h1>
        <form onSubmit={handleSubmit}>
          <div
            className={css({
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
              gap: '1em',
            })}
          >
            <select
              id="rank"
              name="rank"
              disabled={isLoading}
              onChange={e => {
                if (e.target.value) {
                  const value: IRank = e.target.value as IRank
                  setRank(value)
                } else {
                  setRank('')
                }
              }}
            >
              <option>--Please choose the category--</option>
              <option value="species">Species</option>
              <option value="genus">Genus</option>
              <option value="family">Family</option>
              <option value="order">Order</option>
            </select>
            <label htmlFor="taxonomyName">Species or Binomial Name</label>
            <div>
              <Hintput
                items={taxonomyNames}
                value={tN}
                id="taxonomyName"
                className={css({
                  width: '99%',
                })}
                onChange={handleTN}
                onBlur={handleBlurTN}
                placeholder="Species or Binomial Name"
              />
              {isExist && (
                <p
                  className={css({
                    color: 'red',
                  })}
                >
                  Already exists
                </p>
              )}
            </div>
            <label>English Name</label>
            <input
              type="text"
              placeholder="English name"
              value={englishName}
              name="englishName"
              disabled={isExist}
              onChange={e => setEnglishName(e.target.value)}
            />

            <label htmlFor="info">Info</label>
            <textarea
              cols={30}
              rows={10}
              id="info"
              placeholder="Enter info"
            ></textarea>
            <label htmlFor="parent">Parent</label>
            {rank !== 'order' && (
              <>
                {' '}
                <Hintput
                  id="parent"
                  items={parentsName}
                  onBlur={handlePBlur}
                  onChange={e => {
                    setParent(e.target.value)
                    setIsExist(false)
                  }}
                />
                {loadingParents && <Spinner />}
                <fieldset
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 0,
                  })}
                >
                  <legend>Ancestors</legend>
                  <label htmlFor="order">Order</label>
                  <input
                    id="order"
                    placeholder="Enter name of the Order"
                    value={order}
                    onChange={e => setOrder(e.target.value)}
                  ></input>
                  <label htmlFor="family">Family</label>
                  <input
                    id="family"
                    placeholder="Enter name of the Family"
                    value={family}
                    onChange={e => setFamily(e.target.value)}
                  ></input>
                  <label htmlFor="genus">Genus</label>
                  <input
                    id="genus"
                    placeholder="Enter name of the Genus"
                    value={genus}
                    onChange={e => setGenus(e.target.value)}
                  ></input>
                </fieldset>
              </>
            )}
            <label htmlFor="image">Image url</label>
            <input
              id="image"
              placeholder="Image Url from img, url starting with i"
            />
            <label htmlFor="credit">Credit</label>
            <input id="credit" placeholder="credit to image copy holder" />

            {!isExist && (
              <Button
                variant="secondary"
                type="submit"
                disabled={isExist || parent === '' || tN === ''}
              >
                Save {loadingSave && <Spinner />}
              </Button>
            )}

            {isExist && (
              <Button variant="danger" onClick={() => clearAll()}>
                Clear
              </Button>
            )}
          </div>
        </form>
      </ModalContents>
    </Modal>
  ) : null
}
