import { css } from '@emotion/css'
import { FC } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { getObjectKeyValue } from 'utils'

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
        { color: 'red' },
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
        height: '100vh',
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
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
