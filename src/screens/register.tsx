import { css } from '@emotion/css'
import { Button } from 'components/themed-button'
import { Input, Label } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { ChangeEvent, FormEvent } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import * as colors from 'utils/colors'
import { ErrorFallback } from 'utils/error'
import { IUser, LoginElements } from 'utils/types'

export const Register = () => {
  const { register, isError, error } = useAuth()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & LoginElements
    const { username, password } = target
    register({ username: username.value, password: password.value })
  }
  console.log('register', error)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
              id="conformPassword"
              name="conformPassword"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <div
            className={css({
              marginTop: '1em',
            })}
          >
            <Button type="submit" variant="primary">
              Register
            </Button>
            <p>Not yet a member? Click here to register</p>
            {isError ? (
              <span
                className={css({
                  color: 'red',
                })}
              >
                Oops {error.message}
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </ErrorBoundary>
  )
}
