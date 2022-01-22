import { useState } from 'react'

const callAll =
  (...fns: any) =>
  (...args: any) =>
    fns.forEach((fn: any) => fn?.(...args))

export function useToggle() {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(!on)

  function getTogglerProps({
    onClick,
    ...props
  }: {
    on?: boolean
    onClick?: any
    props?: any
  }) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {
    on,
    toggle,
    getTogglerProps,
  }
}
