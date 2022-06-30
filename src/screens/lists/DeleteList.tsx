import { Modal, ModalContents, ModalOpenButton } from 'components/modal'
import { Button, IconButtons } from 'components/themed-button'
import deleteIcon from 'assets/del.svg'
import { FC } from 'react'

import { css } from '@emotion/css'
import { useDeleteList } from './list-api'
import { Navigate } from 'react-router-dom'
import { useAuth } from 'contexts/userContext'

interface Props {
  listName: string
}
export const DeleteList: FC<Props> = ({ listName }) => {
  const { username } = useAuth()
  const { mutate: deleteList, isSuccess } = useDeleteList()

  const handleDeleteList = () => {
    deleteList(listName)
  }
  if (isSuccess) {
    return <Navigate to={`/lists/${username}`} />
  }

  return (
    <Modal>
      <ModalOpenButton>
        <IconButtons bgImage={deleteIcon} toolTip="delete" />
      </ModalOpenButton>
      <ModalContents>
        <div
          className={css({
            position: 'relative',
            flexDirection: 'column',
            display: 'flex',
          })}
        >
          <p>
            Are you sure want to delete{' '}
            <em>{/* <strong> {englishName} </strong> */}</em> from your list
            <em>{/* <strong> {listName}</strong> */}</em> ?
          </p>
          <div
            className={css({
              display: 'flex',
              // flexDirection: 'column',
              gap: '1em',
            })}
          >
            <Button variant="danger" onClick={handleDeleteList}>
              Yes
            </Button>
            <Button variant="primary" style={{ background: 'rend' }}>
              No
            </Button>
          </div>
        </div>
      </ModalContents>
    </Modal>
  )
}
