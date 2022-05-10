import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from 'components/modal'
import { Button, IconButtons } from 'components/themed-button'
import { FC } from 'react'

type Props = {
  show: boolean
  title: string
}

export const Thumbnails: FC<Props> = ({ show }: Props) => {
  return show ? (
    <Modal isShow={show}>
      <ModalDismissButton>
        <Button variant="primary">x</Button>
      </ModalDismissButton>
      <ModalOpenButton>
        <IconButtons bgImage="" toolTip="s">
          x
        </IconButtons>
      </ModalOpenButton>
      <ModalContents title={'hellos'}>Hello</ModalContents>
    </Modal>
  ) : null
}
