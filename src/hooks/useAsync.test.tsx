import { renderHook, act } from '@testing-library/react-hooks'
import { useAsync } from './useAsync'
interface Person {
  name: string
}
test('calling run with a promise which rejects', async () => {
  const { result } = renderHook(() =>
    useAsync<Person>({ data: null, state: 'idle' }),
  )
  expect(result.current.state).toEqual('idle')
  act(() => {
    result.current.setError(new Error('hello'))
  })
  expect(result.current.state).toEqual('error')
  expect(result.current.data).toEqual(null)
  act(() => {
    result.current.setData({ name: 'john' })
  })
  expect(result.current.data?.name).toBe('john')
  expect(result.current.isError).toBe(false)
  expect(result.current.isSuccess).toBe(true)
})

// test('can specify an initial state', () => {
//   const mockData = Symbol('resolved value')
//   const customInitialState = { status: 'resolved', data: mockData }
//   const { result } = renderHook(() => useAsync(customInitialState))
//   expect(result.current).toEqual({
//     ...resolvedState,
//     ...customInitialState,
//   })
// })

// test('can set the data', () => {
//   const mockData = Symbol('resolved value')
//   const { result } = renderHook(() => useAsync())
//   act(() => {
//     result.current.setData(mockData)
//   })
//   expect(result.current).toEqual({
//     ...resolvedState,
//     data: mockData,
//   })
// })

// test('can set the error', () => {
//   const mockError = Symbol('rejected value')
//   const { result } = renderHook(() => useAsync())
//   act(() => {
//     result.current.setError(mockError)
//   })
//   expect(result.current).toEqual({
//     ...rejectedState,
//     error: mockError,
//   })
// })

// test('No state updates happen if the component is unmounted while pending', async () => {
//   const { promise, resolve } = deferred()
//   const { result, unmount } = renderHook(() => useAsync())
//   let p
//   act(() => {
//     p = result.current.run(promise)
//   })
//   unmount()
//   await act(async () => {
//     resolve()
//     await p
//   })
//   expect(console.error).not.toHaveBeenCalled()
// })

// test('calling "run" without a promise results in an early error', () => {
//   const { result } = renderHook(() => useAsync())
//   expect(() => result.current.run()).toThrowErrorMatchingInlineSnapshot(
//     `"The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?"`,
//   )
