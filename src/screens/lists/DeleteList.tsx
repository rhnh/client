import Dialog from '@reach/dialog'

import { Button } from 'components/themed-button'
import { FC } from 'react'
import { useDeleteList } from './list-api'
import { CrudList } from './List.interface'

export const DeleteList: FC<CrudList> = ({
  listName,
  isOpen,
  setIsOpen,
  handleSubmit,
}) => {
  const {
    mutate: deleteList,
    isError: isErrorDelete,
    isSuccess,
    isLoading: isLoadingDelete,
  } = useDeleteList()

  return (
    <Dialog onDismiss={() => setIsOpen('hide')} isOpen={isOpen}>
      <form onSubmit={handleSubmit}>
        <h1>Rename your list "{listName}"</h1>
        <label htmlFor="newName"></label>
        <input type="text" id="newName" />
        <Button variant="secondary">Delete</Button>
      </form>
    </Dialog>
  )
}
