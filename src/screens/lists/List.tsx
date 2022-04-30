import { Button, CrudButton, LinkedButton } from 'components/themed-button'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteList, useGetUserList, useUpdateList } from './list-api'
import { IListBirds } from 'utils/types'
import { SearchBar } from 'components/SearchBar'
import { ChangeEvent, useState } from 'react'
import '@reach/dialog/styles.css'
import delBtn from 'assets/del.svg'
import editBtn from 'assets/edit.svg'
import { css } from '@emotion/css'
import { CrudDialog } from '../../components/CrudDialog'
import { ListItem } from './ListItem'
import { FullPageSpinner, ReLoginButton } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import Dialog from '@reach/dialog'
import { UpdateList } from './List.interface'

export const List = () => {
  const { listName } = useParams()
  const [search, setSearch] = useState('')
  const { isLogin } = useAuth()
  const navigate = useNavigate()
  const [dialog, setDialog] = useState<'delete' | 'hide' | 'edit'>('hide')

  const { isLoading, isError, data } = useGetUserList(listName || '')

  console.log(data)
  const {
    mutate: deleteList,
    isError: isErrorDelete,
    isSuccess,
    isLoading: isLoadingDelete,
  } = useDeleteList()

  const {
    mutate: updateList,
    isError: isErrorEdit,
    isLoading: isLoadingEdit,
    isSuccess: isSuccessEdit,
  } = useUpdateList(listName ?? '')

  if (!isLogin) {
    return <ReLoginButton />
  }
  if (!data && isLoading) {
    return <FullPageSpinner />
  }

  const birds: IListBirds[] = (data as IListBirds[]) || []

  const birdToShow: IListBirds[] = birds?.filter(bird => {
    if (search === '') {
      return bird
    } else {
      return bird.englishName.toLowerCase().includes(search)
    }
  }) as IListBirds[]

  const birdNames = birds?.map(bird => bird.englishName)

  const handleDelete = () => {
    if (listName) deleteList(listName)
  }

  const handleEdit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & UpdateList
    const newName = target.newName.value

    if (newName !== '' && listName) {
      updateList({ newListName: newName, listId: listName })
    }
  }

  if (isSuccess || isSuccessEdit) {
    return (
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back to your lists
      </Button>
    )
  }
  return isLoading || isLoadingDelete ? (
    <FullPageSpinner />
  ) : isError || isErrorDelete ? (
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
          <SearchBar search={search} setSearch={setSearch} data={birdNames} />
        </section>
        <div
          className={css({
            marginTop: '2em',
          })}
        >
          {birdToShow.length > 0 &&
            birdToShow?.map(bird => {
              if (bird) {
                return <ListItem key={bird._id} {...bird} />
              } else {
                return null
              }
            })}
        </div>
      </section>

      <Dialog onDismiss={() => setDialog('hide')} isOpen={dialog === 'edit'}>
        <form onSubmit={handleEdit}>
          <h1>Rename your list "{listName}"</h1>
          <label htmlFor="newName"></label>
          <input type="text" id="newName" />
          <Button variant="secondary">Save</Button>
        </form>
      </Dialog>

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
