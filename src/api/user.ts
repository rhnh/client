import { SERVER_URL } from 'utils/configs'
import { IUser, IUserInfo } from 'utils/types'

function httpError(n: number) {
  switch (n) {
    case 401:
      throw new Error('Username/Password Wrong!')
    case 409:
      throw new Error('Username already taken')
    case 429:
      throw new Error(' Please try later. Too many requests')
  }
}

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
    console.log('here, it was')
    throw err
  }
}

export const userLogin = (user: IUser): Promise<IUserInfo | Error> => {
  return userClient('users/user', user)
}

export const userRegister = (user: IUser): Promise<IUserInfo | Error> =>
  userClient('users', user)
