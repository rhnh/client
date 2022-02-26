import { css } from '@emotion/css'
import { Button } from 'components/themed-button'

import { Input, Label } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
// import { useAuth } from 'contexts/userContext'
import { FC, FormEvent, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import * as colors from 'utils/colors'
import { LoginElements } from 'utils/types'

export const Login: FC = () => {
  const { login, isError, error, userInfo } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & LoginElements
    const { username, password } = target
    login({ username: username.value, password: password.value })
  }
  useEffect(() => {
    if (userInfo?.username && pathname === '/login') {
      navigate('/')
    }
  }, [navigate, pathname, userInfo?.username])
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
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" variant={'primary'}>
          Login
        </Button>
        {isError ? <span> {error.message} </span> : null}
      </form>
    </div>
  )
}
