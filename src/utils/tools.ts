export const numberToDate = (n?: string) => {
  if (n) {
    return new Date(n).toDateString()
  }
  return n
}
