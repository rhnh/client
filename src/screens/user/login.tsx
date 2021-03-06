import { css } from '@emotion/css'
import { Button } from 'components/themed-button'

import { Input, Label, WarnBox } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import * as colors from 'utils/colors'
import { LoginElements } from 'utils/types'

export const Login: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isError, error, isLogin, setLogin } = useAuth()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & LoginElements
    const { username, password } = target
    login({ username: username.value, password: password.value })
  }

  useEffect(() => {
    if (isLogin) setLogin('idle')
  })

  useEffect(() => {
    if (isLogin && pathname === '/users/login') {
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

  if (isLogin) {
    return <Navigate to="/"></Navigate>
  }

  const isDisabled = password === '' || username === ''
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.plate,
        margin: 'auto',
        marginTop: '1.5em',
        padding: '2em',
      })}
    >
      <form onSubmit={handleSubmit} className="login--form">
        <h1
          className={css({
            color: colors.plateText,
            marginBottom: '.5em',
          })}
        >
          Login
        </h1>
        {isError ? <WarnBox>{error?.message}</WarnBox> : null}
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
