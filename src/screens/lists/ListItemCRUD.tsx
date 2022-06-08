import Dialog from '@reach/dialog'
import { CRUDNav } from 'components/CrudNav'
import { Button, IconButtons } from 'components/themed-button'
import editIcon from 'assets/edit.svg'
import deleteIcon from 'assets/del.svg'
import { css } from '@emotion/css'
import { FC, useState } from 'react'
import { useRemoveListItem } from './list-item-api'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/userContext'

type Props = {
  id?: string
  englishName?: string
  listName?: string
}

export const ListItemCRUD: FC<Props> = ({ id, englishName, listName }) => {
  const navigate = useNavigate()
  const [crudDialog, setCrudDialog] = useState<'delete' | 'update' | 'none'>(
    'none',
  )
  const { mutate: remove, isSuccess: successDeleted } =
    useRemoveListItem(listName)
  if (!id || !englishName || !listName) {
    return null
  }
  const removeItem = () => {
    remove({ id })
  }

  if (successDeleted) {
    navigate(-1)
  }

  return (
    <section>
      <CRUDNav orientation="right">
        <IconButtons
          bgImage={editIcon}
          toolTip="edit"
          onClick={() => setCrudDialog('update')}
        />

        <IconButtons
          bgImage={deleteIcon}
          toolTip="delete"
          onClick={() => setCrudDialog('delete')}
        />
      </CRUDNav>
      <Dialog
        isOpen={crudDialog === 'update'}
        onDismiss={() => setCrudDialog('none')}
        aria-label="update form"
      >
        <div className={css({ position: 'relative' })}>
          <IconButtons
            style={{
              top: 0,
              position: 'absolute',
              right: 0,
              margin: 0,
            }}
            bgImage=""
            toolTip="close"
            onClick={() => setCrudDialog('none')}
          />

          <div>
            <form>
              <label htmlFor="name">Name</label>
              <input type="text" />
            </form>
          </div>
        </div>
      </Dialog>
      <Dialog
        isOpen={crudDialog === 'delete'}
        onDismiss={() => setCrudDialog('none')}
        aria-label="delete form"
      >
        <div
          className={css({
            position: 'relative',
            flexDirection: 'column',
            display: 'flex',
          })}
        >
          <IconButtons
            style={{
              top: 0,
              position: 'absolute',
              right: 0,
              margin: 0,
              gap: '1em',
            }}
            bgImage=""
            toolTip="close"
            onClick={() => setCrudDialog('none')}
          />
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
            <Button variant="primary">No</Button>
          </div>
        </div>
      </Dialog>
    </section>
  )
}
