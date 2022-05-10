import { css } from '@emotion/css'
import { useAuth } from 'contexts/userContext'
import { FC, FormEvent, useState } from 'react'
import { IAudience, IMessageType, INotification } from 'utils/types'
import { AddNotification } from './AddNotification'
import { useCreate, useGet, useSetActive } from './api'

export const Notifications: FC = () => {
  const { isLogin, userInfo } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isAdmin = userInfo?.role === 'admin'
  const { mutate: create } = useCreate()
  const { mutate: setActive } = useSetActive()
  const { data } = useGet()
  const notifications: INotification[] = (data as INotification[]) || []
  if (!isAdmin || !isLogin) {
    return <p>You are not Authorized</p>
  }
  interface Inputs {
    message: HTMLInputElement
    audience: HTMLSelectElement
    time: HTMLOptionElement
    messageType: HTMLOptionElement
    active: HTMLInputElement
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & Inputs
    const message = target.message.value
    const audience = target.audience.value as IAudience
    const time = +target.time.value as unknown as number
    const messageType = target.messageType.value as IMessageType
    const active = target.active.value
    const n: INotification = {
      message,
      audience,
      time,
      messageType,
      isActive: active === 'on' ? true : false,
    }
    create(n)
    setIsOpen(false)
  }

  return (
    <>
      <AddNotification
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
      />

      {notifications.length > 0
        ? notifications?.map(d => (
            <div key={d._id}>
              <p>{d.message}</p>
              <p>{d.audience}</p>
              <p>{d.isActive}</p>
              <div>
                {d.isActive ? (
                  <p className={css({ color: 'red' })}>Active</p>
                ) : (
                  'Inactive'
                )}
              </div>
              <button onClick={() => setActive(d._id || '')}>setActive</button>
              <hr />
            </div>
          ))
        : null}
    </>
  )
}
