import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from 'components/modal'
import { Button, IconButtons } from 'components/themed-button'
import React, { FC } from 'react'
import correct from 'assets/correct.svg'
import { useMutation, useQueryClient } from 'react-query'
import { useAuth } from 'contexts/userContext'

type Props = {
  _id?: string
}

export const ApprovalForm: FC<Props> = ({ _id }) => {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  const { mutate: approve } = useMutation(
    (id: string) => {
      return fetch(`/api/taxonomies/set-approve/${id}`, {
        method: 'post',
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
        <IconButtons bgImage={correct} toolTip="set Approved" />
      </ModalOpenButton>
      <ModalContents aria-label="form">
        <form onSubmit={e => e.preventDefault()}>
          <h3>Are you should you want to approved this ?</h3>
          <div>
            <Button
              variant="primary"
              onClick={() => {
                approve(_id)
              }}
            >
              Yes
            </Button>
            <ModalDismissButton>
              <Button variant="secondary">No</Button>
            </ModalDismissButton>
          </div>
        </form>
      </ModalContents>
    </Modal>
  )
}
