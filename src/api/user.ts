import { SERVER_URL } from 'utils/configs'
import { IUser, IUserInfo } from 'utils/types'

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
  let status, statusText
  try {
    const response = await fetch(`${SERVER_URL}/${endpoint}`, config)
    status = response.status
    statusText = response.statusText
    if (response.ok) {
      try {
        const data = await response.json()
        return data as IUserInfo
      } catch (error) {
        const err: Error = error as Error
        console.log(
          `${client.name},  ${JSON.stringify(response)} response was ok`,
        )
        err.status = status
        err.statusMessage = statusText

        throw err
      }
    } else {
      console.log(`Error catch ${client.name}  has ${JSON.stringify(data)}`)
      const err: Error = new Error('Something went wrong')
      err.status = status
      err.statusMessage = statusText
      console.log(err.status, err.statusMessage)
      throw err
    }
  } catch (error) {
    const err: Error = error as Error
    err.status = status
    err.statusMessage = statusText

    throw err
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
