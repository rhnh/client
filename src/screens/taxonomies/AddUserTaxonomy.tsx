import { css } from '@emotion/css'
import { Modal, ModalContents, ModalOpenButton } from 'components/modal'
import { Button, IconButtons, LinkedButton } from 'components/themed-button'
import { FullPageSpinner, WarnBox } from 'components/themed-components'
import React, { FC, Fragment, useState, FormEvent, useEffect } from 'react'
import addIcon from 'assets/add.svg'
import { IList } from 'utils/types'
import { useAddListItem } from './taxonomies-api'
import { useGetBirdIds, useGetLists } from 'screens/lists/list-api'

type Props = {
  id: string
  englishName?: string
  taxonomyName: string
}

export const AddTaxonomy: FC<Props> = ({ englishName, taxonomyName, id }) => {
  const [listName, setListName] = useState('')
  const { data: ids } = useGetBirdIds()
  const [isExist, setIsExist] = useState(false) // already in list
  useEffect(() => {
    const found = ids?.find((d: string) => id === d)
    if (found) {
      setIsExist(true)
    } else setIsExist(false)
  }, [id, ids])
  const { data, isLoading: loadingLists, isFetching } = useGetLists()
  let lists: IList[] = [] as IList[]
  const { mutate: save, isError, isLoading } = useAddListItem(listName)

  lists = data as IList[]
  if (loadingLists) {
    return <FullPageSpinner />
  }
  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    setListName(e.currentTarget.value)
  }

  if (!englishName || !taxonomyName) {
    return null
  }

  const handleSave = () => {
    if (listName && englishName && taxonomyName)
      save({ listName, englishName, taxonomyName, location: '' })
  }

  return isLoading ? (
    <FullPageSpinner />
  ) : isError ? (
    <WarnBox>Something went wrong</WarnBox>
  ) : lists?.length > 0 ? (
    <Modal>
      <ModalOpenButton>
        <div>
          <IconButtons
            disabled={isExist}
            bgImage={addIcon}
            toolTip="Add to your list"
            toolTipDisabled="You have it already in your list"
          />
        </div>
      </ModalOpenButton>
      <ModalContents>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5em',
            width: '100%',
          })}
        >
          <div>
            <h3>Lists</h3>
            {isFetching && <p>loading...</p>}
            <select
              name="list"
              id="list-select"
              value={listName}
              className={css({
                backgroundColor: '#0563af',
                color: 'white',
                padding: '12px',
                width: '100%',
                border: 'noe',
                fontSize: '20px',
                boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)',
                outline: ' none',
              })}
              onChange={handleChange}
            >
              <option>--Please choose list name--</option>
              {lists?.map((list, index) => (
                <Fragment key={list._id}>
                  <option value={list.listName}>
                    {index + 1} - {list.listName}
                  </option>
                </Fragment>
              ))}
            </select>
          </div>
          <Button variant="secondary" className={css({})} onClick={handleSave}>
            Save
          </Button>
        </div>
      </ModalContents>
    </Modal>
  ) : (
    <Modal>
      <ModalContents aria-label="form new taxonomy">
        <div>
          <h1>No list</h1>
          You don't have any list.
          <LinkedButton to="/lists/list" variant="primary">
            Create
          </LinkedButton>
        </div>
      </ModalContents>
    </Modal>
  )
}
