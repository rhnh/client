import { Button, CrudButton, LinkedButton } from 'components/themed-button'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteList, useGetUserList } from './list-api'
import { IListBirds, ITaxonomy } from 'utils/types'
import { SearchBar } from 'components/SearchBar'
import { useState } from 'react'
import '@reach/dialog/styles.css'
import delBtn from 'assets/del.svg'
import editBtn from 'assets/edit.svg'
import { css } from '@emotion/css'
import { CrudDialog } from '../../components/CrudDialog'
import { ListItem } from './ListItem'

export const List = () => {
  const { listName } = useParams()
  const navigate = useNavigate()
  const [dialog, setDialog] = useState<'delete' | 'hide' | 'edit'>('hide')
  const { isLoading, isError, data } = useGetUserList(listName || '')
  const {
    mutate: deleteList,
    isError: isErrorMutate,
    isSuccess,
    isLoading: isLoadingMutate,
  } = useDeleteList()
  const birds: IListBirds[] = data as IListBirds[]

  const [search, setSearch] = useState('')

  const handleDelete = () => {
    if (listName) deleteList(listName)
  }
  const handleEdit = () => {
    if (listName) deleteList(listName)
  }
  if (isSuccess) {
    return (
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back to your lists
      </Button>
    )
  }
  return isLoading || isLoadingMutate ? (
    <p>Loading</p>
  ) : isError || isErrorMutate ? (
    <p>Error</p>
  ) : (
    <div
      className={css({
        minHeight: '100vh',
        '@media screen and (min-width:700px)': {
          maxWidth: '1024px',
          margin: '1em auto',
        },
      })}
    >
      <section>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          })}
        >
          <div>
            <div>
              {' '}
              <h1>{listName}</h1>
              <CrudButton
                onClick={() => setDialog('delete')}
                bgImage={delBtn}
              />
              <CrudButton onClick={() => setDialog('edit')} bgImage={editBtn} />
            </div>
            <span>You have {birds.length} birds in your List</span>
          </div>
        </div>
        <section>
          <SearchBar
            search={search}
            setSearch={setSearch}
            data={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'j']}
          />
        </section>
        <div
          className={css({
            marginTop: '2em',
          })}
        >
          {birds.map(bird => (
            <ListItem key={bird._id} {...bird} />
          ))}
        </div>
      </section>
      <CrudDialog
        isOpen={dialog === 'edit'}
        showDialog={setDialog}
        label={listName}
        handleSubmit={handleEdit}
        actionLabel="edit"
        aria="edit"
        title="Editing"
      />
      <CrudDialog
        isOpen={dialog === 'delete'}
        showDialog={setDialog}
        label={listName}
        title="Deleting"
        handleSubmit={handleDelete}
        actionLabel="delete"
        aria="delete"
      />
      <section>
        <LinkedButton variant="secondary" to={`/taxonomies/${listName}`}>
          add new Bird
        </LinkedButton>
      </section>
    </div>
  )
}
