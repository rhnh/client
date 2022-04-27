import { css } from '@emotion/css'
import { ReLoginButton } from 'components/themed-components'
import { FC } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { getObjectKeyValue } from 'utils'
import * as colors from 'utils/colors'
const errorMessageVariants = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
}

// export function ErrorFallback({ error }: { error: Error }) {
//   return <ErrorMessage error={error} />
// }
interface ErrorMessageProps {
  error: Error
  variant?: 'string'
}

export const ErrorMessage: FC<ErrorMessageProps> = ({
  error,
  variant = 'stacked',
  ...props
}) => {
  return (
    <div
      role="alert"
      className={css(
        { color: colors.red },
        ...getObjectKeyValue<any, string>(variant)(errorMessageVariants),
      )}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        className={css({
          whiteSpace: 'break-spaces',
          margin: '0',
          marginBottom: -5,
          ...getObjectKeyValue<any, string>(variant)(errorMessageVariants),
        })}
      >
        {error.message}
      </pre>
    </div>
  )
}

export function FullPageErrorFallback({ error }: { error: Error }) {
  return (
    <div
      role="alert"
      className={css({
        color: 'red',
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <p>Something went wrong please refresh the page.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <ReLoginButton />
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function createError(s: string) {
  throw new Error(s)
}

export function httpError(n: number) {
  switch (n) {
    case 400:
      return createError('Missing Username/Password')
    case 401:
      return createError('Invalid username or password!')
    case 409:
      return createError('Username already taken')
    case 429:
      return createError('Please try later. Too many requests')
    case 500:
      return createError('Server down please try later! or Refresh')
  }
}
