import { css } from '@emotion/css'

import { Modal, ModalDismissButton, ModalOpenButton } from 'components/modal'
import { Button, CircleButton } from 'components/themed-button'
import { Dialog } from 'components/themed-components'
import React, { FC, FormEvent, useState } from 'react'

type Props = {
  isOpen: boolean
  handleSubmit(e: FormEvent<HTMLFormElement>): void
  openDialog(): void
  closeDialog(): void
}

export const AddNotification: FC<Props> = ({
  isOpen,
  handleSubmit,
  openDialog,
  closeDialog,
}) => {
  const [isActive, setActive] = useState<boolean>(false)
  return (
    <div>
      <Modal isShow={isOpen}>
        <ModalOpenButton>
          <Button variant="secondary" onClick={openDialog}>
            add
          </Button>
        </ModalOpenButton>

        <Dialog aria-label="form new notifications" isOpen={isOpen}>
          <ModalDismissButton>
            <CircleButton onClick={closeDialog}>x</CircleButton>
          </ModalDismissButton>
          <form
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '.6em',
            })}
            onSubmit={handleSubmit}
          >
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Type of the message"
              rows={3}
              cols={5}
            ></textarea>
            <label htmlFor="audience">Select the audience</label>
            <select id="audience" name="audience">
              <option>--Please choose the audience--</option>

              <option value="user">register members</option>
              <option value="mod">Mods</option>
              <option value="all">All</option>
              <option value="unregistered">unregistered</option>
            </select>
            <label htmlFor="messageType">Select the type</label>
            <select id="messageType">
              <option>--Please choose the type--</option>
              <option value="announcement">Announcement</option>
              <option value="information">Information</option>
              <option value="warning">Warning</option>
              <option value="suggestion">Suggestion</option>
            </select>
            <label htmlFor="time">Select the audience</label>
            <select id="time">
              <option>--Please choose the audience--</option>
              <option value={3}>3 minutes</option>
              <option value={5}>3 minutes</option>
              <option value={10}>10 minutes</option>
            </select>
            <fieldset>
              <legend>Should it be shown right away?</legend>
              <input
                type="checkbox"
                id="active"
                name="active"
                onClick={() => setActive(!isActive)}
              ></input>
              <label htmlFor="active"> {isActive ? 'Show' : 'Hide'}</label>
            </fieldset>
            <Button variant="primary">Create</Button>
          </form>
        </Dialog>
      </Modal>
    </div>
  )
}
