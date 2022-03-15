import { Button, LinkedButton } from 'components/themed-button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeleteList, useGetUserList } from './list-api'
import { ITaxonomy } from 'utils/types'
import { SearchBar } from 'components/SearchBar'
import { useState } from 'react'
import '@reach/dialog/styles.css'
import { CircleButton } from 'components/themed-components'

import Dialog from '@reach/dialog'
import { css } from '@emotion/css'
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
  const birds: ITaxonomy[] = data as ITaxonomy[]
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
    <div>
      <section>
        <SearchBar search={search} setSearch={setSearch} data={birds} />
      </section>
      <section>{search}</section>
      <section>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <h3>{listName}</h3>{' '}
          <div>
            <button onClick={() => setDialog('delete')}>delete</button>
            <button onClick={() => setDialog('edit')}>edit</button>
          </div>
        </div>
        <hr />
        {birds.map(bird => (
          <div key={bird._id}>
            <Link
              to={`/taxonomy/${bird._id
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/, '-')}`}
            >
              {bird.englishName}
            </Link>
          </div>
        ))}
      </section>
      <Dialog
        isOpen={dialog === 'delete'}
        aria-label="delete"
        onDismiss={() => setDialog('hide')}
        className={css({
          position: 'relative',
        })}
      >
        <CircleButton
          className={css({
            position: 'absolute',
            top: 0,
            right: 0,
          })}
          onClick={() => setDialog('hide')}
        >
          x
        </CircleButton>
        <h3>
          Are you show ? You want to
          <span>
            <strong
              className={css({
                color: 'red',
              })}
            >
              delete
            </strong>
          </span>{' '}
          {listName}
        </h3>
        <div>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => setDialog('hide')}>
            No
          </Button>
        </div>
      </Dialog>
      <Dialog
        isOpen={dialog === 'edit'}
        aria-label="form edit"
        onDismiss={() => setDialog('hide')}
        className={css({
          position: 'relative',
        })}
      >
        <CircleButton
          className={css({
            position: 'absolute',
            top: 0,
            right: 0,
          })}
          onClick={() => setDialog('hide')}
        >
          x
        </CircleButton>
        <h3>
          Are you show ? You want to
          <span>
            <strong
              className={css({
                color: 'red',
              })}
            >
              delete
            </strong>
          </span>{' '}
          {listName}
        </h3>
        <div>
          <Button variant="primary" onClick={handleEdit}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => setDialog('hide')}>
            No
          </Button>
        </div>
      </Dialog>
      <section>
        <LinkedButton variant="secondary" to={`/taxonomies/${listName}`}>
          add recently seen bird to your list
        </LinkedButton>
      </section>
    </div>
  )
}
