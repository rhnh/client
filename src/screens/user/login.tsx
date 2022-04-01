import { css } from '@emotion/css'
import { Button } from 'components/themed-button'

import { Input, Label } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import * as colors from 'utils/colors'
import { LoginElements } from 'utils/types'

export const Login: FC = () => {
  const { login, isError, error, isLogin, isSuccess } = useAuth()
  const { pathname } = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & LoginElements
    const { username, password } = target
    login({ username: username.value, password: password.value })
  }

  useEffect(() => {
    if (isLogin && pathname === '/login') {
      navigate('/')
    }
  }, [isLogin, navigate, pathname])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  if (isSuccess) {
    navigate('/')
  }

  const isDisabled = password === '' || username === ''

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.textLight,
        margin: 'auto',
        marginTop: '1.5em',
        padding: '2em',
      })}
    >
      <form onSubmit={handleSubmit} className="login--form">
        <h1
          className={css({
            color: colors.orangeDark,
            marginBottom: '.5em',
          })}
        >
          Login
        </h1>
        {isError ? (
          <ul
            className={css({
              color: 'red',
            })}
          >
            <li>{error.message}</li>
          </ul>
        ) : null}
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
        <Button type="submit" variant={'primary'} disabled={isDisabled}>
          Login
        </Button>
      </form>
    </div>
  )
}
