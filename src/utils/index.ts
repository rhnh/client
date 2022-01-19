export const callAll =
  (...fns: Function[]) =>
  (...args: any) =>
    fns.forEach(fn => fn && fn(...args))
export const getObjectKeyValue =
  <T extends Record<string, unknown>, U extends keyof T>(key: U) =>
  (obj: T) =>
    obj[key]
