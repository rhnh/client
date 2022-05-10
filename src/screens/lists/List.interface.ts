import { Dispatch } from 'react'

export interface UpdateList {
  newName: HTMLInputElement
}

export type DialogAction = 'delete' | 'hide' | 'edit'

export interface CrudList {
  listName: string
  isOpen: boolean
  setIsOpen: Dispatch<DialogAction>
  handleSubmit: () => void
}
