import { SERVER_URL } from 'utils/configs'
import { IUser, IUserInfo } from 'utils/types'
const localStorageKey = '__auth_provider_token__'

async function client(
  endpoint: string,
  data: IUser,
): Promise<IUserInfo | Error> {
  const { username, password } = data

  const config = {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  }

  try {
    const response = await fetch(`${SERVER_URL}/${endpoint}`, config)
    if (response.ok) {
      const data = await response.json()
      console.log(`${client.name} error has ${JSON.stringify(response)}`)
      return data as IUserInfo
    } else {
      console.log(`${client.name}  has ${JSON.stringify(data)}`)
      return new Error()
    }
  } catch (error) {
    return error as Error
  }

  // return window
  //   .fetch(`${SERVER_URL}/${endpoint}`, config)
  //   .then(async response => {
  //     const { status, statusText } = response
  //     const data = await response.json()
  //     console.log(response.ok, status, statusText, 'client')
  //     if (response.ok) {
  //       console.log(`${client.name} error has ${JSON.stringify(response)}`)
  //       return data as IUserInfo
  //     } else {
  //       console.log(`${client.name} error has ${JSON.stringify(data)}`)
  //       return new Error()
  //     }
  //   })
  //   .catch(err => {
  //     return err
  //   })
}

export const userLogin = (user: IUser): Promise<IUserInfo | Error> =>
  client('users/login', user)

export const userRegister = (user: IUser): Promise<IUserInfo | Error> =>
  client('users', user)
