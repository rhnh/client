import Dialog from '@reach/dialog'
import { Button } from 'components/themed-button'
import { FC } from 'react'
import { useUpdateList } from './list-api'
import { CrudList } from './List.interface'

export const EditList: FC<CrudList> = ({
  listName,
  isOpen,
  setIsOpen,
  handleSubmit,
}) => {
  const {
    mutate: updateList,
    isError: isErrorEdit,
    isLoading: isLoadingEdit,
    isSuccess: isSuccessEdit,
  } = useUpdateList(listName ?? '')

  return (
    <Dialog onDismiss={() => setIsOpen('hide')} isOpen={isOpen}>
      <form onSubmit={handleSubmit}>
        <h1>Rename your list "{listName}"</h1>
        <label htmlFor="newName"></label>
        <input type="text" id="newName" />
        <Button variant="secondary">Save</Button>
      </form>
    </Dialog>
  )
}
