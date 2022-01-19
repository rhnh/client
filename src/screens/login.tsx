import { css } from '@emotion/css'
import { Modal, ModalContents, ModalOpenButton } from 'components/modal'
import { Button, Input, Label } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import * as colors from 'utils/colors'
import { User } from 'utils/types'

interface Props {
  ShowModel: ReactElement
}

export const Login = ({ ShowModel }: Props) => {
  const [user, setUser] = useState<User>({ username: '', password: '' })
  const { user: UserInfo } = useAuth()
  console.log(user)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((user: User) => ({ ...user, [name]: value }))
  }
  const isValidUser = user.username === '' || user.password === ''
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.textLight,
        marginTop: '1.5em',
        padding: '2em',
      })}
    >
      <form onSubmit={handleSubmit} className="login--form">
        <h1
          className={css({
            color: colors.secondary,
            marginBottom: '.5em',
          })}
        >
          Login
        </h1>

        <div
          className={css({
            overflow: 'clear',
          })}
        >
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your Username"
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <Button type="submit" variant={'primary'}>
          Login
        </Button>
      </form>
    </div>
  )
}
