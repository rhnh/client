export {}
declare global {
  //adding variable to Window interface which is implement by global 'window'
  interface Window {
    safarilive?: any
  }
  interface Error {
    status?: number
  }
}
