import { Modal, ModalContents, ModalOpenButton } from 'components/modal'
import { Button, IconButtons } from 'components/themed-button'
import editIcon from 'assets/edit.svg'
import { FC, FormEvent } from 'react'
import { IList } from 'utils/types'
import { css } from '@emotion/css'
import { useUpdateList } from './list-api'
import { FullPageSpinner } from 'components/themed-components'
import { Navigate } from 'react-router-dom'
import { useAuth } from 'contexts/userContext'

interface Props {
  listName: string
}

interface InputForm {
  newListName: HTMLInputElement
}

export const UpdateList: FC<Props> = ({ listName }) => {
  const { username } = useAuth()

  const {
    mutate: updateListName,
    isSuccess,
    isLoading,
    isError,
  } = useUpdateList(listName)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & InputForm
    const value = target.newListName.value
    updateListName({ listName, newListName: value })
  }

  return isError ? (
    <p>Oops something went wrong. Please refresh</p>
  ) : isLoading ? (
    <FullPageSpinner />
  ) : isSuccess ? (
    <Navigate to={`/lists/${username}`}></Navigate>
  ) : (
    <Modal>
      <ModalOpenButton>
        <IconButtons bgImage={editIcon} toolTip="delete" />
      </ModalOpenButton>
      <ModalContents>
        <div className={css({ position: 'relative' })}>
          <div>
            Do you want to change <strong> {listName} </strong> ?
            <hr />
            <form onSubmit={handleSubmit}>
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1em',
                })}
              >
                <label htmlFor="newListName">New List Name</label>
                <input type="text" id="newListName" />
                <Button variant="secondary">Change</Button>
              </div>
            </form>
          </div>
        </div>
      </ModalContents>
    </Modal>
  )
}
