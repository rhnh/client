interface CallBack<Params extends any[]> {
  (...args: Params): void
}
export const callAll =
  <Params extends any[]>(...fns: Array<CallBack<Params> | undefined>) =>
  (...args: Params) =>
    fns.forEach(fn => typeof fn === 'function' && fn(...args))
// export const getObjectKeyValue =
//   <T extends Record<string, unknown>, U extends keyof T>(key: U) =>
//   (obj: T) =>
//     obj[key]
export const getObjectKeyValue =
  <T extends object, U extends keyof T>(key: U) =>
  (obj: T) =>
    obj[key]
export const findAndSort = (items: string[], text: string): string[] =>
  Array.from(new Set(items))
    .filter(d => typeof d === 'string')
    .filter(item =>
      Object.values(item)
        .join('')
        .trim()
        .toLowerCase()
        .includes(text.toLowerCase()),
    )
    .sort((a: string, b: string) => b.localeCompare(a))
    .sort((a: string, b: string) => {
      if (a.length > b.length) {
        return 1
      } else if (a.length < b.length) {
        return -1
      } else return 0
    })
