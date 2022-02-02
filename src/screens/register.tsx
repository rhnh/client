import { css } from '@emotion/css'
import { Button } from 'components/themed-button'
import { Input, Label } from 'components/themed-components'
import { ChangeEvent, FormEvent, useState } from 'react'
import * as colors from 'utils/colors'
import { IUser } from 'utils/types'

export const Register = () => {
  const [user, setUser] = useState<IUser>({
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
    setUser((user: IUser) => ({ ...user, [name]: value }))
  }

  return (
    <div
      className={css({
        backgroundColor: colors.textLight,
        marginTop: '1em',
        padding: '2em 0',
        margin: 'auto',
        ' label': {
          margin: '.5em 0',
        },
      })}
    >
      <form onSubmit={handleSubmit}>
        <h1
          className={css({
            color: colors.orangeDark,
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
