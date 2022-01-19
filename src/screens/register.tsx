import { css } from '@emotion/css'
import { Modal, ModalContents, ModalOpenButton } from 'components/modal'
import { Button, Input, Label, LinkButton } from 'components/themed-components'
import { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import * as colors from 'utils/colors'
import { User } from 'utils/types'
interface Props {
  ShowModel: ReactElement
}

export const Register = ({ ShowModel }: Props) => {
  const [user, setUser] = useState<User>({
    username: '',
    password: '',
    confirmPassword: '',
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(user)
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((user: User) => ({ ...user, [name]: value }))
  }
  const isValidUser =
    user.username === '' ||
    user.password === '' ||
    user.password !== user.confirmPassword

  return (
    <div
      className={css({
        backgroundColor: colors.textLight,
        marginTop: '1em',
        padding: '2em 0',
        textAlign: 'center',
        ' label': {
          margin: '.5em 0',
        },
      })}
    >
      <form onSubmit={handleSubmit}>
        <h1
          className={css({
            color: colors.secondary,
            marginBottom: '.5em',
          })}
        >
          Register
        </h1>
        <div className="register">
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
        <div>
          <Label htmlFor="conform-password">Confirm Password</Label>
          <Input
            type="password"
            id="conform-password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <div
          className={css({
            marginTop: '1em',
          })}
        >
          <Button type="submit" variant="secondary">
            Register
          </Button>
          <p>Not yet a member? Click here to register</p>
        </div>
      </form>
    </div>
  )
}
