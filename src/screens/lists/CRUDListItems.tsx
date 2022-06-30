import { CRUDNav } from 'components/CrudNav'
import { Button, IconButtons } from 'components/themed-button'
// import editIcon from 'assets/edit.svg'
import deleteIcon from 'assets/del.svg'
import { css } from '@emotion/css'
import { FC, FormEvent, useEffect } from 'react'
import { useRemoveListItem } from './list-item-api'
import { useAuth } from 'contexts/userContext'
import { Modal, ModalContents, ModalOpenButton } from 'components/modal'
import {
  FullPageSpinner,
  ReLoginButton,
  WarnBox,
} from 'components/themed-components'
import { QueryClient } from 'react-query'

type Props = {
  id?: string
  englishName?: string
  listName?: string
  seen: string
  isApproved: boolean
}
const queryClient = new QueryClient()

export const CRUDListItems: FC<Props> = ({
  id,
  englishName,
  listName,
  seen,
}) => {
  const { isLogin } = useAuth()

  const {
    mutate: remove,
    isSuccess: successDeleted,
    isLoading,
    isError,
  } = useRemoveListItem(listName)
  useEffect(() => {
    if (successDeleted) {
      queryClient.invalidateQueries(listName)
    }
  }, [listName, successDeleted])

  if (!id || !englishName || !listName) {
    return null
  }
  const handleRemoveItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    remove({ id, seen })
  }

  if (!isLogin) return <ReLoginButton />

  return isLoading ? (
    <FullPageSpinner />
  ) : isError ? (
    <WarnBox>Something went wrong</WarnBox>
  ) : (
    <CRUDNav orientation="right">
      <Modal aria-label="edit form">
        <ModalOpenButton>
          <IconButtons
            bgImage={deleteIcon}
            imgStyle={{ width: '15px', innerHeight: 'auto' }}
            toolTip="Do you want to remove if your list ?"
          />
        </ModalOpenButton>
        <ModalContents>
          <form onSubmit={handleRemoveItem}>
            <div
              className={css({
                position: 'relative',
                flexDirection: 'column',
                display: 'flex',
              })}
            >
              <p>
                Are you sure want to delete{' '}
                <em>
                  <strong> {englishName} </strong>
                </em>{' '}
                from your list
                <em>
                  <strong> {listName}</strong>
                </em>{' '}
                ?
              </p>
              <div
                className={css({
                  display: 'flex',
                  // flexDirection: 'column',
                  gap: '1em',
                })}
              >
                <Button variant="danger">Yes</Button>

                <Button variant="primary">No</Button>
              </div>
            </div>
          </form>
        </ModalContents>
      </Modal>
      {/* {!isApproved ? (
          <Modal aria-label="edit form">
            <ModalOpenButton>
              <IconButtons
                bgImage={editIcon}
                imgStyle={{ width: '15px', innerHeight: 'auto' }}
                toolTip="edit"
              />
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
                  <em>
                    <strong> {englishName} </strong>
                  </em>{' '}
                  from your list
                  <em>
                    <strong> {listName}</strong>
                  </em>{' '}
                  ?
                </p>
                <div
                  className={css({
                    display: 'flex',
                    // flexDirection: 'column',
                    gap: '1em',
                  })}
                >
                  <Button variant="danger" onClick={removeItem}>
                    Yes
                  </Button>
                  <ModalDismissButton>
                    <Button variant="primary">No</Button>
                  </ModalDismissButton>
                </div>
              </div>
            </ModalContents>
          </Modal>
        ) : (
          <></>
        )} */}
    </CRUDNav>
  )
}
