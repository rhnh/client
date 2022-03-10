import { SERVER_URL } from 'utils/configs'
import { httpError } from 'utils/error'
import { IUser, IUserInfo } from 'utils/types'

export async function userClient(
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
    return window
      .fetch(`${SERVER_URL}/${endpoint}`, config)
      .then(async response => {
        status = response.status
        statusText = response.statusText
        httpError(status)

        if (response.ok) {
          const data = await response.json()
          return data
        } else {
          return Promise.reject(data)
        }
      })
  } catch (error) {
    const err: Error = error as Error
    err.status = status
    err.statusMessage = statusText

    throw err
  }
}

export const userLogin = (user: IUser): Promise<IUserInfo | Error> => {
  return userClient('users/user', user)
}

export const userRegister = (user: IUser): Promise<IUserInfo | Error> =>
  userClient('users', user)
