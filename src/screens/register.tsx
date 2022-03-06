import { css } from '@emotion/css'
import { Button } from 'components/themed-button'
import { Input, Label } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FormEvent, useReducer } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Link } from 'react-router-dom'
import * as colors from 'utils/colors'
import { ErrorFallback } from 'utils/error'
import { LoginElements } from 'utils/types'

export type Action = {
  type: 'input'
  name: string
  value: string
}

export interface State {
  username: string
  password: string
  confirmPassword: string
}

const initialState: State = {
  username: '',
  password: '',
  confirmPassword: '',
}

function stateReducer(state: State, action: Action): State {
  if (action.type === 'input') {
    return { ...state, [action.name]: action.value }
  }
  return state
}

export const Register = () => {
  const { register, isError, error, isSuccess } = useAuth()
  const [state, dispatch] = useReducer(stateReducer, initialState)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & LoginElements
    const { username, password } = target
    register({ username: username.value, password: password.value })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch({ name, value, type: 'input' })
  }
  if (isSuccess) {
    return <div>well done</div>
  }
  const isSubmitDisabled =
    !state.password ||
    !state.confirmPassword ||
    state.password !== state.confirmPassword
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
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <div
            className={css({
              marginTop: '1em',
            })}
          >
            <Button type="submit" variant="primary" disabled={isSubmitDisabled}>
              Register
            </Button>
            <p>
              {isError ? (
                <span
                  className={css({
                    color: 'red',
                  })}
                >
                  Oops {error.message}
                </span>
              ) : null}
            </p>
            <p
              className={css({
                padding: '1em 0',
              })}
            >
              Already a member ? Click{' '}
              <span>
                <Link to="/login">here</Link>
              </span>{' '}
              to login
            </p>
          </div>
        </form>
      </div>
    </ErrorBoundary>
  )
}
