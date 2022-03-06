/**
 * @https://github.com/kentcdodds/bookshelf/blob/main/src/utils/hooks.js
 */
import { Dispatch, useCallback, useLayoutEffect, useRef, useState } from 'react'

function useSafeDispatch(dispatch: Dispatch<any>) {
  const mounted = useRef(false)
  useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return useCallback(
    (input: any) => (mounted.current ? dispatch(input) : void 0),
    [dispatch],
  )
}

type Status = 'idle' | 'loading' | 'success' | 'error'

interface IUseAsync<T> {
  data?: T | null | undefined
  state: Status
}
interface IUseAsyncReturn<T> {
  data?: T | null | undefined
  error?: any
  state: Status
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  isIdle: boolean
  setError: (error: Error) => void
  setData: (data: T) => void
  setState: (state: Status) => void
  run: (p: Promise<T>) => T | any | void
}

function useAsync<T>({
  data: initialData = undefined,
  state: initialState = 'idle',
}: IUseAsync<T>): IUseAsyncReturn<T> {
  const [state, setStateUnSafe] = useState<Status>(initialState)
  const [data, setDataUnSafe] = useState<T | null>(initialData ?? null)
  const [error, setErrorUnSafe] = useState<Error>()

  const setStateSafe = useSafeDispatch(setStateUnSafe)

  const setState = useCallback(
    (state: Status) => setStateSafe(state),
    [setStateSafe],
  )

  const setDataSafe = useSafeDispatch(setDataUnSafe)
  const setData = useCallback(
    (data: T) => {
      if (data !== null) {
        setDataSafe(data)
        setStateSafe('success')
      }
    },
    [setDataSafe, setStateSafe],
  )

  const setErrorSafe = useSafeDispatch(setErrorUnSafe)
  const setError = useCallback(
    (err: Error) => {
      setErrorSafe(err)
      setStateSafe('error')
    },
    [setErrorSafe, setStateSafe],
  )

  const run = useCallback(
    async (params: Promise<any>): Promise<any> => {
      setStateSafe({
        state: 'pending',
      })
      return params.then(
        data => {
          setData(data)
          setState('success')
          return params as Promise<any>
        },
        err => {
          setError(err)
          setState('error')
          return Promise.reject(err)
        },
      ) as Promise<any>
    },
    [setData, setError, setState, setStateSafe],
  )
  console.log('is State changing', state)

  return {
    run,
    state,
    setState,
    data,
    setData,
    error,
    setError,
    isLoading: state === 'loading',
    isError: state === 'error',
    isSuccess: state === 'success',
    isIdle: state === 'idle',
  }
}

export { useAsync }
