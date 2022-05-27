import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from 'components/modal'
import { Button, IconButtons } from 'components/themed-button'
import { FC } from 'react'
import deleteIcon from 'assets/del.svg'
import { useAuth } from 'contexts/userContext'
import { useMutation, useQueryClient } from 'react-query'
type Props = {
  _id?: string
}
export const DeleteApproveForm: FC<Props> = ({ _id }) => {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const { mutate: deleteTax } = useMutation(
    (id: string) => {
      return fetch(`/api/taxonomies/taxonomy/${id}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'Application/json',
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('unapproved')
      },
    },
  )
  if (!_id) {
    return null
  }
  return (
    <Modal>
      <ModalOpenButton>
        <IconButtons bgImage={deleteIcon} toolTip="delete" />
      </ModalOpenButton>
      <ModalContents aria-label="form">
        <form onSubmit={e => e.preventDefault()}>
          <h3>Are you should you want to approved this ?</h3>
          <div>
            <ModalDismissButton>
              <Button
                variant="primary"
                onClick={() => {
                  deleteTax(_id)
                }}
              >
                Yes
              </Button>
            </ModalDismissButton>
            <ModalDismissButton>
              <Button variant="secondary">No</Button>
            </ModalDismissButton>
          </div>
        </form>
      </ModalContents>
    </Modal>
  )
}
