import { css } from '@emotion/css'
import { DialogContent, DialogOverlay } from '@reach/dialog'

import VisuallyHidden from '@reach/visually-hidden'
import { Button, LinkedButton } from 'components/themed-button'
import { CircleButton, WarnSpan } from 'components/themed-components'
import React, { FC, Dispatch, Fragment, useState, FormEvent } from 'react'

import { IList } from 'utils/types'
import { useAddListItem } from './taxonomies-api'

type Props = {
  lists?: IList[]
  englishName?: string
  taxonomy?: string
  isOpen: boolean
  setIsOpen: Dispatch<boolean>
}

export const AddTaxonomy: FC<Props> = ({
  lists,
  englishName,
  taxonomy,
  isOpen,
  setIsOpen,
}) => {
  const [listName, setListName] = useState('')
  const {
    mutate: save,
    isError,
    isLoading,
    isSuccess,
  } = useAddListItem(listName)

  if (isSuccess) {
    setIsOpen(false)
  }

  if (!lists || !englishName || !taxonomy) {
    return (
      <DialogOverlay
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        className={css({
          zIndex: '50000',
        })}
      >
        <DialogContent>
          <div>
            You don't have any list.
            <LinkedButton to="/lists/list" variant="primary">
              Create
            </LinkedButton>
          </div>
        </DialogContent>
      </DialogOverlay>
    )
  }
  const hasLength = lists?.length ?? 0
  const hasData = isOpen && hasLength > 0

  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    setListName(e.currentTarget.value)
  }
  const handleSave = () => {
    if (listName && englishName && taxonomy)
      save({ listName, englishName, taxonomy })
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <WarnSpan>Something went wrong</WarnSpan>
  ) : (
    <DialogOverlay
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      className={css({
        zIndex: '50000',
      })}
    >
      <DialogContent>
        <CircleButton onClick={() => setIsOpen(false)}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </CircleButton>
        {!hasData ? (
          <div>
            You don't have any list.
            <LinkedButton to="/lists/list" variant="primary">
              Create
            </LinkedButton>
          </div>
        ) : (
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5em',
            })}
          >
            <h1>{englishName}</h1>
            <div>
              <select
                name="list"
                id="list-select"
                value={listName}
                className={css({
                  backgroundColor: '#0563af',
                  color: 'white',
                  padding: '12px',
                  width: '250px',
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
            <Button
              variant="primary"
              className={css({
                width: '10%',
              })}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
      </DialogContent>
    </DialogOverlay>
  )
}
